<template>
	<el-container style="height: 100vh;">
		<el-header style="text-align: right; font-size: 12px; background-color: rgb(4, 71, 105 );" class="text-white">
			<el-row type="flex" justify="space-between" align="middle">
				<el-col style="text-align: left;">
					<router-link to="/" class="font-bold text-left text-2xl">D.M System</router-link>
				</el-col>
				<el-col :span="21" v-if="user!==null">
					<el-avatar class="align-middle mr-2" shape="circle" :size="40" fit="cover" :src="user.avatar"></el-avatar>
					<!-- <img :src="user.avatar" class="w-10 h-10 rounded-full inline-block mr-2"> -->
					<el-dropdown class="text-white" @command="handleClick">
						<span class="align-middle">
							<span class="align-middle font-bold">{{user.user_name}}</span>
							<i class="align-middle el-icon-caret-bottom el-icon--right ml-2" style="font-size:16px;"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="editUser">编辑个人信息</el-dropdown-item>
							<el-dropdown-item command="logout">登出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
		</el-header>

		<el-container>
			<el-aside width="200px">
				<el-menu style="height:calc(100vh - 60px);" :default-openeds="['1', '2']" :default-active="$route.path" class="el-menu-vertical-demo"
				 router text-color="#606060">
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-setting"></i>信息管理</template>
						<el-menu-item-group active-text-color>
							<template slot="title">课程管理</template>
							<el-menu-item index="/classtype">课程类目</el-menu-item>
							<el-menu-item index="/classlist">课程列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>

					<el-submenu index="2">
						<template slot="title"><i class="el-icon-headset"></i><span>音乐管理</span></template>
						<el-menu-item index="/musicrecommend">音乐TOP榜</el-menu-item>
						<el-menu-item index="1-2">音乐列表</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
		<el-dialog title="修改个人资料" :visible.sync="dialogFormVisible">
			<el-form :model="userForm">
				<el-form-item label="用户名:" label-width="120px">
					<el-input v-model="userForm.user_name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="职称:" label-width="120px">
					<el-input v-model="userForm.title" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveUser">确 定</el-button>
			</div>
		</el-dialog>
	</el-container>
</template>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
</style>

<script>
	export default {
		naem: 'home',
		data() {
			return {
				dialogFormVisible: false,
				userForm: {
					id: '',
					user_name: '',
					title: ''
				}
			}
		},
		created() {
			this.getUser();
		},
		computed: {
			user() {
				return this.$store.getters.getUser;
			}
		},
		methods: {
			getUser() {
				this.$http.get('/api/user').then(res => {
					this.$store.dispatch('setUser', res.data.data);
				}).catch(erro => console.log(erro));
			},
			handleClick(command) {
				switch (command) {
					case 'logout':
						this.logout();
						break;
					case 'editUser':
						this.dialogFormVisible = true;
						this.userForm.id = this.user._id;
						this.userForm.user_name = this.user.user_name;
						this.userForm.title = this.user.title;
						break;
				}
			},
			logout() {
				localStorage.removeItem('token');
				this.$message.error('已登出');
				this.$router.push('/login');
			},
			saveUser() {
				this.$http.post('/api/edituser', this.userForm).then(res => {
					this.getUser();
					this.dialogFormVisible = false;
				}).catch(erro => {
					this.$message.error(erro.response.data.msg);
				});
			}
		}
	};
</script>
