import request from '../index';

const envor = process.env.NODE_ENV === 'production'

if(!envor){
    var yqUrl = '/yq';
}else{
    var yqUrl = 'http://api.yunql.cn';
}

export const skillApi = {
   
    getSkillStat(params) {
        return request({
            url: yqUrl + '/api/browselog/skill_stat',     
            method: 'post',
            params:{
                UserID:params.userID,
                ProductID:params.productID,
                //SkillID:params.skillID
            }
        });
    },

    getTaskTotal() {
        return request({
            url: yqUrl + '/api/student/stat/task_total',     
            method: 'get',      
        });
    },
    
    

}