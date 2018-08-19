<template>
  <div id="menu">
    <canvas id="canvas" class="canvas"></canvas>
    <div class="city"></div>
    <div class="moon"></div>
    <div class="inpt">
    
      <el-form>
            <el-form-item label="名称">
                <el-input type="text" id="user" v-model="formName.username" @change="inputBlur('user',formName.username)"  placeholder="清输入名称"></el-input>
                <p>{{userError}}</p>
            </el-form-item>
            <el-form-item label="密码">
               <el-input type="password" id="password" v-model="formName.password" @change="inputBlur('password',formName.password)"  placeholder="最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"></el-input>
                <p>{{passwordError}}</p>
            </el-form-item>
            <el-button type="primary" @click="submitForm(formName)" v-bind:disabled="beDisabled">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
   </el-form>           
    </div>     
  </div>
</template>

<script>

import Stars from '../../static/canvas/Star'
import Moon from '../../static/canvas/Moon'
import Meteor   from '../../static/canvas/Meteor'

export default {
  data() {
    return {

      passwordError: '',
      userError: '',
      beDisabled: true,
      formName: {
        username: '',
        password: '',
      }  
    }
  },
  methods: {
   resetForm:function(){
                this.formName.username = '';
                this.formName.password = '';
                this.passwordError = '';
                this.beDisabled=true
                
    },
  inputBlur:function(errorItem,inputContent){
                if (errorItem === 'user') {
                    if (inputContent === '') {
                        this.userError = '用户名不能为空'
                        this.flag=false
                    }else{
                        this.userError = '';
                    }
                }else if(errorItem === 'password') {
                    var patrn= /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
                    var r = inputContent.match(patrn); 
                    if (inputContent === '' |  r==null) {
                        this.passwordError = '密码格式不对,最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
                         this.flag=false
                    }else{
                        
                        this.passwordError = '';
                    }
                
                }        
                //对于按钮的状态进行修改

                if (this.formName.username != '' && this.formName.password != ''  ) {
                    this.beDisabled = false;
                }else{
                    this.beDisabled = true;
                }
    },
     submitForm:function(formName){
              this.$store.dispatch('adminslogin',formName)
               
    },
  },  
  created() {
    if (sessionStorage.id) {
      this.$router.push('/matters')
    }
  },
  mounted() {
    let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        width = window.innerWidth,
        height = window.innerHeight,
        //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
        moon = new Moon(ctx, width, height),
        stars = new Stars(ctx, width, height, 200),
        meteors = [],
        count = 0

        canvas.width = width;
        canvas.height = height;

    const meteorGenerator = ()=> {
        //x位置偏移，以免经过月亮
        let x = Math.random() * width + 800
        meteors.push(new Meteor(ctx, x, height))

        //每隔随机时间，生成新流星
        setTimeout(()=> {
            meteorGenerator()

        }, Math.random() * 2000)
    }

    const frame = ()=>{
        count++
        count % 10 == 0 && stars.blink()
        moon.draw()
        stars.draw()

        meteors.forEach((meteor, index, arr)=> {
            //如果流星离开视野之内，销毁流星实例，回收内存
            if (meteor.flow()) {
                meteor.draw()
            } else {
                arr.splice(index, 1)
            }
        })
        requestAnimationFrame(frame)
    }
    meteorGenerator()
    frame()
  },

}
</script>

<style scoped>
#menu {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.canvas {
    height: 21rem;
    width:50rem;
    
    z-index: -1;
}

.city {
  width: 100%;
  height: 170px;
    position: absolute;
    bottom: 1rem;
    z-index: 100;
    background: url('../../static/images/city.png') no-repeat;
    background-size: cover;
}
.moon {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 100px;
  top: 100px;
  background: url('../../static/images/moon.png') no-repeat;
  background-size: cover;
}
.inpt{
  position: absolute;
  top: 5rem;
  left:17rem;
  z-index: 100;
  color: #066197;
  margin:auto;

}
.el-form-item{
  width:15.5rem ;
}
</style>