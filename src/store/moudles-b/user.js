// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  usercookie from './usercookie'
import CryptoJS from "./crypto.js"
import qs from 'qs';
import axios from 'axios';


const state = {
  usesee: false,
  Logsee: true,
  forgetsee: false,
  regissee:false,
  mobileFlg:false,
  localapi:"http://localhost:3000",
  user: {}
  
}
const mutations = {
  getuser (state, use) {
    state.user = use
  },
  toogle (state,item) {
    state[item] =!state[item]
  }
 
} 
const getters = {
  getlocalapi: function(state){ return state.localapi},
  getforgetser: function(state){ return state.forgetsee },
  getregissee: function(state){ return state.regissee },
  getmbprompt: function(state){ return state.mobileprompt },
  getmbFlg: function(state){ return state.mobileFlg },
  getusesee: function(state  ){ return state.usesee }
} 

const actions = {
  //管理员用户登录
  adminslogin ({ commit },use) {
     //密码加密
     var aespassword= CryptoJS.aesEncrypt(use.password)
     console.log(aespassword)
     axios.post(state.localapi+"/admin",JSON.stringify({name:use.username,password:aespassword})) 
    
         .then(response => {
          console.log(response)
          if (response.data.code=="ok") {
            sessionStorage.token= response.data.token
            window.location.href ="http://localhost:8080/memus";
          }; 
         })
         .catch(err => {
         console.log(err);
      }) 
  },   
 adminmutation ({ commit },use) {
    use.password=CryptoJS.aesEncrypt(use.password)
    console.log(use.picbase64)
    axios.post(state.localapi+"/MTadmin",JSON.stringify(use)) 
    
         .then(response => {
            console.log(response)
            if (response.code=="ok") {
                alert("操作成功")
                window.location.href ="http://localhost:8080/memus";
            }; 
         })
         .catch(err => {
           console.log(err);
    }) 
  },
  userlogout({ commit },use) {

    usercookie.delectuser()
    commit("getuser",use)
  }, 
 toogleusestate ({ commit },item) {
    commit("toogle",  item )
  },
  tooglemobilestate ({ commit }) {
    commit("tooglemobileFlg" )
  }
 } 
export default {
  state,
  getters,
  actions,
 mutations
} 