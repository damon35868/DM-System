module.exports = (app:any) => {
	const express = require('express');
	const router = new express.Router();
	const ClassType = require('../models/ClassType.ts');
	const passport = require('passport');
	
	//获取typelist
	router.get('/typelist',passport.authenticate('jwt', {session: false}),(req:any,res:any)=>{
		ClassType.find().then((type:any)=>{
			res.json({types:type});
		}).catch((erro:any)=>console.log(erro));
	});
	
	//新增类型
	router.post('/add',passport.authenticate('jwt', {session: false}),(req:any,res:any)=>{
		if((req.body.class_type && req.body.class_type.length <= 0) || !req.body.class_type || req.body.class_type === '') return res.status(400).json({msg:'class类型不能为空！'});
		ClassType.findOne({class_type:req.body.class_type}).then((classType:any)=>{
			if(classType) return res.status(400).json({msg:'class类型已存在，请更改！'});
			new ClassType({class_type:req.body.class_type}).save().then((saved:any)=>{
				if(!saved) return res.status(400).json({msg:'class类型保存失败！'});
				res.json({stateCode:200,msg:'保存成功',data:saved});
			}).catch((erro:any)=>console.log(erro));
		}).catch((erro:any)=>console.log(erro));
	});
	
	//查找一条数据
	router.get('/type/:id',passport.authenticate('jwt', {session: false}),(req:any,res:any)=>{
		ClassType.findOne({_id:req.params.id}).then((type:any)=>{
			if(!type) return res.status(400).json({msg:'查找数据失败'});
			res.json({msg:'查找成功',type:type});
		}).catch((erro:any)=>console.log(erro));
	});
	
	
	//编辑type
	router.post('/edit',passport.authenticate('jwt', {session: false}),(req:any,res:any)=>{
		if(!req.body.type) return res.status(400).json({msg:'type不能为空'});
		ClassType.updateOne({_id:req.body.id},{ $set: { class_type:req.body.type }}).then((state:any)=>{
			if(!state) return res.status(400).json({msg:'编辑失败'});
			res.json({msg:'编辑成功'});
		}).catch((erro:any)=>console.log(erro));
	});
	
	//删除type
	router.delete('/remove/:id',passport.authenticate('jwt', {session: false}),(req:any,res:any)=>{
		ClassType.findOneAndRemove({_id:req.params.id}).then((state:any)=>{
			if(!state) return res.status(400).json({msg:'删除失败'});
			res.json({msg:'删除成功'});
		}).catch((erro:any)=>console.log(erro));
	});
	
	app.use('/api/class',router);
}