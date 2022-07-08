import request from '../index';

console.log(process.env.NODE_ENV)
const envor = process.env.NODE_ENV === 'production'

if(!envor){
    var yqUrl = '/yq';
}else{
    var yqUrl = 'http://api.yunql.cn';
}

export const taskApi = {
   
    getNewsList(keyword,status,pageIndex,pageSize) {
        return request({
            url: yqUrl + '/api/news_stu/get_list',            
            method: 'get',
            params: {
                keyword: keyword,
                Status: status,
                PageInt: pageIndex,
                PageSize: pageSize,
            }
        });
    },
    getTaskList(code,size,days,month) {
        return request({
            url: yqUrl + '/api/student/task/get',            
            method: 'get',
            params: {
                Code: code,
                Size: size,
                Days: days,
                Month: month,
            }
        });
    },
    getSubmitedTask(type) {
        return request({
            url: yqUrl + '/api/student/task/get_list',            
            method: 'get',
            params: {
                Type:type
            }
        });
    },
    submitLog(id,content,IsUpdate) {
        return request({
            url: yqUrl + '/api/student/task/submit_log',            
            method: 'post',
            data: {
                "TaskID":id,
                "Content":content,
                "IsUpdate": IsUpdate
            }
        });
    },
    submitFile(id,filedata,IsUpdate) {
        return request({
            url: yqUrl + '/api/student/task/submit_file',            
            method: 'post',
            params: {
                "TaskID":id,
                "IsUpdate": IsUpdate
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: filedata,
        });
    },
    getListByType(type){
        return request({
            url: yqUrl + '/api/student/task/get_list',            
            method: 'get',
            params: {
                Type:type
            }
        });
    },
    getSubmit(taskId){
        return request({
            url: yqUrl + '/api/student/task/get_submit',            
            method: 'get',
            params:{
                TaskID:taskId
            }
        });
    },
    handleNewsStu(newsId,status) {
        return request({
            url: yqUrl + '/api/news_stu/handle',            
            method: 'get',
            params: {
                NewsID:newsId,
                Status:status
            }
        });
    },
    getTaskTotal() {
        return request({
            url: yqUrl + '/api/student/stat/task_total',     
            method: 'get',      
        });
    },
    getTempList(schoolId) {
        return request({
            url: yqUrl + '/api/template/file/get_list',     
            method: 'get',
            params:{
                SchoolID:schoolId
                // Type:type,
                // Status:status,	
                // KeyWord	:keyword
            }
        });
    },

}