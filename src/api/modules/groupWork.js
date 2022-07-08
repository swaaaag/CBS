import request from '../index';

const envor = process.env.NODE_ENV === 'production'

if(!envor){
    var yqUrl = '/yq';
}else{
    var yqUrl = 'http://api.yunql.cn';
}

export const groupApi = {
   
    getMemberList() {
        return request({
            url: yqUrl + '/api/leader/get_memberlist',     
            method: 'get',
        });
    },
    getMemberTask(id,month) {
        return request({
            url: yqUrl + '/api/leader/member_tasklist',     
            method: 'get',
            params: {
                StudentID:id,
                Month:month
            }
        });
    },
    getTaskInfo(stuid,taskid) {
        return request({
            url: yqUrl + '/api/leader/member_task',     
            method: 'get',
            params: {
                StudentID:stuid,
                TaskID:taskid
            }
        });
    },
    setComment(stuID,taskID,status,comment) {
        return request({
            url: yqUrl + '/api/leader/set_comment',     
            method: 'post',
            data: {
                "TaskID": taskID,
                "StudentID": stuID,
                "Status": status,
                "CommentContent": comment,
                "CommentType": "Default"
            }
        });
    },

    addComment(content) {
        return request({
            url: yqUrl + '/api/comment/add',
            method: 'get',
            params: {
                Content:content,
                Type:'Default'
            }
        })
    },

    getComment() {
        return request({
            url: yqUrl + '/api/comment/get',
            method: 'get',
            params: {
                Type:'Default'
            }
        })
    },

    deleteComment(id) {
        return request({
            url: yqUrl + '/api/comment/delete',
            method: 'get',
            params: {
                ID:id
            }
        })
    },

    updateComment(content,id) {
        return request({
            url: yqUrl + '/api/comment/update',
            method: 'get',
            params: {
                Content:content,
                ID:id
            }
        })
    },  

}