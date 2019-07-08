import {getUserList, addUser, deleteUser, updateUserInfo} from '@/api/index'
// 模块数据
const state =  {
  list: []
}

// 模块同步操作
const mutations = {
  updateList(state, payload){
    state.list = payload
  }
}

// 模块异步操作
const actions = {
  // 获取用户列表
  getUserList({commit}, payload){
    return new Promise((resolve, reject)=>{
      getUserList().then(res=>{
        console.log('res...', res)
        commit('updateList', res.data);
      })
    })
  },
  // 添加用户
  addUser({commit}, payload){
    return new Promise((resolve, reject)=>{
      addUser(payload).then(res=>{
        console.log('res...', res)
        resolve(res);
      })
    })
  },
  // 删除用户
  deleteUser({commit, dispatch}, payload){
    return new Promise((resolve, reject)=>{
      deleteUser(payload).then(res=>{
        // console.log('res...', res);
        // 重新获取用户信息
        dispatch('getUserList')
        resolve();
      })
    })
  },
  // 更新用户信息
  updateUser({dispatch}, payload){
    return new Promise((resolve, reject)=>{
      console.log('payload...', payload);
      updateUserInfo(payload).then(res=>{
        console.log('res...', res);
        // 重新获取用户信息
        dispatch('getUserList')
        resolve();
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}