// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
const _products = [ 
   {"id": "prod-1", "count": 1, "src":" ../../static/images/jiyu.jpg","smallpic":{"src1":" ../../static/images/jiyu2.jpg","src2":" ../../static/images/jiyu.jpg","src":" ../../static/images/jiyu.jpg",},"poin":"先到先得，售完为止","title":"鲜活三周玲灰背银鲫","new": true,"recommend": true,"price":5,"instruction":"1．鲫鱼所含的蛋白质质优、齐全、易于消化吸收，是肝肾疾病，心脑血管疾病患者的良好蛋白质来源，常食可增强抗病能力，肝炎、肾炎、高血压、心脏病，慢性支气管炎等疾病患者可经常食用。2．鲫鱼有健脾利湿，和中开胃，活血通络、温中下气之功效，对脾胃虚弱、水肿、溃疡、气管炎、哮喘、糖尿病有很好的滋补食疗作用；产后妇女炖食鲫鱼汤，可补虚通乳。3．鲫鱼肉嫩味鲜，可做粥、做汤、做菜、做小吃等。尤其适于做汤，鲫鱼汤不但味香汤鲜，而且具有较强的滋补作用，非常适合中老年人和病后虚弱者食用，也特别适合产妇食用.",}, 
   ] 
export default {
  getProducts (cd,fd) {
    var new_products
    
    new_products=_products.filter((x)=>{return x[cd]==fd})
      console.log(cd) 
    return new_products
  },
 getAllProducts () {
    
    return _products
  }
}