<template>
	<div class="MusicSearch px-20 py-10 text-center">
		<h3 class="text-center text-4xl font-bold text-green-900 pb-10">搜索你喜欢的音乐</h3>
		<el-input placeholder="请输入歌手或歌曲名" v-model="keyword" class="input-with-select w-4/6 mx-auto" @change="handleSearch">
			<el-select v-model="type" slot="prepend" placeholder="请选择类型" @change="changeVal">
				<el-option label="网易云音乐" value="netease"></el-option>
				<el-option label="虾米音乐" value="xiami"></el-option>
				<el-option label="QQ音乐" value="qq"></el-option>
			</el-select>
			<el-button slot="append" icon="el-icon-search" @click="handleSearch">搜索</el-button>
		</el-input>
		<div class="pt-16" v-if="musicList !== null && musicList.length > 0">
			<h4 class="text-left font-bold text-green-900 pb-8 ">搜索结果共：{{total}} 条数据</h4>
			<el-table class="px-10" :data="musicList" align="center" style="width: 100%">
				<el-table-column align="center" label="专辑封面" width="250px">
					<template slot-scope="scope">
						<img class="w-24 h-24 rounded mx-auto" :src="scope.row.album.cover" />
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
				<el-table-column label="音乐链接" align="center">
					<template slot-scope="scope">
						<a style="margin-left: 10px" target="_blank" class="text-blue-600 underline" :href="scope.row.link">{{ scope.row.link }}</a>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination class="pt-10" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="30"
			 layout="prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<p class="pt-8 text-red-700 font-bold" v-if="musicList instanceof Array && musicList.length == 0">抱歉，找不到任何内容！</p>
	</div>
</template>

<script>
	export default {
		name: 'MusicSearch',
		data() {
			return {
				keyword: '',
				type: '',
				total: '',
				musicList: null,
				currentPage: 1
			}
		},
		methods: {
			handleSearch() {
				if (!this.keyword) return this.$message.error('搜索关键词不能为空！');
				this.$http.get(`/api/music/musicsearch?keyword=${this.keyword}&type=${this.type}&offset=${this.currentPage}`).then(
					res => {
						this.total = res.data.data.data.total;
						this.musicList = res.data.data.data.songs;
					}).catch(erro => console.log(erro));
			},
			handleCurrentChange(val) {
				this.handleSearch();
			},
			changeVal(val){
				if(!this.keyword) return;
				this.handleSearch();
			}
		}
	}
</script>

<style>
	.el-select .el-input {
		width: 120px;
	}
</style>
