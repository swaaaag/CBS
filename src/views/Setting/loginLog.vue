<template>

    <el-header class="nav-box mgb20">
        <div class="nav-title">个人设置-登录日志</div>
        <el-button class="refresh" type="info" plain @click="refresh"
        >刷新</el-button
        >
    </el-header>

    <el-main class="container-box">
        <el-table :data="tableData" style="width: 100%" stripe :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}">
            <el-table-column prop="LoginTime" label="时间" width="250" />
            <el-table-column prop="LoginIP" label="IP" width="250" show-overflow-tooltip />
            <el-table-column prop="LoginAddr" label="地区" width="250" show-overflow-tooltip />
            <el-table-column prop="LoginType" label="登录方式" />      
        </el-table>
        <div class="pagination">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="pageSizes"
                layout="->,total, sizes, prev, pager, next, jumper"
                :total="logCount"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </el-main>

</template>

<script setup name="loginLog">
import { settingApi } from '@/api/modules/setting'
import { ref } from 'vue';

const tableData = ref([]);
const logCount = ref(null);
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizes = ref([10, 20, 50, 100, 150, 300]);
const getLogList = async() => {
    const res = await settingApi.getLogList(currentPage.value,pageSize.value);
    const json = res.data;
    if(json.Status == 200){
        tableData.value = json.Data;
        getLogCount();
    }
}
getLogList();
const getLogCount = async() => {
    const res = await settingApi.getLogCount();
    const json = res.data;
    if(json.Status == 200){
        logCount.value = json.Data;
    }
}

const handleCurrentChange = (val) => {
    currentPage.value = val;
    getLogList();
}
const handleSizeChange = (val) => {
    pageSize.value = val;
    getLogList();
}
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

.container-box{
    background: #fff;
    width: 90%;
    margin: 0 auto;
    .pagination{
        margin-top: 30px;
    }
}

</style>