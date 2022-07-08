<template>
  <el-header class="nav-box">
      <div class="nav-title">我的任务-日常任务</div>
      <el-button class="refresh" @click="refresh" type="info" plain>刷新</el-button>
  </el-header>

  <el-main v-loading="loading">
    <el-card shadow="hover" body-style="{padding:'20px'}">
        <template #header>
            <span style="display: inline-block;margin-right: 2em;">我的实训要求</span>
            <el-date-picker
            v-model="dateValue"
            type="month"
            placeholder="请选择月份"
            @change="changeDate"
        />
        </template>
        <div class="car-box">
            <div class="lookForMonth_wrapper">
                <div class="cal-header">
                    <div class="cal-header-item" v-for="item in weekList" :key="item">{{item.label}}</div>
                </div>
                <div class="calendar">
                    <div v-for="(item,index) in calendarData" class="calendar_item" :key='index' :class="{ash:item.color==='ash',date:index>6&&item.color!=='ash'}">
                        <div class="log-box">
                            <span class="log-label">{{item.label}}</span>

                            <div v-if="(item.TaskType == '11' || item.TaskType == '12' || item.TaskType == '13') && (item.Status == 2 || item.Status == 4)" class="green-rz" @click="handleRzClick(item)">日志</div>
                            <div v-if="(item.TaskType == '11' || item.TaskType == '12' || item.TaskType == '13') && (item.Status == 1)" class="red-rz" @click="handleRzClick(item)">日志</div>
                            <div v-if="(item.TaskType == '11' || item.TaskType == '12' || item.TaskType == '13') && (item.Status == 3)" class="orange-rz" @click="handleRzClick(item)">日志
                                <el-icon><Edit /></el-icon>
                            </div>                 
                            <div v-if="(item.TaskType == '11' || item.TaskType == '12' || item.TaskType == '13') && (item.Status == 3)" class="reject">驳回</div>   
                            <div v-if="(item.TaskType != '11' && item.TaskType != '12' && item.TaskType != '13')" class="gray-rz">日志</div>
                            <div class="log-info">
                                <span v-for="file in item.file" :key="file.ID" @click="handleFileClick(file)">
                                    <span v-if="file.TaskType == '21'">实习报告|</span>
                                    <span v-if="file.TaskType == '22'">工作总结|</span>
                                    <span v-if="file.TaskType == '23'">小组总结|</span>
                                    <span v-if="file.TaskType == '24'">实习心得|</span>
                                    <span v-if="file.TaskType == '31'">教学设计|</span>
                                    <span v-if="file.TaskType == '32'">教学课件|</span>
                                    <span v-if="file.TaskType == '33'">实习作品|</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
  </el-main>

</template>

<script setup name="dailyTask">
import { ref } from 'vue';
import { taskApi } from '@/api/modules/myTask';
import router from '@/router';
import { ElMessage } from 'element-plus';

const loading = ref(true);
const dateValue = ref(new Date());
const newdate = ref('');
const noteList = ref([])
const calendarData = ref([]); //日历循环渲染数据

const calDate = ref(new Date());
const formatDate = (date) => {      //yyyy-mm-dd
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}
newdate.value = formatDate(dateValue.value);
const changeDate = (date) => {
    now = date;
    getNow();
    newdate.value = formatDate(date);
    calDate.value = newdate.value;
    getTaskList();
}

const code = JSON.parse(localStorage.getItem('trainInfo')).TrainCode;
const size = 30;
const days = 3;
const getTaskList = async () => {
    const res = await taskApi.getTaskList(code,size,days,newdate.value);
    console.log(res.data);
    const time = [];
    let json = res.data;
    if(json.Status == 200){
        noteList.value = json.Data;
        getCalendarDate();
    }else{
        console.log(json);
    }
}
getTaskList();

// const handleClick = (item) => {
//     router.push({
//         name: 'reportSubmit',
//         params: {
//             id: item.ID,
//             type: item.TaskType
//         }
//     })
// }
const handleRzClick = (item) => {
    if(item.Start){
        router.push({
        name: 'reportSubmit',
        params: {
            id: item.ID,
            type: item.TaskType
        }
    })
    }else{
        ElMessage.warning('请在任务开始后再进行提交！')
    }
    
}

const handleFileClick = (item) => {
    router.push({
        name: 'reportSubmit',
        params: {
            id: item.ID,
            type: item.TaskType
        }
    })
}

const weekList = [
    { label: '日' },
    { label: '一' },
    { label: '二' },
    { label: '三' },
    { label: '四' },
    { label: '五' },
    { label: '六' }
];

const year = ref(0); //当前日期年
const month = ref(0); //当前日期月数
const date =ref(0); //当前日期号数
const day = ref(-1); //当前星期几
// 获取当前月份一号的时间戳
let firstTime = new Date(year.value,month.value-1,1,0,0,0)

