<template>
  
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  setup(){
    ElMessage('该功能正在开发中...')
    setTimeout(() => {
      window.history.back()
    }, 3000);
    
  }
}
</script>

<style>

</style>
<!-- <template>
    <el-header class="nav-box">
      <div class="nav-title">我的任务-实训成果</div>
      <el-button class="refresh" type="info" plain>刷新</el-button>
    </el-header>
      
    
    <el-main>
        <el-card>
            <template #header>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <span class="txt-type">类型：</span>
                         <el-select v-model="typeValue.value" class="m-2" placeholder="请选择" size="large">
                            <el-option
                            v-for="item in typeList.value"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                         <el-input v-model="searchValue.value" placeholder="请输入查询关键词" />
                    </el-col>
                    <el-col :span="8">
                        <el-date-picker
                            v-model="dateValue.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        />
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary">查询</el-button>
                    </el-col>
                </el-row>
            </template>
            
            <el-table :data="tableData" stripe style="width: 100%" :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}">
                <el-table-column prop="type" label="类型" width="280" />
                <el-table-column prop="name" label="名称" width="280" />
                <el-table-column prop="date" label="截止时间" width="200" />
                <el-table-column label="状态" width="180">
                    <template #default="{row}">
                        <el-tag size="large" :type="row.status == '1'? 'success' : 'danger'" style="cursor:pointer">
                          <span v-if="row.status == '1'">已</span>
                          <span v-else>未</span>提交
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #default="{row}"> 
                        <el-button v-if="row.status == '1'" type="warning">修改</el-button>
                        <el-button v-else  type="success">提交</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
      
  </el-main>

</template>

<script setup name="trainRes">
import { ref } from 'vue';

const typeValue = ref('');
const typeList = ref([]);
const searchValue = ref('');
const dateValue = ref('');
const tableData = ref([
    {
        type:'实训成果',
        name:'教学设计',
        date:'2021年11月05日',
        status: 0
    },
    {
        type:'实训成果',
        name:'教学设计',
        date:'2021年11月05日',
        status: 1
    },
    {
        type:'实训成果',
        name:'教学设计',
        date:'2021年11月05日',
        status: 1
    },
    {
        type:'实训成果',
        name:'教学设计',
        date:'2021年11月05日',
        status: 0
    },
    {
        type:'实训成果',
        name:'教学设计',
        date:'2021年11月05日',
        status: 1
    },
]);


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

.txt-type{ 
    color: #147195;
    margin-right: 20px;
}
</style> -->