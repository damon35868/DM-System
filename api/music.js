module.exports = app => {
	const musicApi = require('@suen/music-api');
	const express = require('express');
	const router = new express.Router();
	
	 router.get('/musiclist',(req,res)=>{
		 musicApi.netease.getTopList( 0 ).then(data=>{
		 	res.status(200).json({msg:'获取成功',data});
		 }).catch(erro=>console.log(erro));
		 
	 });
	 app.use('/api/music',router);
};