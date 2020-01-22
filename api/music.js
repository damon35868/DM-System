module.exports = app => {
	const musicApi = require('@suen/music-api');
	const express = require('express');
	const router = new express.Router();
	
	 router.get('/musiclist',(req,res)=>{
		 //随机显示23个排行榜单
		 const randomNum = Math.round(Math.random()*23);
		 musicApi.netease.getTopList( randomNum ).then(data=>{
		 	res.status(200).json({msg:'获取成功',data});
		 }).catch(erro=>console.log(erro));
		 
	 });
	 app.use('/api/music',router);
};