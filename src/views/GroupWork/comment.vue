<template>
    <el-main class="main">
        <el-card class="box-card" shadow="never">
            <template #header>
                <div class="title">
                    <h3>评语配置</h3>
                </div>
            </template>
             <div class="sel-box">
                <span>评语类型:</span>
                <el-select disabled placeholder="默认">
                    <el-option label="默认" value="default"></el-option>
                </el-select>
            </div>
            <div class="btn-box">
                <el-button type="primary"  plain @click="isVisible = true" :icon="Plus">新增评语</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" stripe border :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}">
                <el-table-column prop="ID" label="ID" width="100" />
                <el-table-column prop="Content" label="评语内容" width="500" show-overflow-tooltip />
                <el-table-column prop="TimeCreate" label="评语时间" width="300" show-overflow-tooltip />
                <el-table-column label="操作">
                    <template #default="{row}">
                        <el-button :text="true" type="primary" @click="handleEdit(row.Content,row.ID)">修改评语</el-button>
                        <el-button :text="true" type="danger" @click="handleDelete(row.ID)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
         <el-dialog
            :model-value="isVisible"
            :title="editId === ''?'新增评语':'修改评语'"
            @close="resetData"
        >
            <el-form ref="form" :model="formData" :rules="rules">
                <el-form-item label="评语内容" prop="Content">
                    <el-input v-model="formData.Content" :rows="5" type="textarea" placeholder="请输入评语内容" />
                </el-form-item>
                <el-form-item label="评语类型" prop="Type">
                    <el-select disabled placeholder="默认">
                        <el-option label="默认" value="default"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="success" @click="handleSubmit">保存</el-button>
            </template>
        </el-dialog>
    </el-main>
</template>

<script setup>

import { groupApi } from '@/api/modules/groupWork';
import { elConfirm, successMsg } from '@/utils/message.js'
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';

const isVisible = ref(false)
const formData = ref({
    Content: ''
})
const rules = ref({
    Content: [
        { required: true, message: '请输入评语内容', trigger: 'blur' }
    ]
})

const tableData = ref([])
const form = ref(null)
let editId = ref('')

const getCommentData = async() => {
    const res = await groupApi.getComment();
    const json = res.data;
    if(json.Status == 200){
        tableData.value = json.Data;
    }else{
        console.log(json)
    }
}
getCommentData();

const handleSubmit = () => {
    form.value.validate(valid => {
        if (valid) {
            if (editId.value === '') {
                groupApi.addComment(formData.value.Content).then(() => {
                    successMsg('新增成功')
                    resetData()
                })
            } else {
                groupApi.updateComment(formData.value.Content,editId.value).then(() => {
                    successMsg('修改成功')
                    resetData()
                })
            }
        }
    })
}
const handleDelete = id => {
    elConfirm({
        title: '提示',
        msg: '确定删除该评语吗？',
        ok: () => {
            groupApi.deleteComment(id).then(() => {
                successMsg('删除成功')
                getCommentData()
            })
        }
    })
}
const handleEdit = (content, id) => {
    editId.value = id
    formData.value.Content = content
    isVisible.value = true
}
const resetData = () => {
    editId.value = ''
    isVisible.value = false
    formData.value.Content = ''
    getCommentData()
}

</script>

<style lang="scss" scoped>
.main{
    /* background: #fff; */
    .box-card{
        .sel-box{
            span{
                margin: 1em;
            }
        }
        .btn-box{
            margin: 1em;
            .el-button{
                width: 8em;
            }
        }
    }
}
</style>
