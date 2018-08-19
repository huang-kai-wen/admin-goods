<template>
    <div id="home">
        <canvas id="canvas" class="canvas"></canvas>
           <div id="info">
              <h2>aok.technology</h2>
               <img :src="picbase64"/>
               <h1>{{this.job}}</h1>
               <h1>{{this.admins}}</h1>
           </div> 
           <div id="dropdowntoggle">
               <el-menu  default-active="2" class="el-menu-vertical-demo"  
               background-color="#545c64"  text-color="#fff"  active-text-color="#ffd04b">
                    <el-submenu index="1">
                       <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>管理员自助</span>
                      </template>
                        <el-menu-item class="backup" index="1-1" @click="$router.push({path:'/memus/changeinfo'})">修改我的信息</el-menu-item>
                        <el-menu-item class="backup" index="1-2" @click="$router.push({path:'/memus/addadmins'})">增加新管理员</el-menu-item>
                        <el-menu-item class="backup" index="1-3" @click="$router.push({path:'/memus/delectadmin'})">删除管理员</el-menu-item>
                   </el-submenu>
              </el-menu>
               <el-menu  default-active="2" class="el-menu-vertical-demo"   
                 background-color="#545c64"  text-color="#fff"  active-text-color="#ffd04b">
                  <el-submenu index="2">
                       <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>商品管理</span>
                      </template>
                        <el-menu-item class="backup" index="2-3" @click="$router.push({path:'/memus/addgoods'})">增加商品</el-menu-item>
                        <el-menu-item class="backup" index="2-4" @click="$router.push({path:'/memus/delectgoods'})">删除商品</el-menu-item>
                   </el-submenu>
               </el-menu>
               <el-menu  default-active="2" class="el-menu-vertical-demo"  
                 background-color="#545c64"  text-color="#fff"  active-text-color="#ffd04b">
                  <el-submenu index="3">
                       <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>订单管理</span>
                      </template>
                        <el-menu-item class="backup" index="3-1">查看订单汇总</el-menu-item>
                        <el-menu-item class="backup" index="3-2">标记发货</el-menu-item>

                   </el-submenu>
               </el-menu>
           </div>
                  
           <div id="forrouter">
          
              <router-view></router-view>
            
            
           </div>
        
    </div>
</template>
 
<script>
import axios from 'axios';
import { mapGetters, mapActions} from 'vuex'
export default {
 data() {
        return {
            picbase64:"",
            admins:'',
            job:''
        }
    },
    
     methods: {
     
     },
    mounted() {
        var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineWidth = .3;
        ctx.strokeStyle = (new Color(150)).style;

        // var mousePosition = {
        //  x: 30 * canvas.width / 100,
        //  y: 30 * canvas.height / 100
        // };
        var mousePosition = {
            x:  canvas.width - 100,
            y:  canvas.height - 60
        };

        var dots = {
            nb: 250,
            distance: 100,
            d_radius: 150,
            array: []
        };

        function colorValue(min) {
            return Math.floor(Math.random() * 255 + min);
        }

        function createColorStyle(r,g,b) {
            return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
        }

        function mixComponents(comp1, weight1, comp2, weight2) {
            return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
        }

        function averageColorStyles(dot1, dot2) {
            var color1 = dot1.color,
            color2 = dot2.color;

            var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
            g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
            b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
            return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
        }

        function Color(min) {
            min = min || 0;
            this.r = colorValue(min);
            this.g = colorValue(min);
            this.b = colorValue(min);
            this.style = createColorStyle(this.r, this.g, this.b);
        }

        function Dot(){
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.vx = -.5 + Math.random();
            this.vy = -.5 + Math.random();

            this.radius = Math.random() * 2;

            this.color = new Color();
        }

        Dot.prototype = {
            draw: function(){
                ctx.beginPath();
                ctx.fillStyle = this.color.style;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
            }
        };

        function createDots(){
            for(var i = 0; i < dots.nb; i++){
                dots.array.push(new Dot());
            }
        }

        function moveDots() {
            for(var i = 0; i < dots.nb; i++){

                var dot = dots.array[i];

                if(dot.y < 0 || dot.y > canvas.height){
                    dot.vx = dot.vx;
                    dot.vy = - dot.vy;
                }
                else if(dot.x < 0 || dot.x > canvas.width){
                    dot.vx = - dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        }

        function connectDots() {
            for(var i = 0; i < dots.nb; i++){
                for(var j = 0; j < dots.nb; j++){
                    var i_dot = dots.array[i];
                    var j_dot = dots.array[j];

                    if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                        if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                            ctx.beginPath();
                            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }

        function drawDots() {
            for(var i = 0; i < dots.nb; i++){
                var dot = dots.array[i];
                dot.draw();
            }
        }

        function animateDots() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            moveDots();
            connectDots();
            drawDots();

            requestAnimationFrame(animateDots); 
        }

        //----------------------跟着鼠标动--------------------
        document.getElementById('home').addEventListener('mousemove', function(e){
            mousePosition.x = 10;
            mousePosition.y = 10;
        });

        document.getElementById('home').addEventListener('mouseleave', function(e){
            mousePosition.x = canvas.width / 2;
            mousePosition.y = canvas.height / 2;
        });
        //----------------------跟着鼠标动--------------------

        createDots();
        requestAnimationFrame(animateDots);
    },
    computed:{
      ...mapGetters([
      'getlocalapi',
    ])},
  created() {
     if(!sessionStorage.token){
         window.location.href ="http://localhost:8080/";
      }else{
          console.log(this.getlocalapi)
         
         console.log(sessionStorage.token)
         axios.post(this.getlocalapi+"/MTadmin",JSON.stringify({mutationType:"getallinfo",tokon:sessionStorage.token})) 
    
         .then(response => {
          console.log(response)
          if (response.data.code=="ok") {
             this.job=response.data.job
             this.admins=response.data.administ
             this.picbase64=response.data.strbase64
             sessionStorage.admins=response.data.administ
          }; 
         })
         .catch(err => {
         console.log(err);

      }) 
      }
   
  }
}
    
</script>

<style scoped>
#canvas{
  width:50rem;
  height:26rem;
}
#info{
position:absolute;
top:0;
font-size:0.3rem;
 height:2rem;
 width:100%    
}
 #info *{
   float:right;
   margin-left:1.5rem;
   margin-right:1.5rem;
   margin-top:1rem;
 }
 #info h2{
   float:left;
 } 
 #info img{
   border-radius:70%;
   height:2rem;
 }
 .backup{
   margin-left:3rem;
   text-align:left;
 }
 #dropdowntoggle{
   position:absolute;
   top:2rem;
   width:10rem;
   opacity:0.5;

 } 
 .el-icon-location{

 } 
 #forrouter{
  height:auto;
  width:35rem;
  position:absolute;
  top:2rem;
  left:13rem;
 }
</style>