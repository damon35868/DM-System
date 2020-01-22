<template>
	<div style="height:100vh;" class="flex items-center justify-between">
		<el-form :rules="ruleForm" ref="registerForm" style="width:600px; margin:0 auto;" :model="registerData" label-width="145px">
			<el-form-item>
				<h2 class="text-3xl pb-10 text-center text-blue-500 font-bold">D.M管理系统</h2>
				<h2 class="text-2xl pb-4 text-blue-500 font-bold">注册/Register</h2>
			</el-form-item>
			<el-form-item prop="user_name" label="用户名/User Name:">
				<el-input v-model="registerData.user_name" />
			</el-form-item>
			
			<el-form-item prop="email" label="邮箱/Email:">
				<el-input v-model="registerData.email" />
			</el-form-item>

			<el-form-item label="密码/Password:" prop="password">
				<el-input type="password" v-model="registerData.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码/Confirm:" prop="password2">
				<el-input type="password" v-model="registerData.password2"></el-input>
			</el-form-item>

			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('registerForm')">
					注册
				</el-button>
				<span style="float: right;" class="text-xs">已有账号？现在去 <router-link to="/login" class="text-blue-600">登陆</router-link></span>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'Register',
		data() {
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.registerData.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				registerData: {
					user_name:'',
					email: '',
					password: '',
					password2: ''
				},
				ruleForm: {
					user_name:[{
							required: true,
							message: '用户名不能为空',
							trigger: 'blur'
						}],
					email: [{
							required: true,
							message: 'email不能为空',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: 'email格式不正确',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: "确认密码不能为空",
							trigger: "blur"
						},
						{
							min: 6,
							max: 30,
							message: "长度在6到30之间",
							trigger: "blur"
						}
					],
					password2: [{
							required: true,
							message: "确认密码不能为空",
							trigger: "blur"
						},
						{
							min: 6,
							max: 30,
							message: "长度在6到30之间",
							trigger: "blur"
						},
						{
							validator: validatePass2,
							trigger: 'blur'
						}
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post('/api/register', this.registerData).then(res => {
							this.$message({
								message: '账号注册成功',
								type: 'success'
							})
						}).catch(erro => {
							this.$message.error(erro.response.data.msg);
						});
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>
</style>
