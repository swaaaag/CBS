<template>
  
    <el-header class="nav-box mgb20">
      <div class="nav-title">我的任务-模板下载</div>
      <el-button class="refresh" type="info" plain @click="refresh">刷新</el-button>
    </el-header> 

    <el-main class="container">
        <el-empty description="空空如也" />
    </el-main>


</template>

<script setup name="tempDown">
import { ref } from 'vue';
import { taskApi } from '@/api/modules/myTask';
import { ElMessage } from 'element-plus';

const schoolID = JSON.parse(localStorage.getItem('userInfo')).SchoolId;

const getTempList = async() => {
  const res = await taskApi.getTempList(schoolID);
  const json = res.data;
  if(json.Status == 200){
    console.log(json.Data)
  }else{
    ElMessage.error(json.Data)
  }
}
getTempList();

const refresh = () => {
  window.location.reload();
}
</script>

<style lang="scss" scoped>

.mgb30 {
  margin-bottom: 30px;
}
.nav-box{ 
    height: 70px;
    background-color: #fff;
    .nav-title{
        float: left;
        font-size: 1.5em;
        color: gray;
        margin: 15px;
    }
    .refresh{ 
        float: right;
        margin: 15px;
        font-size: 1em;
    }
}


</style>