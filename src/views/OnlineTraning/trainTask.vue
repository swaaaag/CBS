
<!-- <template>
  <el-header class="nav-box">
      <div class="nav-title">在线实训-在线实习任务</div>
      <el-button class="refresh" @click="refresh" type="info" plain>刷新</el-button>
  </el-header>

  <el-main class="chart-container">
    <div class="tab-box">
        <div class="left-title">在线实训任务</div>
        <div class="right-more">更多<el-icon><ArrowRight /></el-icon></div>
    </div>

    <div class="cont-box">
          <div class="chart-bar" id="chart"></div>
          <div class="chart-gauge" id="guage"></div>
    </div>
    <div class="btn-box">
          <el-button class="btn" type="primary" size="large" round>进入实训任务</el-button>
    </div>
  </el-main>

</template>

<script setup name="trainTask">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

onMounted(() => {
      let myChart = echarts.init(document.getElementById("chart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "实训学习进度表(数量/个)" },
        tooltip: {},
        dataset: {
          source: [
            ['amount', 'type'],
            [10, '教学文案'],
            [15, '教学微课'],
            [20, '教学案例'],
            [12, '理化生实验'],
            [20, '仿真教具'],
            [30, '教学素材'],
            [18, '专业发展'],
          ]
      },
      xAxis: {},                      // 定义x轴 （数值轴）
      yAxis: { type: 'category'},   //类目轴（category） 默认情况下，类目轴对应到 dataset 第一列。
      series: [
        {
          type: 'bar',
          encode: {
            // 将 "amount" 列映射到 X 轴。
            x: 'amount',
            // 将 "type" 列映射到 Y 轴。
            y: 'type'
          }
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
                name: '任务完成度'
              }
            ]
          }
        ]
      })

      window.onresize = function () {//自适应大小
        myChart.resize();
      };
});



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
          width: 60%;
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
        width: 15em;
    }
  }
}

</style> -->