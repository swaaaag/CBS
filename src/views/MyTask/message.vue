<template>
  
    <el-header class="nav-box mgb20">
      <div class="nav-title">我的任务-消息提醒</div>
      <el-button class="refresh" type="info" plain @click="refresh">刷新</el-button>
    </el-header> 

    <el-main style="background:#fff">
        <div class="main-header mgb30">
            <div class="header-box">
                <div class="main-header-title">消息筛选</div>
                <div class="main-header-right">
                    进入消息中心  <el-icon><ArrowRightBold /></el-icon>
                </div>
            </div>
            <div class="main-content">
                <div class="search-box">
                    输入查询：<el-input v-model="inputValue" placeholder="输入关键词" style="width:70%" />
                </div>
                <div class="select-box">
                    消息状态：
                    <el-select v-model="selectValue" placeholder="请选择" @change="handleSelectChange"> 
                        <el-option v-for="item in selectList" :key="item.index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div class="date-box">
                    <el-date-picker
                        v-model="dateValue"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="height:70%"
                    />
                </div> -->
                <div class="btn-box">
                    <el-button type="primary" :icon="Search" plain @click="handleSearchClick">查询</el-button>
                    <el-button type="info" :icon="RefreshLeft" plain @click="handleReset">重置</el-button>
                </div>
            </div>
        </div>

        <div class="main-container mgb20" v-loading="loading">
            <div class="table-box">
                <el-table
                    :data="tableData"
                    stripe
                    border
                    :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}"
                    style="width: 100%">
                    <!-- <el-table-column width="50">
                        <template #default="{row}">
                            <el-checkbox v-model="row.isChecked"></el-checkbox>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="SubmitTime"
                        label="日期"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="NewsType"
                        label="来源"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="NewsName"
                        label="内容"
                        width="500">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default = "{row}">
                            <el-button :type="row.NewsStatus == '2' ? 'primary' : 'info' " :disabled="row.NewsStatus != '2'" @click="handleClick(row)">
                                {{row.NewsStatus == '2' ? '去处理' : '已处理'}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </el-main>

    <el-footer>
        <div class="footer-box">
            <!-- <div class="footer-left">
                <el-checkbox v-model="checkAll" border @change="handleCheckAllChange">全选</el-checkbox>
                <el-select v-model="selectValue2" placeholder="标记已读" class="select">
                        <el-option label="标记已读" value="read"></el-option>
                        <el-option label="选择删除" value="del"></el-option>
                    </el-select>
            </div> -->
            <div class="footer-right">
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
            
        </div>
    </el-footer>

</template>

<script setup name="message">
import { ref } from 'vue';
import { Search, RefreshLeft} from '@element-plus/icons-vue'
import router from '@/router';
import { taskApi } from '@/api/modules/myTask';

//const dateValue = ref('');
const loading = ref(true);
const inputValue = ref('');
const selectValue = ref('All');
const selectList = ref([
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
])
const tableData = ref([]);
const handleClick = (row) => {
    router.push({ name: 'reportSubmit', params: { id: row.TaskID,type: row.TaskType } })
}
const handleSizeChange = (val) => {
    pageSize.value = val;
    handleSearchClick();
}
const handleCurrentChange = (val) => {
    currentPage.value = val;
    handleSearchClick();
}
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(null)
//const selectValue2 = ref('read')
// const checkAll = ref(false)
// const handleCheckAllChange = () => {
//     tableData.value.forEach((item) => {
//         item.isChecked = !item.isChecked
//     })
// }
const handleSelectChange = () => {
    handleSearchClick();
}
const handleSearchClick = () => {
    loading.value = true;
    taskApi.getNewsList(inputValue.value, selectValue.value, currentPage.value, pageSize.value).then(res => {
        let json = res.data
        if(json.Status == 200) {
            tableData.value = json.Data.Rows
            total.value = json.Data.Total
            loading.value = false;
        }
    })
    .catch(err => {
        console.log(err)
    })
}
handleSearchClick();

const handleReset = () => {
    inputValue.value = "";
    selectValue.value = "All";
    handleSearchClick();
}

const refresh = () => {
    window.location.reload();
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

.main-header{ 
    background-color: #fff;
    .header-box{ 
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border: 1px solid #e9e0e0;
        color: rgb(75, 72, 72);
        .main-header-title{   
            font-size: 1em;
            font-weight: 700;
        }
        .main-header-right{ 
            cursor: pointer;
        }
    }
    .main-content{
        height: 50px;
        display: flex;
        padding: 20px;
        justify-content: space-around;
        border: 1px solid #e9e0e0;
        color: rgb(75, 72, 72);
        .search-box{}
        .select-box{}
        .date-box{}
        .btn-box{}
    }
}

.main-container{

}
.footer-box{
    .footer-left{
        float: left;
        margin: 15px;
        .select{
            margin-left: 50px;
        }
    }
    .footer-right{
        float: right;
        margin: 15px;
    }
}
</style>