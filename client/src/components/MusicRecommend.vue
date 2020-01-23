<template>
	<div class="musicRecommend p-10" v-if="musicTop !== null">
		<div class="flex pb-10 justify-between items-baseline">
			<div class="flex items-center" style="max-width: 80%;">
				<img :src="musicTop.cover" class="w-32 rounded mr-8">
				<div>
					<h3 class="text-3xl font-bold text-green-800 pb-4">{{musicTop.name}}</h3>
					<h4 class="text-xl font-bold text-green-900">{{musicTop.description}}</h4>
				</div>
			</div>
			<p class="text-xs text-gray-600 pb-2">播放次数：{{musicTop.playCount}}</p>
		</div>

		<el-table class="px-10" :data="musicToplist" align="center" style="width: 100%">
			<el-table-column align="center" label="专辑封面" width="250px">
				<template slot-scope="scope">
					<img class="w-24 rounded mx-auto" :src="scope.row.album.cover" />
				</template>
			</el-table-column>
			<el-table-column label="歌曲名" align="center">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium" class="font-bold">{{ scope.row.name }}</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="歌手" align="center">
				<template slot-scope="scope">
					<span style="margin-left: 10px" class="font-bold">{{ scope.row.artists[0].name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="音乐咨询供应商" align="center">
				<template slot-scope="scope">
					<span style="margin-left: 10px" class="font-bold">{{ scope.row.vendor }}</span>
				</template>
			</el-table-column>
			<el-table-column label="音乐链接" align="center">
				<template slot-scope="scope">
					<a style="margin-left: 10px" target="_blank" class="text-blue-600 underline" :href="scope.row.link">{{ scope.row.link }}</a>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'musicRecommend',
		data() {
			return {
				musicTop: null,
				musicToplist: []
			}
		},
		created() {
			this.getMusicList();
		},
		methods: {
			getMusicList() {
				this.$http.get('/api/music/musiclist').then(res => {
					this.musicTop = res.data.data.data;
					this.musicToplist = res.data.data.data.list;
				}).catch(erro => console.log(erro));
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		}
	}
</script>
