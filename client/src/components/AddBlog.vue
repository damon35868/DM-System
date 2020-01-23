<template>
	<div class="addBlog text-center py-10">
		<h3 class="text-4xl font-bold text-green-900 pb-10">添加博客</h3>
		<el-input type="text" placeholder="请输入博客标题" v-model="bolgData.title" style="width:80%;" maxlength="20"
		 show-word-limit clearable class="mb-8">
		</el-input>
		<el-input type="textarea" placeholder="请输入博客内容" v-model="bolgData.textContent" maxlength="10000" style="width:80%;"
		 rows="20" show-word-limit>
		</el-input>
		<el-button type="primary" class="block mx-auto w-4/12 mt-10" @click="publishBlog">发布博客</el-button>
	</div>
</template>

<script>
	export default {
		name: 'addBlog',
		data() {
			return {
				bolgData: {
					title: '',
					textContent: ''
				}
			}
		},
		methods: {
			publishBlog() {
				if (!this.bolgData.title || !this.bolgData.textContent) return this.$message.error('博客标题或内容不能为空！');
				this.$http.post('/api/blog/add', this.bolgData).then(res => {
					this.$message({
						message: '恭喜您，发布成功！',
						type: 'success'
					});
					this.$router.push('/bloglist');
				}).catch(erro => console.log(erro));
			}
		}
	}
</script>

<style>
</style>
