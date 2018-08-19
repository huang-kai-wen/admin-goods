<template>
<div id="myupbox">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="商品名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="商品价格">
    <el-input id="myinput" v-model="form.price" placeholder="单位￥/元："></el-input>
  </el-form-item>
  <el-form-item label="商品数量">
    <el-input id="myinput" v-model="form.count" placeholder="请填入整数，不要填一个/一条/一只等等"></el-input>
  </el-form-item>
  <el-form-item label="商品类型">
    <el-select v-model="form.type1" placeholder="商品类型">
      <el-option label="水果" value="fruit"></el-option>
      <el-option label="蔬菜" value="vegetables"></el-option>
      <el-option label="鱼" value="fish"></el-option>
      <el-option label="肉" value="meat"></el-option>
      <el-option label="蜂蜜" value="bee"></el-option>
      <el-option label="菜干" value="pickles"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="特别标志">
      <el-checkbox v-model="form.hot">设为热卖产品</el-checkbox>
      <el-checkbox v-model="form.isnew">设为上市新品</el-checkbox>
  </el-form-item>
  <el-form-item label="商品图片">
    <input type="file"  ref="input1"  @change= "getpicbase64">
    <img :src="form.picbase64"/>
  </el-form-item> 
  <el-form-item label="商品简要说明">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
import axios from 'axios';
import { mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        form: {
         mutationType:'addgoods',
         price:"",
         count:"",
          picbase64: '',
          name: '',
          type1: '',
          date1: '',
          hot: false,
          isnew: true,
          desc: ''
        }
      }
    },
    computed:{
      ...mapGetters([
      'getlocalapi',
    ])},
    methods: {
      onSubmit() {
       Date.prototype.pattern=function(fmt) {
         var o = {
         "M+" : this.getMonth()+1, //月份
         "d+" : this.getDate(), //日
         "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
         "H+" : this.getHours(), //小时
          "m+" : this.getMinutes(), //分
          "s+" : this.getSeconds(), //秒
           "q+" : Math.floor((this.getMonth()+3)/3), //季度
          "S" : this.getMilliseconds() //毫秒
        };
         var week = {
           "0" : "/u65e5",
           "1" : "/u4e00",
           "2" : "/u4e8c",
           "3" : "/u4e09",
           "4" : "/u56db",
           "5" : "/u4e94",
           "6" : "/u516d"
          };
          if(/(y+)/.test(fmt)){
              fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
          }
            if(/(E+)/.test(fmt)){
                fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
            }
           for(var k in o){
             if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
           }
          return fmt;
        }
      this.form.date1= new Date().pattern("yyyy-MM-dd hh:mm:ss") 
      console.log(this.form.date1)
        axios.post(this.getlocalapi+"/goods",JSON.stringify(this.form)) 
          .then(response => {
            if(response.data.code=="ok"){
              const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  h('span', null, '加入成功 '),
                  h('i', { style: 'color: teal' }, '')
                ])
              });
              
              this.formmu.price=""
              this.formmu.count=""
              this.formmu.picbase64= ''
              this.formmu.name= ''
              this.formmu.type1=''
              this.formmu.date1= ''
              this.formmu.hot=false
              this.formmu.isnew= true
              this.formmu.desc= ''
            }
          })
          .catch(err => {
           console.log(err);
          }) 
        
       
      },
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
                    that.form.picbase64=reader.result
                   // console.log(reader.result);
                }
            }
        }  
      },
    }
  }
</script>
<style scoped>
#myupbox{
  width:17rem;
  margin-top:3rem;
  margin-left:0.5rem;
}
img{
  height:1.5rem;
  width:2rem;
}
#myinput{
  width:1rem !import;
}
</style>