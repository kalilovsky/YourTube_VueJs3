import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      filterCriteria :{},
      myTags :{},
      userInfo:{},
      scrollMenuVisibility : undefined
    }
  },
  getters: {
  },
  mutations: {
    updateFilterCritera(state,payload){
      state.filterCriteria = payload.filter;
    },
    updateMyTags(state,payload){
      state.myTags = Object.keys(payload.myTags);
    },
    updateUserInfo(state,payload){
      state.userInfo = payload.userInfo;
    },
    setScrollVisibility(state,payload){
      state.scrollMenuVisibility = payload.scroll;
    }
  },
  actions: {
  },
  modules: {
  }
})
