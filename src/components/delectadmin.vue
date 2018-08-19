<template>
    <div id="mytable">
       <el-pagination
         @current-change="handleCurrentChange"
         :current-page.sync="currentPage1"
         :page-size="5"
         
         layout="total, prev, pager, next"
         :total="this.allData.length">
        </el-pagination>

      
      <el-table
        :data="allData.slice((currentPage1-1)*5,currentPage1*5)"
        stripe
        :fixed="true"
        :border="true"
        style="text-align:left;">
        <el-table-column
          prop="picbase64"
          label="头像"
          width="180">
            <template slot-scope="scope">
                     <img :src="scope.row.picbase64" width="40" height="40" class="head_pic"/>
               </template>
        </el-table-column>
        <el-table-column
          prop="administ"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="jod"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="token"
          label="操作">
             <template slot-scope="scope">
                      <el-button type="danger" round @click="handdelectde(scope.row.token,scope.row.administ)">删除该管理员</el-button>
             </template>
        </el-table-column>
      </el-table>
    </div>  
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        currentPage1: 1,
        allData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        ],

      }
    },
    computed:{
      ...mapGetters([
      'getlocalapi',
    ])},
    methods:{
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
      handdelectde(x,y) {
        var postdata={"mutationType":"delectoneadmin","token":x}
        if(y=="aokxf"){
           const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  h('span', null, 'aokxf禁止更改他的信息 '),
                  h('i', { style: 'color: teal' }, '')
                ])
              });
        }else{
          axios.post(this.getlocalapi+"/MTadmin",JSON.stringify(postdata)) 
          .then(response => {
            if(response.data.code=="ok"){
              const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  h('span', null, '删除成功 '),
                  h('i', { style: 'color: teal' }, '')
                ])
              });
              this.getdata()
            }
          })
          .catch(err => {
           console.log(err);
          }) 
        }
      },
      getdata(){
        var postdata={"mutationType":"getalladmin"}
        axios.post(this.getlocalapi+"/MTadmin",JSON.stringify(postdata)) 
        .then(response => {
            this.allData=response.data
        })
       .catch(err => {
           console.log(err);
        })   
      }
    },
    created() {
      this.getdata()
    },
  }
</script>
<style scoped>
#mytable{
  width:25rem;
  margin-top:1.5rem;
}
el-table{
  text-align:center;
}
</style>