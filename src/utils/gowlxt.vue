<template>
  
</template>

<script setup name="gowlxt">
import { useRoute, useRouter } from 'vue-router';
const router = useRouter(),route = useRoute();
const userInfo = route.params
console.log(userInfo)
const wlUrl = 'http://wlxt.jqweike.cn/valid?'
//跳转到未来学堂
//window.location.href = wlUrl + 'userID='+userInfo.userID+'&access_token='+userInfo.token;
window.open(wlUrl + 'user_id='+userInfo.userID+'&access_token='+userInfo.token)
router.go(-1)
</script>

<style>

</style>