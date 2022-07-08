<template>
  <el-header class="nav-box mgb20">
      <div class="nav-title">组长工作-审核日志</div>
      <el-button class="refresh" @click="refresh" type="info" plain>刷新</el-button>
  </el-header>

  <el-main class="main-container">
    <div class="main-header">
        <div class="header-left">{{ stuinfo.stuName }} {{ stuinfo.date.substring(0,7) }}</div>
        <div class="header-right">
            <el-button type="primary" @click="backList">回到列表页</el-button>
        </div>
    </div>

    <div class="main-cont" v-loading="loading">
        <div class="log-title">
            <p v-html="logInfo.title"></p>
        </div>
        <div class="log-cont">
            <span v-html="logInfo.content"></span>
        </div>

    </div>
    
    <div class="btn-box">
        <el-button type="success" size="large" @click="passClick">通过审核</el-button>
        <el-button type="danger" size="large" @click="rejectClick">驳回</el-button>
    </div>
    
    <el-dialog
        :model-value="isVisible"
        title="添加评语"
        @close="resetData"
    >
        <el-card header="评语选择" shadow="never">
            <ul>
                <el-checkbox-group v-model="params.Content">
                    <li v-for="item in commentList" :key="item.ID">
                        <el-checkbox
                            :label="item.ID" :name="item.Content"
                            class="list-item"
                            @change="setCommentContent(item.Content)"
                        >
                            {{ item.Content }}
                        </el-checkbox>
                    </li>
                </el-checkbox-group>
            </ul>
        </el-card>
        <el-row style="margin-top: 10px">
            <el-col :md="24">
                <el-card header="评语内容" shadow="never">
                    <el-input
                        v-model="paramsStr"
                        :rows="5"
                        type="textarea"
                        placeholder="请输入评语内容"
                    />
                </el-card>
            </el-col>
        </el-row>
        <div class="add-btn">
            <el-button type="primary" @click="setComment">提交</el-button>
        </div>
    </el-dialog>

  </el-main>

</template>

<script setup name="dailyTask">
import { ref } from 'vue';
import router from '@/router';
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';
import { groupApi } from '@/api/modules/groupWork';
import { deepClone } from '@/utils/index.js'
const loading = ref(true);
const route = new useRoute();
const { stuID,taskID } = route.params;
const stuinfo = JSON.parse(localStorage.getItem('stuInfo'))

//const stuinfo = JSON.parse(stuInfo);
const logInfo = ref({
  title: '',
  content: '',
});

const getTask = async () => {
    const res = await groupApi.getTaskInfo(stuID,taskID);
    const json = res.data;
    if(json.Status == 200){
        logInfo.value = json.Data;
        loading.value = false;
    }
    else{
        ElMessage.error(json.Data);
        router.push({
            name: 'logTips'
        })
    }
}
getTask();

const commentList = ref([]);
const getCommentList = async() => {
    const res = await groupApi.getComment();
    const json = res.data;
    if(json.Status == 200){
        commentList.value = json.Data;
    }else{
        console.log(json);
    }
}
const params = ref({
    Content: [],
})
const paramsStr = ref('');

const setCommentContent = (content) => {
    if(params.value.Content.includes(content)){
        const index = params.value.Content.indexOf(content);
        params.value.Content.splice(index,1);
    }else{
         params.value.Content.push(content);
    }
    let foo = deepClone(params.value.Content);
    foo.forEach((item)=>{
        if(typeof item == 'number'){
            const inx = foo.indexOf(item);
            foo.splice(inx,1);
        }
    })
    paramsStr.value = foo.toString();
}
const isVisible = ref(false)

const rules = ref({
    Content: [
        { required: true, message: '请输入评语内容', trigger: 'blur' }
    ]
})
const form = ref(null)

const status = ref(false);
const passClick = () => {
    isVisible.value = true;
    status.value = true;
    getCommentList();
}
const rejectClick = () => {
    isVisible.value = true;
    status.value = false;
    getCommentList();
}
const setComment = async () => {
    const res = await groupApi.setComment(stuID,taskID,status.value,paramsStr.value);
    const json = res.data;
    if(json.Status == 200){
       ElMessage.success(json.Data);
       resetData();
       setTimeout(() => {
            router.push({
                name: 'group',
            })
        }, 2000);
    }else{
        ElMessage.error(json.Data);
    }
}


const resetData = ()=>{
    params.value.Content = [];
    isVisible.value = false;
}

const backList = () => {
  router.push('/group/index');
}
//刷新页面
const refresh = () =>{
    window.location.reload()
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
        padding: 50px;
        margin: 0;
        height: 100%;
        overflow: auto;
        background: #fff;
        .log-title{
            font-size: 1.2em;
            color: #504b4b;
            border: solid 1px #b7aaaa;
            text-align: center;
            padding: 1.5em;
        }
        .log-cont{
            font-size: 1.2em;
            color: #504b4b;
            margin-bottom: 1em;
            border: solid 1px #b7aaaa;
            height: 500px;
            padding: 1.5em;
            overflow: auto;
        }
    }

    .btn-box{
        display: flex;
        float: right;
        .el-button{
            width: 10em;
            margin-right: 1em;
        }
    }
}
.list-item{
    white-space:normal;
    word-break : break-all;
    word-wrap: break-word;
    margin: 15px 0;
}
.add-btn{
    text-align: center;
    margin: 1em;
    .el-button{
        width: 15em;
    }
}

</style>