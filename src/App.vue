<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    var scre=document.documentElement.clientWidth
    var scre1=scre/50
    var  strscrel=scre1.toString();
    var  strscre=strscrel+"px";
    document.documentElement.style.fontSize=strscre;
    

   } 

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width:1527px;
  background-color:black;
  overflow:hidden;
  margin:auto;
}
</style>
