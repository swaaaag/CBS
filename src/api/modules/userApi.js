import request from '../index';

console.log(process.env.NODE_ENV)
const envor = process.env.NODE_ENV === 'production'
const realtoken = localStorage.getItem('yq_student_token');
const testToken = '0aaf66ea-f4d4-42b7-9f95-f29478e81aa6';
const token = process.env.NODE_ENV === 'production' ? realtoken : testToken;

if(!envor){
    var yqUrl = '/yq';
    var yhUrl = '/yh';
}else{
    var yhUrl = 'http://yh.softtone.cn/API';
    var yqUrl = 'http://api.yunql.cn';
}
export const userApi = {
    getUserInfo() {
        return request({
            url: yhUrl + '/api/User/GetUserInfo',
            method: 'get',
            params: {
                token: token
            }
        });
    },
    getTrainInfo() {
        return request({
            url: yqUrl + '/api/student/get/train_info',
            method: 'get'
        });
    },
}