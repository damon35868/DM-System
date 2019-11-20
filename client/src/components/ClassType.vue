<template>
	<div class="p-20">
		<el-form status-icon ref="ruleForm" label-width="120px" :model="formData">
			<el-form-item label="添加课程分类" prop="class_type" :rules="[
      { required: true, message: '请输入Class类型', trigger: 'blur' }
    ]">
				<el-input type="text" v-model="formData.class_type"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addType('ruleForm')">
					新增
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'classType',
		data() {
			return {
				formData:{
					class_type: '',
				}
			}
		},
		methods: {
			addType(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post('/api/class/add',this.formData).then(res=>{
							this.$message({
								message: 'class分类添加成功',
								type: 'success'
							})
							this.$router.push('/classlist');
						}).catch(erro=>{
							this.$message.error('请输入class类型');
						});
					} else {
						return false;
					}
				});
			}
		}

	}
</script>

<style>
</style>
