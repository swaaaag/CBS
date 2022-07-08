<template>
    <el-header class="nav-box mgb20">
      <div class="nav-title">个人设置-安全设置</div>
      <el-button class="refresh" type="info" plain @click="refresh"
      >刷新</el-button
      >
    </el-header>

  <el-main class="container-box">
    <div class="first-box">
        <el-icon class="icon" size="50px"><Lock /></el-icon>
        <div class="right-box">
            <h3 class="title">登录密码</h3>
            <div class="title-tips">建议您定期更换密码，设置安全性高的密码可以使帐号更安全</div>
            <div class="btn-box"><el-button class="btn" type="primary" plain @click="handleModifyClick">修改</el-button></div>
        </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="修改密码"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item label="请输入旧密码" label-width="140px" prop="oldPwd">
          <el-input v-model="form.oldPwd" autocomplete="off" show-password/>
        </el-form-item>
        <!-- 必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 6-15 之间 -->
        <el-form-item label="请输入新密码" label-width="140px" prop="newPwd">
          <el-input v-model="form.newPwd" autocomplete="off" show-password/>
        </el-form-item>
        <span style="margin-left:3em;color:red">（新密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 6-15 之间）</span>
    </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSaveClick"
            >保存</el-button
          >
        </span>
      </template>
  </el-dialog>
    <!-- <div class="second-box">
        <el-icon class="icon" size="50px"><Iphone /></el-icon>
        <div class="right-box">
            <h3 class="title">安全手机 180******49</h3>
            <div class="title-tips">安全手机可以用于登录帐号，重置密码或其他安全验证</div>
            <div class="btn-box"><el-button class="btn" type="primary" plain>更换</el-button></div>
        </div>
    </div>
    <div class="third-box">
        <el-icon class="icon" size="50px"><Message /></el-icon>
        <div class="right-box">
            <h3 class="title">当前还未绑定邮箱地址</h3>
            <div class="title-tips">绑定邮箱可以用于登录帐号，重置密码或其他安全验证</div>
            <div class="btn-box"><el-button class="btn" type="primary" plain>绑定</el-button></div>
        </div>
    </div> -->
  </el-main>
</template>

<script setup name="safeSetting">
import { settingApi } from '@/api/modules/setting';
import { ref,getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
const instance = getCurrentInstance()

const dialogVisible = ref(false);
const form = ref({
  oldPwd:'',
  newPwd:''
})


const checkPwd = (rule, value, cb) => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,15}$/
  if (reg.test(value)) {
    return cb()
  }else{
    cb(new Error('必须包含大小写字母和数字的组合，不能使用特殊字符'))
  }
}
const rules = ref({
  oldPwd: [{  required: true, trigger: 'blur', message: '请输入旧密码'} ],
  newPwd: [{ required: true, trigger: 'blur', message: '请输入新密码'},
          { min: 6, max: 15, message: '密码长度必须在6至15之间', trigger: 'blur' }, 
          { validator: checkPwd, trigger: 'blur' }]
});

const handleModifyClick = () => {
  dialogVisible.value = true;
}

const handleSaveClick = () => {
    instance.proxy.$refs.ruleFormRef.validate((valid)=>{
      if (valid){
        console.log('submit!')
        settingApi.updatePwd(form.value.oldPwd,form.value.newPwd).then(res=>{
          const json = res.data;
          if(json.Status == 200){
            ElMessage.success(json.Data);
            handleClose();
          }else{
            ElMessage.error(json.Data);
          }
        })
      }else{
        console.log('error submit!')
      }
    })
  
  
}
const handleClose = () => {
  form.value.oldPwd = '';
  form.value.newPwd = '';
  dialogVisible.value = false;
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

.container-box{
    background: #fff;
    width: 90%;
    margin: 0 auto;
    .first-box{
        margin: 50px auto;
        width: 80%;
        height: 130px;
        border-bottom: solid 1px #cacadb;
        .icon{
          float: left;
        }
        .right-box{
          margin-left: 3em;
           .title{
              padding-left: 3em;
              padding-bottom: 0.5em;
          }
          .title-tips{
              padding-left: 3em;
              padding-bottom: 0.5em;
          }
          .btn-box{
              padding-left: 3em;
              .btn{
                width: 150px;
              }
          }
        }
       
    }
    .second-box{
        width: 80%;
        margin: 20px auto;
        height: 130px;
        border-bottom: solid 1px #cacadb;
        .icon{
          float: left;
        }
         .right-box{
          margin-left: 3em;
           .title{
              padding-left: 3em;
              padding-bottom: 0.5em;
          }
          .title-tips{
              padding-left: 3em;
              padding-bottom: 0.5em;
          }
          .btn-box{
              padding-left: 3em;
              .btn{
                width: 150px;
              }
          }
        }
    }
    .third-box{
        width: 80%;
        height: 130px;
        margin: 0 auto;
        .icon{
          float: left;
        }
         .right-box{
          margin-left: 3em;
           .title{
              padding-left: 3em;
              padding-bottom: 0.5em;
          }
          .title-tips{
              padding-left: 3em;
              padding-bottom: 0.5em;
          }
          .btn-box{
              padding-left: 3em;
              .btn{
                width: 150px;
              }
          }
        }
    }
    .el-input {
      width: 300px;
    }
}
</style>