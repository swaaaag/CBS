<template>
    <div v-loading="loading">
      
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" >
                    <div class="user-info">
                        <el-avatar
                            :size="150" :src="AvatarSrc"
                            fit="cover"
                        />
                        <div class="user-info-cont">
                            <div>{{ userInfo.UserName }}</div>
                            <div>{{ userInfo.SchoolName }}</div>
                            <div>{{ userInfo.Subject }}</div>
                            <div>{{ userInfo.Class }}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover" >
                    <div class="task-box">
                         <el-descriptions
                          title=""
                          direction="vertical"
                          border
                        >
                          <el-descriptions-item v-for="item in taskSummany" align="center" :key="item.index" :label="item.StatName">
                            <span class="task-row" v-for="row in item.StatRow" :key="row.index">
                              {{ row.TargetName }}
                              <span>{{ row.TargetCount }}</span>
                            </span>
                          </el-descriptions-item>                       
                        </el-descriptions>
                    </div>
                </el-card>
                <el-card shadow="hover" class="mgb20">
                  <div class="progress-box">
                    <el-descriptions
                          title=""
                          direction="vertical"
                          border
                        >
                          <el-descriptions-item v-for="item in progressArr" align="center" :key="item.index" :label="item.StatName">
                            <span class="progress-row" v-for="row in item.StatRow" :key="row.index">
                              {{ row.TargetName }}
                              <span>{{ row.TargetCount }}</span>
                            </span>
                            <el-progress v-if="item.StatName == '完成进度'" :percentage="progressPer.done"></el-progress>
                            <el-progress v-if="item.StatName == '延期进度'" :percentage="progressPer.late" color="#f56c6c"></el-progress>
                          </el-descriptions-item>                       
                        </el-descriptions>     
                  </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="mgb10">
          <el-col>
              <div class="message-box">
                <div class="mes-title mgb10">
                  <div class="mes-tip"><span>任务提醒</span></div>
                  <div class="nav-right">
                    <div class="right-status">状态:
                      <el-select v-model="statusValue" class="m-2" placeholder="请选择" size="large" @change="handleSelectChange">
                        <el-option
                          v-for="item in statusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                    <div class="right-more">更多<el-icon><ArrowRight /></el-icon></div>
                  </div>
                </div>
                <div class="mes-cont"  v-loading="mesLoading">
                  <el-table :data="tableData" border style="width: 100%" stripe :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}">
                    <el-table-column prop="SubmitTime" label="日期" width="250" />
                    <el-table-column prop="NewsType" label="提醒信息" width="250" />
                    <el-table-column prop="NewsName" label="备注信息" width="450" show-overflow-tooltip />
                    <el-table-column label="状态" width="180">
                      <template #default="{row}">
                          <el-icon :color="row.NewsStatus == '2'? '#e32828' : '#6ba935'"><BellFilled /></el-icon>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template #default = "{row}">
                            <el-button :type="row.NewsStatus == '2' ? 'primary' : 'info' " :disabled="row.NewsStatus != '2'"  @click="handleClick(row)">
                                {{row.NewsStatus == '2' ? '去处理' : '已处理'}}
                            </el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
          </el-col>
        </el-row>


        <el-row class="fl-center">
          <div>
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    v-model:current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40,50]"
                    v-model:page-size="pageSize"
                    layout="sizes, prev, pager, next"
                    :total="total">
                </el-pagination>
          </div>
        </el-row>

    </div>
</template>

