<template>
  <div style="height:100vh;" class="flex items-center justify-between">
    <el-form
      ref="dynamicValidateForm"
      style="width:600px; margin:0 auto;"
      :model="formData"
      label-width="130px"
    >
	 <h2 class="title text-5xl pb-8 text-center text-blue-500 font-bold">D.M System</h2>
	<el-form-item>
		<h2 class="text-2xl pb-4 text-blue-500 font-bold">登陆/Login</h2>
	</el-form-item>
      <el-form-item
        prop="email"
        label="邮箱/Email:"
        :rules="rules.email"
      >
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码/Password:"
        :rules="rules.password"
      >
        <el-input
          v-model="formData.password"
          type="password"
		  @keyup.enter="submitForm('dynamicValidateForm')"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('dynamicValidateForm')"
        >
          登陆
        </el-button>
		<span style="float: right;" class="text-xs">还没有账号？<router-link to="/register" class="text-blue-600">注册</router-link></span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
	export default {
		name: 'Login',
		data() {
			return {
				formData: {
					email: '',
					password: ''
				},
				rules: {
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
							message: "密码不能为空",
							trigger: "blur"
						},
						{
							min: 6,
							max: 30,
							message: "长度在6到30之间",
							trigger: "blur"
						}
					]

				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post('/api/login',this.formData).then(res=>{
							localStorage.setItem('token',`Bearer ${res.data.token}`)
							this.$message({
							     message: '登陆成功',
							     type: 'success'
							})
							this.$router.push('/');
						}).catch(erro=>{
							if(erro.response.status === 500) return this.$message.error('服务器未连接');
							this.$message.error('请确保邮箱和密码正确')
						});
					}
				});
			}
		}
	}
</script>
<style>
	.title{
		font-family: 'Cookie', cursive;
	}
</style>