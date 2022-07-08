<template>

    <el-header class="nav-box mgb20">
      <div class="nav-title">我的任务-提交报告</div>
      <el-button class="refresh" type="info" @click="refresh" plain>刷新</el-button>
    </el-header> 

    <el-main class="container">
        <div class="table-box">
            <el-table
                :data="tableList"
                stripe
                :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}"
                style="width: 100%">
                <el-table-column
                    prop="TaskName"
                    label="内容"
                    width="500">
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="SubmitTime"
                    label="应提交日期"
                    width="270">
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="RealSubmitTime"
                    label="实际提交日期"
                    width="270">
                </el-table-column>
                <el-table-column label="状态">
                    <template #default = "{row}">
                        <el-tag :type="row.IsSubmit ? 'success' : 'info'">{{row.IsSubmit ? '已提交' : '已补交'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default = "{row}">
                        <el-button type="primary" @click="handlePreviewClick(row)">预览</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="sel-content" v-if="!showLog">
            <div class="sel-file mgb20">
                请选择上传文件：
                <el-upload
                    class="upload-demo"
                    :file-list="FileList.value"
                    action=""
                    multiple
                    :auto-upload = "false"
                    :on-change="onChange"
                    :on-remove="removeFile"
                    >
                    <template #trigger>
                         <el-button type="primary" class="selbtn">选择文件</el-button>
                    </template>
                </el-upload>
                <el-button type="success" class="upbtn" :loading="loading" @click="submitClick">{{loading?"上传中...":"上传"}}</el-button>
           </div>
        </div>

        <div class="editor-box" v-if="showLog">
            <div>
                <el-tag  effect="dark" size="large" class="tag mgb20">日志填写</el-tag>
            </div>
                <div style="border: 1px solid #ccc">
                <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
                />
                <Editor
                style="height: 400px; overflow-y: hidden;"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
                />
            </div>
            <div>
                <el-button style="float:right;margin-top:1em" type="success" size="large" @click="submitLog">提交日志</el-button>
            </div>
        </div>

         <el-card header="详细内容" shadow="never" v-if="!showLog">
             <div class="doc">
                <div ref="preview" />
            </div>
        </el-card>

        <el-dialog v-model="dialogTableVisible" title="日志内容预览">
            <span v-html="previewHtml"></span>
        </el-dialog>

    </el-main>


</template>

<script setup name="reportSubmit">
import { useRoute } from 'vue-router'
import { Download } from '@element-plus/icons-vue';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount,ref, shallowRef, onMounted, toRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessageBox,ElMessage } from 'element-plus'
import { taskApi } from '@/api/modules/myTask'
import { renderAsync } from 'docx-preview'
import axios from 'axios'
import { booleanTypeAnnotation } from '@babel/types';
import router from '@/router';
components: { Editor, Toolbar };

const docx = require('docx-preview');
window.JSZip = require('jszip')
const route = useRoute();
const { id,type } = route.params;
const showLog = type == '11' || type == '12' || type == '13';
const preview = ref(null)
//富文本编辑器
const titleValue = ref('')
const dateValue = ref('')
// 编辑器实例shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
const mode = 'default'; // 或 'simple'
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
// 组件销毁时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
//日志提交
const submitLog = () =>{
    ElMessageBox.confirm(
    '您确定要提交吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      taskApi.submitLog(id,valueHtml.value,IsUpdate.value)
        .then((res) => {
            let json = res.data;
            if(json.Status == 200){
                ElMessage.success(json.Data)
                router.push({
                    name:"dailyTask"
                })
            }else{
                ElMessage.error(json.Data)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
    
}
//文件上传
const FileList = ref([]);
const File = ref('');
const onChange = (file) => {
  renderAsync(file.raw, preview.value)      //预览
  File.value = file;
  const fileName = file.name
  const fileType = fileName.substring(fileName.lastIndexOf('.'))
  if (fileType !== '.docx') {
      ElMessage({
            message: '请上传后缀名为docx的文件！',
            type: 'error',
          })
      return false
  }
  const isLt2M = file.size / 1024 / 1024 < 100
  //限制上传的文件大小
  if (!isLt2M) {
     ElMessage.warning('上传的文件大小不能超过100MB')
    return
  }
  FileList.value.push(file)

}

const removeFile = (file)=>{
  FileList.value.forEach((item) => {
    if(item.uid == file.uid) {
      let idx = FileList.value.indexOf(item);
      FileList.value.splice(idx,1);
    }
  })
}

const loading = ref(false);
const submitClick = () =>{
    if(FileList.value == ""){
        ElMessage.error('请重新选择上传文件')
        return false;
    }
    ElMessageBox.confirm(
    '您确定要提交吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        loading.value = true
        var formdata = new FormData()
        formdata.append('file',FileList.value[0].raw)
        //formdata.append('filedata',FileList.value)
        taskApi.submitFile(id,formdata,IsUpdate.value)
        .then(res =>{
            loading.value = false
            if(res.data.Status == 200){
                FileList.value = [];
                ElMessage.success(res.data.Data) ;
                router.push({
                    name:"dailyTask"
                })
                //getListByType();
            }else{
                ElMessage.error(res.data.Data)
            }
                
        })
        .catch(err =>{
            console.log(err)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
    
}

const tableList = ref([]);
const typeName = ref('');
switch(type){
    case '11':
        typeName.value = 'RchbDay';
        break;
    case '12':
        typeName.value = 'RchbWeek';
        break;
    case '13':
        typeName.value = 'RchbMonth';
        break;
    case '21':
        typeName.value = 'SxcgXsbg';
        break;
    case '22':
        typeName.value = 'SxcgGzzj';
        break;
    case '23':
        typeName.value = 'SxcgXzzj';
        break;
    case '24':
        typeName.value = 'SxcgSxxd';
        break;
    case '31':
        typeName.value = 'SxzpJxsj';
        break;
    case '32':
        typeName.value = 'SxzpJxkj';
        break;
    case '33':
        typeName.value = 'SxzpXa';
        break;
}
const getListByType = () =>{
    taskApi.getListByType(typeName.value)
        .then(res =>{
            tableList.value = res.data.Data
        })
        .catch(err =>{
            console.log(err)
        })
}
getListByType();

const IsUpdate = ref(false);
const getSubmit = () =>{
    taskApi.getSubmit(id)
        .then(res =>{
            if(res.data.Status == 200){
                const json = res.data.Data;
                if(type == '11'|| type == '12'||  type == '13'){
                    if(json.isSumbit){
                        valueHtml.value = json.content
                        IsUpdate.value = true
                    }else{                       
                        ElMessage.warning('当前日志未提交，请及时提交！')
                    }
                }
                else{
                    if(json.isSumbit){
                        IsUpdate.value = true
                    }else{
                        ElMessage.warning('当前任务未提交，请及时提交！')
                    }
                }
                
            }
        })
        .catch(err =>{
            console.log(err)
        })
}
getSubmit();
const yqurl = 'http://api.yunql.cn';
const previewHtml = ref('');
const dialogTableVisible = ref(false);
const handlePreviewClick = (item) => {
    taskApi.getSubmit(item.TaskID)
        .then(res =>{
            if(res.data.Status == 200){
                const json = res.data.Data;
                //console.log(item.TaskType)
                if(type == '11' || type == '12' || type == '13'){                
                    previewHtml.value = json.content
                    dialogTableVisible.value = true
                }else{
                    const fileSrc = yqurl + json.content
                     axios.get(fileSrc, { responseType : 'blob'}).then(res => {
                        renderAsync(res.data, preview.value)
                    })
                }
            }
        })
        .catch(err =>{
            console.log(err)
        })
}

//刷新页面
const refresh = () =>{
    window.location.reload()
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

.container{ 
    padding: 30px;
    background: #fff;
    .table-box{

    }
    .sel-content{
        padding: 20px;
        .sel-task{
            margin-bottom: 20px;
        }
        .sel-file{
            display: flex;
            align-items: baseline;
            font-size: 1.2em;
            line-height: 3em;
            margin-top: 20px;
            .selbtn{
                margin-left: 20px;
                width: 120px;
            }
            .upbtn{
                
                width: 120px;
            }
        }
        .sel-table{}
    }
    .content-preview{ 
        background: #ebecef;
        padding: 80px;
        .pre-title{ 
            padding: 10px;
        }
        .pre-cont{ 
            padding: 20px;
            height: 700px;
            border: solid;
            width: 80%;
            margin: 0 auto;
        }
        .pre-footer{ 
            float: right;
            margin-top: 30px;
            .yx-btn{
                font-size: 1.2em;
                height: 2em;
            }
            .tj-btn{ 
                font-size: 1.2em;
                height: 2em;
                margin-left: 2em;
            }
        }
    }

}
.tag{ 
    font-size: 1.3em;
    height: 2em;
}

.editor-box{
    margin: 20px auto;
    width: 90%;
}

.prop-box{
    margin: 10px auto;
    width: 90%;
    display: flex;
    justify-content: space-around;
    .prop-time{}
    .prop-title{
        
    }
}
.upload-demo{
    width: 200px;
}
.my-component{
  width: 100%;
  height: 90vh;
  border: 1px solid #000;
}
.doc {
    height:600px;
    overflow-x: auto;
}
</style>