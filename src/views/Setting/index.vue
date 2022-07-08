<template>

  <el-header class="nav-box mgb20">
    <div class="nav-title">个人设置-基本信息</div>
    <el-button class="refresh" type="info" plain @click="refresh"
      >刷新</el-button
    >
  </el-header>

  <el-main class="main-box">
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="cont-box">
          <div class="img-box">
              <el-upload
                action="string"
                accept=".jpg,.png"
                :before-upload="beforeAvatarUpload"
                :http-request="UploadAvatar"
                :show-file-list="false"
            >
                <el-avatar
                     :size="200" :src="AvatarSrc"
                    fit="cover"
                />
            </el-upload>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="form-box">
          <el-form :model="form" label-position="left">
           <el-form-item label="昵称">
                <el-input v-model="form.NickName" placeholder="请输入昵称" clearable />
            </el-form-item>
            <el-form-item label="生日">
                  <el-date-picker
                    v-model="form.Birthday"
                    type="date"
                    placeholder="选择生日"
                    clearable
                    value-format="YYYY-MM-DD"
                  />          
            </el-form-item>
            <el-form-item label="学校">
                <el-input v-model="form.SchoolName" disabled></el-input>         
            </el-form-item>
            <el-form-item label="专业">
                <el-input v-model="form.Subject" disabled></el-input>           
            </el-form-item>
            <el-form-item label="班级">
                <el-input v-model="form.Class" disabled></el-input>           
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.Sex">
                    <el-radio
                        v-for="(item, index) in SexOptions" :key="index" :label="item.value"
                        :disabled="item.disabled" style="{display: inline}"
                    >
                        {{ item.label }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="学历">
                <el-select v-model="form.Edu" placeholder="请选择学历">
                  <el-option
                    v-for="item in eduList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>         
            </el-form-item>
            <el-form-item label="省市">
                <el-cascader
                    v-model="area"
                    size="large"
                    :options="cityOptions"
                    class="input-width"
                    placeholder="选择省市"
                    clearable
                />
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.Address" placeholder="请输入地址" clearable />
            </el-form-item>
            <el-form-item label="个性签名" >
                <el-input v-model="form.Sign" type="text" clearable placeholder="个性签名" />
            </el-form-item>
            <el-form-item label="入学年份">
                <el-date-picker
                  v-model="form.Year"
                  type="year"
                  placeholder="选择年份"
                  format="YYYY"
                  value-format="YYYY"
                />          
            </el-form-item>
              
            <el-form-item>
              <el-button class="submit-btn" type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>

        </div>
      </el-col>
    </el-row>
  </el-main>

</template>

<script setup name="setting">
import { settingApi } from '@/api/modules/setting';
import { reactive,ref } from 'vue';
import { formatDate } from '@/utils/index.js'
import { ElMessageBox,ElMessage } from 'element-plus'
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'
import { useStore } from 'vuex';
// do not use same name with ref
const store = new useStore();
const form = ref({
    City: "",
    Province: "",
    Edu: "",
    Year: 0,
    Sex: "",
    NickName: "",
    Address: "",
    Birthday: "",
    Sign: "",
    SubjectIDs: [
      0
    ]
})
const area = ref('')
const AvatarSrc = ref('');
const eduList = ref([
  {
    label:'专科',
    value:'专科'
  },
  {
    label:'本科',
    value:'本科'
  },
  {
    label:'硕士',
    value:'硕士'
  },
])
const cityOptions = provinceAndCityData;
const SexOptions = reactive([
    {
        'label': '保密',
        'value': '保密'
    }, {
        'label': '男',
        'value': '男'
    }, {
        'label': '女',
        'value': '女'
    }])
const getuserInfo = async() => {
  const res = await settingApi.getUserInfo();
  const json = res.data;
  if(json.Status == 200){
    let userInfo = json.Data;
    form.value.City = userInfo.City;
    form.value.Province = userInfo.Province;
    form.value.Edu = userInfo.Edu;
    form.value.Year = userInfo.Year;
    form.value.Sex = userInfo.Sex;
    form.value.NickName = userInfo.NickName;
    form.value.Address = userInfo.Address;
    form.value.Birthday = userInfo.Birthday;
    form.value.Sign = userInfo.Sign;
    form.value.Year = userInfo.Year.toString();
    if (form.value.Province) {
        area.value = [TextToCode[form.value.Province].code, TextToCode[form.value.Province][form.value.City].code]
    }
    AvatarSrc.value = `http://yh.softtone.cn/API/${userInfo.HeadImg}`
    store.commit('setUserInfo',userInfo);
  }
}
getuserInfo();

const onSubmit = () => {
  ElMessageBox.confirm(
    '您确定要保存吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    if (area.value) {
      form.value.Province = CodeToText[area.value[0]]
      form.value.City = CodeToText[area.value[1]]
    } else {
        form.value.Province = ''
        form.value.City = ''
    }
    area.value = "";
    settingApi.editInfo(form.value)
      .then((res)=>{
        let json = res.data;
        if(json.Status == 200){
          ElMessage.success(json.Data);
          getuserInfo();
        }else{
          ElMessage.error(json.Data)
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  })
  .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
  })
}

const beforeAvatarUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
    }
    const isLt2M = file.size / 1024 / 1024 < 5
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 5MB!')
    }
    return isJpgOrPng && isLt2M
}

const UploadAvatar = param => {
    const formData = new FormData()
    formData.append('filedata', param.file)
    AvatarSrc.value = URL.createObjectURL(param.file)
    settingApi.uploadImg(formData).then(res => {
      if(res.data.Status == 200){
        ElMessage.success(res.data.Data);
      }else{
        ElMessage.error(res.data.Data);
      }
      
    })
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

.main-box{
  width: 90%;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  .cont-box{
    padding-top: 100px;
    .img-box{
      text-align: center;
    }
     .img-btn{
        width: 220px;
        margin-top: 20px;
        background: rgb(25 133 151);
      }
  }

  .form-box{
    .submit-btn{
      width:240px;
      background: rgb(25 133 151)
    }
  }

}

</style>