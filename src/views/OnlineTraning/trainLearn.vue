
<!-- <template>
  <el-header class="nav-box">
      <div class="nav-title">在线实训-自主提升学习</div>
      <el-button class="refresh" @click="refresh" type="info" plain>刷新</el-button>
  </el-header>

  <el-main class="chart-container">
    <div class="tab-box">
        <div class="left-title">自主提升学习</div>
        <div class="right-more">更多<el-icon><ArrowRight /></el-icon></div>
    </div>

    <div class="cont-box">       
          <div class="chart-gauge" id="guage"></div>
          <div class="chart-bar" id="chart"></div>
    </div>
    <div class="btn-box">
          <el-button class="btn" type="primary" size="large" round @click="goWlxt">进入自主学习</el-button>
    </div>
  </el-main>

</template>

<script setup name="trainTask">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import {  useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
      let myChart = echarts.init(document.getElementById("chart"));
      // 绘制图表
      myChart.setOption({
        title: {
            text: ''
        },
        legend: {
            data: ['小明', '小红'],
            right: 10,
            orient:'vertical',

        },
        radar: {
            // shape: 'circle',
            indicator: [
            { name: '学习能力', max: 100},
            { name: '沟通能力', max: 100 },
            { name: '组织能力', max: 100 },
            { name: '教研能力', max: 100 },
            { name: '教学能力', max: 100 },
            ]
        },
        series: [
            {
            name: '',
            type: 'radar',
            areaStyle: {},
            data: [
                {
                value: [42, 30, 20, 35, 50, 18],
                name: '小明'
                },
                {
                value: [50, 94, 28, 26, 42, 21],
                name: '小红'
                }
            ]
            }
        ]
      });

      let myChart2 = echarts.init(document.getElementById("guage"));
      // 绘制图表
      myChart2.setOption({
         tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: 60,
                name: '综合提升'
              }
            ]
          }
        ]
      })

      window.onresize = function () {//自适应大小
        myChart.resize();
      };
});

const goWlxt = () => {
    //location.href = 'http://wlxt.jqweike.cn/list';
    router.push({
      name: 'gowlxt',
      params: {
        userID: '001',
        token: '123456'
      }
    })
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

.tab-box{
    height: 50px;
    background-color: #538cbb;
    color: #fff;
    .left-title{
        float: left;
        font-size: 1.3em;
        padding: 0.5em;
    }
    .right-more{
        float: right;
        padding: 1em;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
}

.chart-container{
    //height: calc(100vh - 100px);
    background-color: #fff;
  .cont-box{
      height: 400px;
      display: flex;
      .chart-bar{
          padding: 2em;
          width: 50%;
          height: 80%;       
      }
      .chart-gauge{
          padding: 2em;
          width: 40%;
          height: 80%;
      }
  }
  .btn-box{
      display: flex;
      justify-content: center;
    .btn{
       // margin: 0.5em;
       width: 15em;
    }
  }
}

</style> -->