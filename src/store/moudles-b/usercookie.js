// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var _user = {"username": "", "password":"","adress":"","phone":"",}
 
export default {
  resetuser (newuser={}) {
    if(typeof(newuser.username)!=="undefined"){
       _user=newuser; 

       var date=new Date(); 
       var expiresDays=10; 
       date.setTime(date.getTime()+expiresDays*24*3600*1000); 

       document.cookie="username="+_user.username+";expires="+date.toGMTString();  
       document.cookie="userpassworld="+_user.password+";expires="+date.toGMTString();  
      document.cookie= "useradress="+_user.adress+";expires="+date.toGMTString();  

      document.cookie= "userphone="+_user.phone+";expires="+date.toGMTString(); 
      
      }
  },
 getuser () {
    
    var strCookie=document.cookie; 
     var arrCookie=strCookie.split("; "); 
    for(var i=0;i<arrCookie.length;i++){ 
        var arr=arrCookie[i].split("="); 
        if(arr[0]=="username") {_user.username=arr[1]}
        if(arr[0]=="password") {_user.password=arr[1]}
        if(arr[0]=="adress") {_user.adress=arr[1]}
        if(arr[0]=="phone") {_user.phone=arr[1]}  
       } 
      
    if(typeof(_user.username)!=="undefined"){ 
       
       return _user
        }else{
      return null
    } 
  },
  delectuser(){
    var strCookie=document.cookie; 
    var arrCookie=strCookie.split("; ");
    for(var i=0;i<arrCookie.length;i++){ 
        var arr=arrCookie[i].split("="); 
        if(arr[0]=="username") {
         var date = new Date(); 
        date.setTime(date.getTime() - 10000); 
        document.cookie = "username" + "=a; expires=" + date.toGMTString(); 
        }
        if(arr[0]=="password") {
          var date = new Date(); 
        date.setTime(date.getTime() - 10000); 
        document.cookie = "password" + "=a; expires=" + date.toGMTString(); 
        }
        if(arr[0]=="adress") {
         var date = new Date(); 
        date.setTime(date.getTime() - 10000); 
        document.cookie = "adress" + "=a; expires=" + date.toGMTString(); 
        }
        if(arr[0]=="phone") {
        var date = new Date(); 
        date.setTime(date.getTime() - 10000); 
        document.cookie = "phone"+ "=a; expires=" + date.toGMTString(); 
        }  
       }  
    
  }
}