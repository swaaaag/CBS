import request from '../index';

const envor = process.env.NODE_ENV === 'production'
const realtoken = localStorage.getItem('yq_student_token');
const testToken = '0aaf66ea-f4d4-42b7-9f95-f29478e81aa6';
const token = process.env.NODE_ENV === 'production' ? realtoken : testToken;

if(!envor){
    var yqUrl = '/yq';
    var yhUrl = '/yh';
}else{
    var yqUrl = 'http://api.yunql.cn';
    var yhUrl = 'http://yh.softtone.cn/API';
}

export const settingApi = {
   
    getUserInfo() {
        return request({
            url: yhUrl + '/api/User/GetUserInfo',
            method: 'get',
            params: {
                token: token
            }
        });
    },

    editInfo(info) {
        return request({
            url: yhUrl + '/api/User/Edit_yq',
            method: 'post',
            data: info     
        });
    },

    uploadImg(imgData) {
        return request({
            url: yhUrl + '/api/User/upload_HeadImg',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: imgData,
        });
    },

    updatePwd(oldP,newP) {
        return request({
            url: yhUrl + '/api/User/UpdatePwd_Old',
            method: 'get',
            params:{
                NewP:newP,
                OldP:oldP
            }    
        });
    },
    getLogList(pageInt,pageSize) {
        return request({
            url: yhUrl + '/api/loginlog/get_list',
            method: 'get',
            params:{
                PageInt:pageInt,
                PageSize:pageSize
            }    
        });
    },
    getLogCount() {
        return request({
            url: yhUrl + '/api/loginlog/get_count',
            method: 'get'
        });
    },
    

}