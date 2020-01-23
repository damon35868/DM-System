module.exports = app => {
	const musicApi = require('@suen/music-api');
	const express = require('express');
	const router = new express.Router();
	const url = require('url');

	//top榜单
	router.get('/musiclist', (req, res) => {
		//随机显示qq和网易供应商资料
		const randomVendor = Math.round(Math.random() * 1);
		//随机显示网易23个排行榜单
		const neteaseRandomNum = Math.round(Math.random() * 23);
		//随机显示qq排行榜
		const qqRandomNum = Math.round(Math.random() * 10);
		const qqArr = [3,5,6,16,17,18,19,20,21,22,23];
		
		let vendor;
		if (randomVendor === 0) vendor = musicApi.netease;
		else vendor = musicApi.qq;
		vendor.getTopList(randomVendor === 0 ? neteaseRandomNum : qqArr[qqRandomNum]).then(data => {
			res.status(200).json({
				msg: '获取成功',
				data
			});
		}).catch(erro => console.log(erro));


	});

	//搜索音乐
	router.get('/musicsearch', (req, res) => {
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		let searchType;
		if (!query.keyword) return res.status(404).json({
			msg: '关键字不能为空'
		});
		if (query.type !== 'qq' && query.type !== 'xiami' && query.type !== 'netease') searchType = 'xiami';
		else searchType = query.type;

		switch (searchType) {
			case 'netease':
				musicApi.netease.searchSong({
					keyword: query.keyword,
					offset: query.offset
				}).then(data => {
					res.status(200).json({
						msg: '搜索成功',
						data
					});
				});
				break;
			case 'xiami':
				musicApi.xiami.searchSong({
					keyword: query.keyword,
					offset: query.offset
				}).then(data => {
					res.status(200).json({
						msg: '搜索成功',
						data
					});
				});
				break;
			case 'qq':
				musicApi.qq.searchSong({
					keyword: query.keyword,
					offset: query.offset
				}).then(data => {
					res.status(200).json({
						msg: '搜索成功',
						data
					});
				});
				break;
		}
	});

	app.use('/api/music', router);
};
