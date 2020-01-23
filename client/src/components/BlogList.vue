<template>
	<div v-if="blogs !== null" class="py-10 px-20">
		<el-card class="box-card mb-6" v-for="(item,key) in blogs" :key="key">
			<div slot="header" class="clearfix flex justify-between items-center">
				<div class="flex-1">
					<span class="text-blue-700">{{item.title}}</span>
					<p class="text-xs pt-1 text-gray-500">发表日期：{{formatDate(item.createDate)}} <span class="pl-2">{{formatTime(item.createDate)}}</span> </p>
				</div>
				
				<div class="">
					<el-button type="primary" size="small" @click="editBlog(item)">编辑</el-button>
					<el-button type="danger" size="small" @click="removeBlog(item._id)">删除</el-button>
				</div>
			</div>
			<div class="text item text-black-800 text-hidden3">
				{{item.textContent}}
			</div>
			<p class="text-gray-600 text-xs hover:underline mt-3 cursor-pointer" @click="blogInfo(item._id)">查看全文</p>
		</el-card>

		<el-dialog title="编辑博文" :visible.sync="dialogFormVisible">
			<el-form :model="blogForm">
				<el-form-item label="博文标题:" label-width="120px">
					<el-input type="text" placeholder="请输入博客标题" v-model="blogForm.title" style="width:90%;" maxlength="20"
					 show-word-limit clearable class="mb-8">
					</el-input>
				</el-form-item>
				<el-form-item label="博文内容:" label-width="120px">
					<el-input type="textarea" placeholder="请输入博客内容" v-model="blogForm.textContent" maxlength="10000" style="width:90%;"
					 rows="20" show-word-limit>
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveBlog">确 定</el-button>
			</div>
		</el-dialog>
		
		<el-dialog title="查看博文" :visible.sync="dialogFormVisible2">
			<div class="px-10">
				<h4 class="text-xl font-bold text-blue-700">{{blogForm.title}}</h4>
				<p class="text-xs pt-1 pb-6 text-gray-500">发表日期：{{formatDate(blogForm.createDate)}} <span class="pl-2">{{formatTime(blogForm.createDate)}}</span> </p>
				<p class="text-black-800">{{blogForm.textContent}}</p>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">返回</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'blogList',
		data() {
			return {
				blogs: null,
				blogForm: {
					id: '',
					title: '',
					textContent: '',
					createDate:''
				},
				dialogFormVisible: false,
				dialogFormVisible2: false
			}
		},
		created() {
			this.getBlogs();
		},
		methods: {
			getBlogs() {
				this.$http.get('/api/blog/blogs').then(res => {
					this.blogs = res.data.data;
				}).catch(erro => console.log(erro));
			},
			editBlog(item) {
				this.dialogFormVisible = true;
				this.blogForm.id = item._id;
				this.blogForm.title = item.title;
				this.blogForm.textContent = item.textContent;
			},
			formatDate(date) {
				let d = new Date(date);
				return `${d.getFullYear()} 年 ${d.getMonth()+1} 月 ${d.getDate()} 日`;
			},
			formatTime(date) {
				let d = new Date(date);
				return `${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`;
			},
			saveBlog() {
				this.$http.post(`/api/blog/edit/${this.blogForm.id}`, this.blogForm).then(res => {
					this.getBlogs();
					this.$message({
						message: '保存成功！',
						type: 'success'
					});
					this.dialogFormVisible = false;
				}).catch(erro => console.log(erro));
			},
			removeBlog(id) {
				this.$http.delete(`/api/blog/remove/${id}`).then(res => {
					this.getBlogs();
					this.$message({
						message: '删除成功！',
						type: 'success'
					});
				}).catch(erro => console.log(erro));
			},
			blogInfo(id){
				this.$http.get(`/api/blog/info/${id}`).then(res=>{
					this.blogForm.id = res.data.data._id;
					this.blogForm.title = res.data.data.title;
					this.blogForm.textContent = res.data.data.textContent;
					 this.blogForm.createDate = res.data.data.createDate;
				}).catch(erro=>console.log(erro));
				this.dialogFormVisible2 = true;
			}

		}
	}
</script>

<style scoped>
	.text-hidden3 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 3;
	}
</style>
