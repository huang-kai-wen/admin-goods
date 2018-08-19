import axios from 'axios';
import qs from 'qs';
export default {
  axioslogin(obj){
     axios.post('http://192.168.0.5:3000/123',JSON.stringify(obj))
    .then(response => {
    console.log(response);
    })
    .catch(err => {
     console.log(err);
    })
   },  
 axioslogin(items){
     axios.post( 'http://192.168.0.5:3000/123',{ items:items})
    
                        
  .then(function(response){
    console.log(response);
                        })
  .catch(function(error){
    console.log(error);
                      });
   }
}