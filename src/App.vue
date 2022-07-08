<template>
  <router-view/>
</template>

<script setup>
import { userApi } from '@/api/modules/userApi';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'
        const store = useStore();

        const env = process.env.NODE_ENV;
        if(env == 'development'){
            const getTrainInfo = () => {
                userApi.getTrainInfo()
                .then((res)=> {
                    let json = res.data;               
                    //console.log(json)
                    if (json.Status === 200) {
                        if(!json.Data.HasTrain){
                            ElMessage.error('未参加任何实训！')
                            setTimeout(() => {
                                localStorage.clear();
                                location.href = 'http://www.yunql.cn/';
                            }, 1000);
                        }
                        else{
                            localStorage.setItem('trainInfo', JSON.stringify(json.Data));
                        }
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            getTrainInfo();
        }else{
            const trainInfo = JSON.parse(localStorage.getItem('trainInfo'));
            if(!trainInfo.HasTrain){
                ElMessage.error('未参加任何实训！')
                    setTimeout(() => {
                        localStorage.clear();
                        location.href = 'http://www.yunql.cn/';
                    }, 1000);
            }
        }
        

        const getUserInfo = () => {
            userApi.getUserInfo()       
            .then((res)=> {
                let json = res.data;
                if (json.Status === 200) {
                    localStorage.setItem('userInfo', JSON.stringify(json.Data));
                    store.commit('setUserInfo',json.Data);
                    localStorage.setItem('userToken', json.Data.UserToken);
                    localStorage.setItem('roleInfo', JSON.stringify(json.Data.Role));
                    if(json.Data.RealName){
                        store.commit('setUserName', json.Data.RealName);     
                    }else{
                        store.commit('setUserName', json.Data.NickName);     
                    }                   
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        getUserInfo();

        
</script>

<style lang="scss">
@import url(./assets/css/main.scss);
</style>
