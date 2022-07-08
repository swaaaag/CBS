import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    //baseURL: 'http://yqlapi.wlxt.cn/api',
    timeout: 10000
});
const realtoken = localStorage.getItem('yq_student_token');
const testToken = '0aaf66ea-f4d4-42b7-9f95-f29478e81aa6';
//0aaf66ea-f4d4-42b7-9f95-f29478e81aa6
const token = process.env.NODE_ENV === 'production' ? realtoken : testToken;
service.interceptors.request.use(
    request => {

        request.headers['Authorization'] = token
        return request
    }
);

service.interceptors.response.use(
    // response => {
    //     if (response.status === 200) {
    //         return response.data;
    //     } else {
    //         Promise.reject();
    //     }
    // },
    // error => {
    //     console.log(error);
    //     return Promise.reject();
    // }
);



export default service;