<script setup name="dashboard">
import { reactive, ref } from '@vue/reactivity';
import { dashService } from '@/api/modules/dashboard'
import { taskApi } from '@/api/modules/myTask';
import router from '@/router';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
  const loading = ref(true);
  const mesLoading = ref(false);
  const store = useStore();
  const userInfo = computed(() => {
      return store.state.userInfo;
  });
  const AvatarSrc = `http://yh.softtone.cn/API/${userInfo.value.HeadImg}`;

  const tableData = ref([]);
  const taskSummany = ref([]);
  const progressArr = ref([]);
  const progressPer = ref({
    done:0,
    late:0
  })
  const getTaskSummany = async() => {
    const res = await taskApi.getTaskTotal();
    const json = res.data;
    if(json.Status == 200){
      let data = json.Data;
      taskSummany.value = data.filter(item => item.StatType == '1');
      progressArr.value = data.filter(item => item.StatType != '1');
    }
    progressPer.value.done = (progressArr.value[1].StatRow[1].TargetCount/progressArr.value[1].StatRow[0].TargetCount).toFixed(2)*100;
    progressPer.value.late = (progressArr.value[0].StatRow[1].TargetCount/progressArr.value[0].StatRow[0].TargetCount).toFixed(2)*100;
    console.log(progressArr.value)
  }
  getTaskSummany();

  const inputValue = ref('');
  const statusValue = ref('All');
  const statusOptions = ref([
    {
        label:"全部",
        value:"All"
    },
    {
        label:"已读",
        value:"Read"
    },
    {
        label:"未读",
        value:"Unread"
    },
    {
        label:"已处理",
        value:"Processed"
    }
  ]);
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(null)
  const getMesList = () => {
    mesLoading.value = true;
    taskApi.getNewsList(inputValue.value, statusValue.value, currentPage.value, pageSize.value).then(res => {
        let json = res.data
        if(json.Status == 200) {
            tableData.value = json.Data.Rows
            total.value = json.Data.Total
            mesLoading.value = false;
            loading.value = false;
        }
    })
    .catch(err => {
        console.log(err)
    })
}
getMesList();

const handleSelectChange = () => {
    getMesList();
}
const handleSizeChange = (val) => {
    pageSize.value = val;
    getMesList();
}
const handleCurrentChange = (val) => {
    currentPage.value = val;
    getMesList();
}

const newsStu = ref('Read');
const handleClick = (row) => {
  handleNewsStu(row.ID,newsStu.value);
  router.push({ name: 'reportSubmit', params: { id: row.TaskID,type: row.TaskType } })
}

const handleNewsStu = (id,stu) => {
  taskApi.handleNewsStu(id,stu)
  .then(res => {})
  .catch(err => {alert(err)})
}
</script>

<style lang="scss" scoped>
.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
    height: 260px;
    .user-avatar {
        width: 40%;
        height: 40%;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 30px;
        flex: 1;
        font-size: 14px;
        color: #999;
        div {
          font-size: 20px;
          color: #4a3b3b;
          padding: 3px;
          font-family: cursive;
          margin-top: 20px;
        }
    }
}

.message-box{
  
  .mes-title{
    height: 60px;
    border-radius: 5px;
    color: #fff;
    background-color: #538cbb;
    .mes-tip{
      float: left;
      font-size: 18px;
      padding: 20px;
    }
    .nav-right{
      display: flex;
      margin-left: 40%;
      padding: 10px;
      justify-content: flex-end; 
      .right-date{ }
      .right-status{ 
        margin-right: 20%
      }
      .right-more{ 
        margin-right: 1em;
        padding: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  .mes-cont{}
}

.task-box{
  .task-row{
    margin: 0 1em;
    span{
      color: #669cc9;
      font-weight: 600;
      font-size: 1.1em;
    }
  }
  .task-title{
    height: 50px;
    border-radius: 5px;
    color: #fff;
    background-color: #59ad47;
    .task-tip{
      float: left;
      font-size: 18px;
      padding: 10px;
    }
    .arrow-up{
      float: right;
      margin: 15px 50px 0 0;
      cursor: pointer;
    }
  }
  .task-cont{
    
  }
}
.progress-box{
  .progress-row{
    margin: 0 1em;
    span{
      color: #669cc9;
      font-weight: 600;
      font-size: 1.1em;
    }
  }
 
}

.fl-center{
 float: right;
 margin: 1em;
}
.mgb20 {
    margin-bottom: 20px;
}


</style>