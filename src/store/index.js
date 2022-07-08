import {createStore} from 'vuex'

export default createStore({
    state: {
        userName: '',
        userInfo: ''
    },
    mutations: {
        setUserName(state, data) {
              state.userName = data;
        },
        setUserInfo(state,data){
            state.userInfo = data;
        }
        
    },
    actions: {},
    modules: {}
})