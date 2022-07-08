<template>
  <el-header class="nav-box mgb20">
      <div class="nav-title">组长工作-未交日志提醒</div>
      <el-button class="refresh" @click="refresh" type="info" plain>刷新</el-button>
  </el-header>

  <el-main class="main-container">
    <div class="main-header">
        <div class="header-left">{{ stuinfo.stuName }} {{ stuinfo.date.substring(0,7) }}</div>
        <div class="header-right">
            <el-button type="primary" @click="backList">回到列表页</el-button>
        </div>
    </div>

    <div class="main-cont">
        <div class="tips-title">
            <el-icon size="100px" color="#ff8f00"><WarningFilled /></el-icon>
            <div class="tips-title-text">抱歉！未提交日志</div>
        </div>
        <div class="tips-cont">
            <textarea placeholder="请输入提醒信息：" v-model="tipsInfo.content" class="text-cont"></textarea>
        </div>

        <div class="btn-box">
            <el-button type="danger" size="large" @click="passClick">发送提醒</el-button>
        </div>

    </div>

    
    

  </el-main>

</template>

<script setup name="dailyTask">
import { ref } from 'vue';
import router from '@/router';
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';
const route = new useRoute();
const stuinfo = JSON.parse(localStorage.getItem('stuInfo'))

const tipsInfo = ref({
  id: '1',  
  title: '',
  content: '',
});

const passClick = () => {
  //logInfo.value.status = '已通过';
  console.log(tipsInfo.value);
  ElMessage.success('提醒发送成功！');
}


const backList = () => {
  router.push('/group/index');
}
//刷新页面
const refresh = () =>{
    // window.location.reload()
    router.go(0);
}

</script>

<style lang="scss" scoped>

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

.main-container{
    width: 90%;
    padding: 50px;
    margin: 0 auto;
    background: #fff;
    .main-header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .header-left{
            font-size: 1.2em;
            color: #504b4b;
        }
        .header-right{
            display: flex;
            .el-button{
                margin-right: 1em;
            }
        }
    }
    .main-cont{
        padding: 0.5em;
        margin: 0;
        height: 100%;
        overflow: auto;
        background: #fff;
        border: solid 1px #ebebeb;
        .tips-title{
            font-size: 1.5em;
            color: #504b4b;
            text-align: center;
            padding: 1.5em;
        }
        .tips-cont{
            font-size: 1.2em;
            color: #504b4b;
            margin: 0 auto;
            margin-bottom: 1em;
            border: solid 1px #b7aaaa;
            height: 100px;
            padding: 1.5em;
            width: 80%;
            .text-cont{
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                resize: none;
                font-size: 1.2em;
                color: #504b4b;
                padding: 0.5em;
            }
        }
        .btn-box{
            margin: 2em 0;
            float: right;
            .el-button{
                width: 10em;
                margin-right: 1em;
            }
        }
    }

    
}


</style>