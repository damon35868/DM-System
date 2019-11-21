module.exports = (app:any) => {
	const User = require('../models/user.ts');
	const bcrypt = require('bcrypt');
	const express = require('express');
	const router = new express.Router();
	const JWT = require('jsonwebtoken');
	const passport = require('passport');
	const gravatar = require('gravatar');
	
	router.post('/register',(req:any,res:any):void=>{
		// res.json({msg:'success'});
		const user_name = req.body.user_name ? req.body.user_name : null;
		const email = req.body.email ? req.body.email : null;
		const password = req.body.password ? req.body.password : null;
		if(!user_name || !email || !password) return res.status(400).json({msg:'缺少参数'});
		User.findOne({email}).then((user:any)=>{
			if(user) return res.status(404).json('邮箱已被占用');
			//头像
			const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
			//加密密码
			bcrypt.genSalt(10, (err:any, salt:any)=> {
			    bcrypt.hash(password, salt, (err:any, hash:any)=> {
			        if(err) return res.json({msg:'加密失败'});
					//保存数据
					user = new User({
						user_name,
						email,
						password:hash,
						avatar
					});
					user.save().then((user:any)=>{
						res.json(user);
					}).catch((erro:any)=>console.log(erro));
			    });
			});
		});
	});
	
	router.post('/login',(req:any,res:any):void=>{
		// 拿到数据
		const email = req.body.email ? req.body.email : null;
		const password = req.body.password ? req.body.password : null;
		if(!email || !password) return res.status(400).json({msg:'缺少参数'});
		User.findOne({email}).then((user:any)=>{
			if(!user) return res.status(400).json({msg:'用户名不存在'});
			//拿到该用户并比对密码
			bcrypt.compare(password, user.password).then((isUser:any)=>{
				if(!isUser) return res.status(400).json({msg:'用户名或密码错误'});
				//返回json web token
				JWT.sign({user_name:user.user_name,id:user.id,email:user.email,avatar:user.avatar,title:user.title,createDate:user.createDate}, 'secret', {expiresIn: 3600}, (err:any, token:any) => {
					if(err) return res.status(400).json({msg:'token返回失败'});
					res.status(200).json({code:200,msg:'登陆成功',token:token});
				});
			});
		});
	});
	
	router.get('/user',passport.authenticate('jwt', {session: false}),(req:any,res:any):void=>{
		//去token拿数据
		const fullToken = req.headers.authorization;
		const token = fullToken.slice(7);
		JWT.verify(token, 'secret', (err:any, user:any)=> {
			if(err) return res.status(400).json({msg:'token无效'});
			User.findOne({email:user.email}).then((user:any)=>{
				if(!user) return res.status(400).json({msg:'用户名不存在'});
				res.json({stateCode:200,data:user});
			});
		});
		
		
	});
	
	router.post('/edituser',passport.authenticate('jwt', {session: false}),(req:any,res:any):void=>{
		const user_name = req.body.user_name ? req.body.user_name : null;
		const title = req.body.title ? req.body.title : null;
		if(!user_name || !title) return res.status(400).json({msg:'参数不能为空'});
		User.updateOne({_id:req.body.id},{ $set: { user_name:req.body.user_name,title:req.body.title }}).then((state:any)=>{
			if(!state) return res.status(400).json({msg:'编辑个人资料失败'});
			res.json({msg:'编辑个人资料成功'});
		}).catch((erro:any)=>console.log(erro));
	});
	
	app.use('/api',router);
};