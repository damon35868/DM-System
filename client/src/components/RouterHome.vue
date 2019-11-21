<template>
		<div class="pt-40">
			<h2 class="text-center font-bold text-4xl text-blue-500" v-if="$store.state.user!==null">
				欢迎您！<span>{{$store.state.user.user_name}}</span>
			</h2>
			<h2 class="text-center font-bold text-xl text-blue-500" v-if="$store.state.user!==null">
				您的职称是：{{$store.state.user.title}}
			</h2>
		</div>
</template>
