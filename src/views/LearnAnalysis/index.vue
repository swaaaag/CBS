<template>
  <el-header class="nav-box mgb20">
    <div class="nav-title">学情分析</div>
    <el-button class="refresh" type="info" plain @click="refresh"
      >刷新</el-button
    >
  </el-header>

  <el-main class="main-box">
    <div class="chart-box">
      <div class="title mgb20">学情分析</div>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-card shadow="never">
            <template #header>
              <div class="card-header">
                <span>任务情况分析</span>
              </div>
            </template>
            <div class="chart-left">
              <div class="chart-bar" id="chart"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <template #header>
              <div class="card-header">
                <span>学习技能分析</span>
              </div>
            </template>
            <div class="chart-right">
              <div class="chart-bar" id="chart1"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="list-box">
      <div class="list-header">详细技能情况</div>
      <div class="list-main">
        <div class="list-item" v-for="list in listData" :key="list.SkillID">
          <div class="item-left">
            <div style="width: 70%">
              {{ list.SkillName }}
              <!-- <el-progress :percentage="list.progress" :format="(percentage) => (percentage === 100 ? '已完成' : `${percentage}%`)"/> -->
            </div>
          </div>
          <div class="item-center">
            <div class="title">学习情况</div>
            <div class="flex-box">
              <div
                class="flex-item"
                v-for="item in list.Row"
                :key="item.Target_ID"
              >
                {{ item.TargetName }}
                <div class="num-box">{{ item.Count }}</div>
              </div>
            </div>
          </div>
          <div class="item-right">
            <el-button type="primary" size="large" @click="handleBtnClick"
              >进入学习</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script setup name="analysis">
import * as echarts from "echarts";
import { onMounted, ref } from "@vue/runtime-core";
import { skillApi } from "@/api/modules/learnAnalysis";

const params = ref({
  userID: JSON.parse(localStorage.getItem("userInfo")).UserID,
  productID: 1,
  skillID: "",
});
const listData = ref([]);

onMounted(() => {
  getTaskTotal();
  getSkillStat();
});


const getSkillStat = async () => {
  const res = await skillApi.getSkillStat(params.value);
  const json = res.data;

  let myChart1 = echarts.init(document.getElementById("chart1"));
  if (json.Status == 200) {
    listData.value = json.Data;
    const radarArray = [];
    const seriesArray = [];
    const Max = ref(null);
    const countList = [];
    listData.value.forEach((item) => {
      countList.push(item.Count);      
    })
    Max.value = Math.max(...countList)+3;
    listData.value.forEach((item) => {
      const obj = {};
      obj.name = item.SkillName;
      obj.max = Max.value;
      radarArray.push(obj)
      seriesArray.push(item.Count)
    });

    document.getElementById('chart1').removeAttribute('_echarts_instance_');
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
      document.getElementById('chart').removeAttribute('_echarts_instance_');
      myChart.setOption(option);
  }
  
};

const handleBtnClick = () => {
  const token = localStorage.getItem('userToken');
  window.open("http://wlxt.yunql.cn/list?token="+token);
};

const refresh = () => {
  window.location.reload();
};
</script>

<style lang="scss" scoped>
.mgb30 {
  margin-bottom: 30px;
}
.nav-box {
  height: 70px;
  background-color: #fff;
  .nav-title {
    float: left;
    font-size: 1.5em;
    color: gray;
    margin: 15px;
  }
  .refresh {
    float: right;
    margin: 15px;
    font-size: 1em;
  }
}

.main-box {
  background: #fff;
  padding: 20px;
  .chart-box {
    padding: 20px;
    .title {
      background: rgb(49, 125, 212);
      color: #fff;
      padding: 10px;
      line-height: 2em;
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

  .list-box {
    padding: 20px;
    .list-header {
      background: rgb(49, 125, 212);
      color: #fff;
      padding: 10px;
      line-height: 2em;
    }
    .list-main {
      .list-item {
        box-sizing: border-box;
        height: 120px;
        width: 100%;
        border: solid 5px #dfe0e7;
        margin: 10px 0;
        display: flex;
        .item-left {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #1079e5;
        }
        .item-center {
          width: 60%;
          background: #f5f7ff;
          .title {
            text-align: center;
            color: #524a4a;
            margin: 15px 0;
            font-weight: 600;
          }
          .flex-box {
            display: flex;
            justify-content: space-evenly;
            .flex-item {
              color: #727377;
              font-size: 0.9em;
              .num-box {
                width: 15px;
                height: 15px;
                display: inline-block;
                border: solid 1px;
                padding: 3px;
                text-align: center;
                border-radius: 20%;
                margin-left: 5px;
                background: #fff;
              }
            }
          }
        }
        .item-right {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>