// 获取当前时间
var now = new Date();
const getNow = () => { 
    year.value = now.getFullYear();
    month.value = now.getMonth() + 1;
    date.value = now.getDate();
    day.value = now.getDay();
}
getNow();
 // 获取每个月的天数
 const getMonthDays = () => {
    if ([1,3,5,7,8,10,12].includes(month.value)) {
        return 31
      } else if ([4,6,9,11].includes(month.value)) {
        return 30
      } else if (month.value === 2) {
        //  判断当年是否为闰年
        if (
          (year.value % 4 === 0 && year.value % 100 !== 0) ||
          year.value % 400 === 0
        ) {
          return 29
        } else {
          return 28
        }
      }
 }



  // 给calendarData添加当月数据
const getCalendarDate = ()=>{
     calendarData.value = [];
      // 获取当前月份一号星期几
      let firstDay = new Date(year.value + "-" + month.value + "-" + "01").getDay();
      let num = parseInt(firstDay);
      let nowDays = getMonthDays(month.value);
      let lastMonth = month.value - 1>0?month.value - 1:12;
      let lastDays = getMonthDays(lastMonth);
      //   循环添加上一个月数据
      for (let i = 0; i < num; i++) {
        calendarData.value.push({label:lastDays - num + i + 1,color:'ash'});
      }
      // 循环添加当月数据
      //console.log(noteList.value);
      for (let i = 0; i < nowDays; i++) {
        calendarData.value.push({label:i + 1});
        calendarData.value[num+i].file = [];
        noteList.value.forEach((item) => {
            if((item.SubmitTime.substring(0,4) == year.value) && (item.SubmitTime.substring(5,7) == month.value || item.SubmitTime.substring(5,7) == '0'+month.value) && (item.SubmitTime.substring(8,10) == (i + 1) || item.SubmitTime.substring(8,10) == '0'+(i + 1))){
                if(item.TaskType != '11' && item.TaskType != '12' && item.TaskType !='13'){
                    calendarData.value[num+i].file.push(item);
                }
                else{
                    calendarData.value[num+i].ID = item.ID;
                    calendarData.value[num+i].TaskType = item.TaskType;
                    calendarData.value[num+i].SubmitTime = item.SubmitTime;
                    calendarData.value[num+i].Status = item.Status;
                    calendarData.value[num+i].TaskName = item.TaskName;
                    calendarData.value[num+i].Start = item.Start;
                }
            }
        });
      }
      // 循环添加下一个月数据
      if (calendarData.value.length % 7 !== 0) {
        let surplusDay = 7 - (calendarData.value.length % 7);
        for (let i = 0; i < surplusDay; i++) {
          calendarData.value.push({label:i + 1,color:'ash'});
        }
      }
      loading.value = false;
      //console.log(calendarData.value);
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
.car-box{
    width: 90%;
    margin: 0 auto;
    .lookForMonth_wrapper {
        padding: 20px;
        width: 95%;
        margin: auto;
        background: #fff;
    }
    /* 日历表样式=======================================↓ */
    .cal-header{
        width: 100%;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        display: flex;
        box-sizing: border-box;
        background: #99ceed;
        .cal-header-item{
            box-sizing: border-box;
            width: 14.28%;
            height: 4em;
            border-right: 1px solid #ccc;
            //border-bottom: 1px solid #ccc;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
    .calendar {
    width: 100%;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    .calendar_item {
        box-sizing: border-box;
        width: 14.28%;
        height: 6em;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        //cursor: pointer;
        .log-box{
            .log-label{
                font-size: 1em;
                padding: 5px;
            }
            .log-info{
                font-size: 0.8em;
                margin-top: 3em;
                border-top: solid 1px #ccc;
                //cursor: pointer;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-evenly;
                span{
                    cursor: pointer;
                }
                span:hover{
                    font-weight: bold;
                    color: #093aaa;
                }
            }
            
            .green-rz{
                float: right;
                background: #afe5af;
                border: solid 1px #7fbf7f;
                padding: 1px;
                border-radius: 3px;
                margin: 5px;
                cursor: pointer;
            }
            .red-rz{
                float: right;
                background: #f96d6d;
                border: solid 1px #df6666;
                padding: 1px;
                border-radius: 3px;
                margin: 5px;
                cursor: pointer;
            }
            .gray-rz{
                float: right;
                background: #c1c6cf;
                border:solid 1px #b3b7be;
                padding: 1px;
                border-radius: 3px;
                margin: 5px;
            }
            .orange-rz{
                float: right;
                background: #eec34d;
                border:solid 1px #b3b7be;
                padding: 1px;
                border-radius: 3px;
                margin: 5px;
                cursor: pointer;
            }
             .reject{
                    width: 2em;
                    border: solid 1px;
                    padding: 3px;
                    border-radius: 50%;
                    float: right;
                    left: 80px;
                    bottom: 30px;
                    position: relative;
                    color:#c94848;
                }
        }
        .log-box>div:not(.log-info):hover{
                    font-weight: bold;
                    color: #093aaa;
                }
    }
    .ash{
        color: gainsboro;
    }
    }
}
</style>