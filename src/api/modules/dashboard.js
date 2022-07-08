import request from '../index';

const envor = process.env.NODE_ENV === 'production'

if(!envor){
    var yqUrl = '/yq';
}else{
    var yqUrl = 'http://api.yunql.cn';
}

export const dashApi = {
   
    getPanelTotal() {
        return request({
            url: yqUrl + '/api/student/stat/panel_total',     
            method: 'get',
        });
    },
    

}