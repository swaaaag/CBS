<template>

   <el-header class="nav-box mgb20">
      <div class="nav-title">控制面板</div>
      <el-button class="refresh" type="info" plain @click="refresh">刷新</el-button>
    </el-header> 

    <el-main class="main-box" >
      <div class="card-box mgb30">
        <el-card shadow="hover" v-for="(item,index) in summanyList" :key="index" class="card" :style="{ background: item.color }" @click="handleCardClick(item)">
          <template #header>
            <div class="card-header">
              <span>{{ item.StatName }}</span>
            </div>
          </template>
          <div class="card-status">
            <span v-for="(row,index) in item.StatRow" :key="index">{{ row.TargetName }} ({{row.TargetCount}})</span>
          </div>
        </el-card>
      </div>

      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="never">
            <template #header>
              <div class="card-header">
                <span>我的技能分析</span>
              </div>
            </template>
            <div class="chart-left">
              <div class="chart-bar" id="chart1"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <template #header>
              <span>我的成绩分析</span>
            </template>
            <div class="chart-right">
              <div class="chart-bar" id="chart"></div>
            </div>
          </el-card>
        </el-col>
      </el-row> -->

    </el-main>

</template>

<script setup name="dashboard">
import { ref,onMounted } from 'vue';
import { dashApi } from '@/api/modules/dashboard';
import { skillApi } from "@/api/modules/learnAnalysis";
import { useRouter } from 'vue-router';
import * as echarts from "echarts";
//const loading = ref(true);
const router = useRouter();
const summanyList = ref([]);
// const params = ref({
//   userID: JSON.parse(localStorage.getItem("userInfo")).UserID,
//   productID: 1,
//   skillID: "",
// });
const getPanelTotal = () => {
  dashApi.getPanelTotal().then(res => {
    summanyList.value = res.data.Data;
    summanyList.value[0].color = 'rgb(247 185 82)';
    summanyList.value[1].color = 'rgb(113 133 227)';
    summanyList.value[2].color = 'rgb(249 118 69)';
    summanyList.value[3].color = 'rgb(87 183 121)';
    if(summanyList.value[4]){
      summanyList.value[4].color = 'rgb(113 133 227)';
    }
  });
}

getPanelTotal();

const handleCardClick = (item) => {
  switch(item.StatName){
    case '我的日志':
      router.push({
        name: 'dailyTask',
      })
      break;
    case '实训成果':
      router.push({
        name: 'trainRes',
      })
      break;
    case '就业反馈':
      router.push({
        name: 'jobFeedback',
      })
      break;
    case '实习报告':
      router.push({
        name: 'taskReport',
      })
      break;
    case '审批日志':
    router.push({
      name: 'group',
    })
    break;
 }
}

onMounted(() => {
  // getSkillStat();
  // getTaskTotal();
});
const getSkillStat = async () => {
  const res = await skillApi.getSkillStat(params.value);
  const json = res.data;

  let myChart1 = echarts.init(document.getElementById("chart1"));
  if (json.Status == 200) {

    const radarArray = [];
    const seriesArray = [];
    const Max = ref(null);
    const countList = [];
    json.Data.forEach((item) => {
      countList.push(item.Count);      
    })
    Max.value = Math.max(...countList)+3;
    json.Data.forEach((item) => {
      const obj = {};
      obj.name = item.SkillName;
      obj.max = Max.value;
      radarArray.push(obj)
      seriesArray.push(item.Count)
    });
      myChart1.setOption({
      title: {
        text: "",
      },
      radar: {
        indicator:radarArray,
      },
      series: [
        {
          name: "",
          type: "radar",
          areaStyle: {},
          data: [
            {
              value: seriesArray
            },
          ],
        },
      ],
    });
  }
};

const getTaskTotal = async () => { 
  const res = await skillApi.getTaskTotal();
  const json = res.data;
  let myChart = echarts.init(document.getElementById("chart"));

  if(json.Status == 200){
    const jsonData = json.Data;
    const statName = [];
    const completed = [];
    const unCompleted = [];
    jsonData.forEach(ele => {
      statName.push(ele.StatName);
      unCompleted.push(ele.StatRow[0].TargetCount);
      if(ele.StatRow[1]){
        completed.push(ele.StatRow[1].TargetCount);
      }
    });
    
    const chartOptions = ref({
      title: {
        text: "",
      },
      tooltip: {},
      // legend: {
      //   data: ['']
      // },
      xAxis: {
        data: statName,
      },
      yAxis: {},
      series:[
        {
          name:'应完成',
          data:unCompleted,
          type:'bar',
          stack:'情况分析'
        },
        {
          name:'审核通过',
          data:completed,
          type:'bar',
          stack:'情况分析'
        }
      ]
    });
      const option = chartOptions.value;
      myChart.setOption(option);
      loading.value = false;
  }
  
};
//刷新页面
const refresh = () => {
  //getPanelTotal();
    window.location.reload();
}

</script>

<style lang="scss" >

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

.main-box{
    
    background-color: #fff;
    padding: 20px;
    .card-box{  
      display: flex;
      justify-content: space-around;
      .card{ 
        cursor: pointer;
        width: 300px;
        height: 180px;
        margin: 10px;
        border-radius: 10px;
        color: #fff;
        .card-header{
          height: 20px;
          line-height: 20px;
          font-size: 1em;
        }
        .el-card__body {
          padding: 20px 10px;
          .card-status{
          height: 40px;
          line-height: 40px;
          font-size: 1.2em;
          display: flex;
          justify-content: space-around;
        }
        }
        
      }
    }

     .chart-left {
      height: 300px;
      display: flex;
      .chart-bar {
        width: 100%;
        height: 100%;
      }
    }
    .chart-right {
      height: 300px;
      display: flex;
      .chart-bar {
        width: 100%;
        height: 100%;
      }
    }
}

</style>