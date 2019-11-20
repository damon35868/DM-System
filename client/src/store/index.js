import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  user: null
  },
  getters:{
	  getUser: state => {
		  return state.user;
	  }
  },
  mutations: {
	  setUser(state,userInfo){
		  state.user = userInfo;
	  }
  },
  actions: {
	  setUser(context,userInfo){
		  context.commit('setUser',userInfo);
	  }
  }
})
