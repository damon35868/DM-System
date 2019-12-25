<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" label="序号" align='center' width="70">
			</el-table-column>
			<el-table-column prop="createDate" label="添加日期" align='center' width="200">
			</el-table-column>
			<el-table-column prop="class_type" align='center' label="课程类型">
			</el-table-column>
			<el-table-column align='center' label="操作">
				<template slot-scope="scope">
					<el-button @click="editType(scope.row)" type="primary" size="small">编辑</el-button>
					<el-button @click="removeType(scope.row)" type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="修改class类型" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="class类型" label-width="120px">
					<el-input v-model="form.type" autocomplete="off" @keyup.enter.native="saveType"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveType">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	export default {
		name:'classlist',
		data() {
			return {
				tableData: [],
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
					id:'',
				   type: ''
				}
			}
		},
		created() {
			this.getType();
		},
		methods: {
			getType() {
				this.$http.get('/api/class/typelist').then(res => {
					this.tableData = res.data.types;
				}).catch(erro => console.log(erro));
			},
			editType(row) {
				this.dialogFormVisible = true;
				this.$http.get(`/api/class/type/${row._id}`).then(res=>{
					this.form.id = res.data.type._id;
					this.form.type = res.data.type.class_type;
				}).catch(erro=>console.log(erro));
			},
			removeType(row) {
				this.$http.delete(`/api/class/remove/${row._id}`).then(res => {
					this.$message({
						message: '分类删除成功',
						type: 'success'
					});
					this.getType();
				}).catch(erro => {
					this.$message.error('分类删除失败！');
				});
			},
			saveType(){
				this.$http.post('/api/class/edit',this.form).then(res=>{
					this.$message({
						message: '分类编辑成功',
						type: 'success'
					});
					this.getType();
					this.dialogFormVisible = false;
				}).catch(erro=>{
					this.$message.error(erro.response.data.msg);
				});
			}
		}
	}
</script>
