module.exports = app => {
	const express = require('express');
	const router = new express.Router();
	const Blogs = require('../models/Blog.js');
	const passport = require('passport');
	
	//添加博客
	router.post('/add',passport.authenticate('jwt', {session: false}),(req,res) => {
		//判断过来到内容
		if (!req.body.title || !req.body.textContent) return res.status(404).json({msg:'标题或内容不能为空!'});
		new Blogs({title:req.body.title,textContent:req.body.textContent}).save().then((saved)=>{
			if(!saved) return res.status(400).json({msg:'blog保存失败！'});
			res.json({stateCode:200,msg:'保存成功',data:saved});
		}).catch((erro)=>console.log(erro));
	});
	
	//查看博客
	router.get('/blogs',passport.authenticate('jwt', {session: false}),(req,res)=>{
		Blogs.find().then((blogs)=>{
			res.json({data:blogs});
		}).catch((erro)=>console.log(erro));
	});
	//编辑博客
	router.post('/edit/:id',passport.authenticate('jwt', {session: false}),(req,res)=>{
		if (!req.body.title || !req.body.textContent) return res.status(404).json({msg:'标题或内容不能为空!'});
		Blogs.updateOne({_id:req.params.id},{ $set: { title:req.body.title,textContent:req.body.textContent }}).then((state)=>{
			if(!state) return res.status(400).json({msg:'编辑失败'});
			res.json({msg:'编辑成功',data:state});
		}).catch((erro)=>console.log(erro));
	});
	
	//删除博客
	router.delete('/remove/:id',passport.authenticate('jwt', {session: false}),(req,res)=>{
		Blogs.findOneAndRemove({_id:req.params.id}).then((state)=>{
			if(!state) return res.status(400).json({msg:'删除失败'});
			res.json({msg:'删除成功'});
		}).catch((erro)=>console.log(erro));
	});
	
	//查找一条博客
	router.get('/info/:id',passport.authenticate('jwt', {session: false}),(req,res)=>{
		Blogs.findOne({_id:req.params.id}).then((blog)=>{
			if(!blog) return res.status(400).json({msg:'查找数据失败'});
			res.json({msg:'查找成功',data:blog});
		}).catch((erro)=>console.log(erro));
	});
	
	app.use('/api/blog',router);
};