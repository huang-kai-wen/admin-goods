<template>
  <div id="menu">
    
    <div class="inpt">
    
      <el-form>
            <el-button type="primary" @click="submitForm(formName)" v-bind:disabled="beDisabled">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
            <el-form-item label="名称">
                <el-input type="text" id="user" v-model="formName.username" @change="inputBlur('user',formName.username)"  placeholder="清输入名称"></el-input>
                <p>{{userError}}</p>
            </el-form-item>
            <el-form-item label="职位">
                <el-input type="text" id="job" v-model="formName.job"   placeholder="清输入职位"></el-input>
            </el-form-item>
            <el-form-item label="密码">
               <el-input type="password" id="password" v-model="formName.password" @change="inputBlur('password',formName.password)"  placeholder="最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"></el-input>
                <p>{{passwordError}}</p>
            </el-form-item>
             <div id="imageupdate"><p>上传头像</p><input type="file"  ref="input1"  @change= "getpicbase64"></div><img :src="formName.picbase64"/>
   </el-form>           
    </div>     
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { mapGetters, mapActions} from 'vuex'
import CryptoJS from "./crypto.js"
export default {
  data() {
    return {
      
      passwordError: '',
      userError: '',
      beDisabled: true,
      formName: {
        mutationType:'addadmins',
        username: '',
        password: '',
        job:'',
        picbase64:""
      }  
    }
  },
  computed:{
      ...mapGetters([
      'getlocalapi',
    ])},
  methods: {
    getpicbase64(){
        var that=this
        var reader = new FileReader();
        var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        var file = this.$refs.input1.files[0];
        var imgUrlBase64;
        if (file) {
            //将文件以Data URL形式读入页面  
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = function (e) {
              //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
              if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                    alert( '上传失败，请上传不大于2M的图片！');
                    return;
                }else{
                    //执行上传操作
                    that.formName.picbase64=reader.result
                   
                }
            }
        }  
    },
   resetForm:function(){
                this.formName.username = '';
                this.formName.password = '';
                this.formName.picbase64 ='';
                this.formName.job ='';
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

                if (this.formName.username != '' && this.formName.password != ''  && this.formName.job != '') {
                    this.beDisabled = false;
                }else{
                    this.beDisabled = true;
                }
    },
     submitForm:function(formName){
                this.formName.password=CryptoJS.aesEncrypt(this.formName.password)
                 var passjson=JSON.stringify(this.formName) 
        axios.post(this.getlocalapi+"/MTadmin",passjson,{headers:{'Content-Type':'multipart/form-data'}})
         .then(response => {
            if(response.data.code=="ok"){
              const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  h('span', null, '新增用户成功 '),
                  h('i', { style: 'color: teal' }, '')
                ])
                
              });
             this.resetForm()
            }
          }) 
         .catch(err => {
           console.log(err);
    }) 
            
    },
  },  
  created() {
    
  },
  mounted() {
    
  },

}
</script>

<style scoped>
#menu {
  
}
.inpt{
  
}
.el-form-item{
  
}
#imageupdate *{
  font-size:0.7rem;
  margin-top:1rem;
  float:left;
  text-align:center;
  margin-left:3rem;
}
img{
  height:3rem;
  width:auto;
  margin-left:-6rem;
}
</style>