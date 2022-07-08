import { ElMessage } from "element-plus";
import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '控制面板'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },
            {
                path: "/mytask",
                name: "mytask",
                meta: {
                    title: '我的任务'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/MyTask/index.vue"), 
            },
            {
                path: "/mytask/index",
                name: "mytaskIndex",
                meta: {
                    title: '任务总览',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/MyTask/index.vue"), 
            },
            {
                path: "/dailyTask",
                name: "dailyTask",
                meta: {
                    title: '日常任务'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/MyTask/dailyTask.vue")
            },
            {
                path: "/message",
                name: "message",
                meta: {
                    title: '消息提醒'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/MyTask/message.vue")
            },
            {
                path: "/tempDown",
                name: "tempDown",
                meta: {
                    title: '模板下载'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/MyTask/tempDown.vue")
            },
            {
                path: "/taskReport",
                name: "taskReport",
                meta: {
                    title: '实习报告',
                    developing:true
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/MyTask/taskReport.vue")
            },
            {
                path: "/mytask/reportSubmit/:id/:type",
                name: "reportSubmit",
                meta: {
                    title: '提交报告'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/MyTask/reportSubmit.vue")
            },
            {
                path: "/trainRes",
                name: "trainRes",
                meta: {
                    title: '实训成果',
                    developing:true
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/MyTask/trainResult.vue")
            },
            {
                path: "/traning",
                name: "traning",
                meta: {
                    title: '在线实训'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/OnlineTraning/index.vue")
            },
            {
                path: "/trainTask",
                name: "trainTask",
                meta: {
                    title: '在线实训任务',
                    developing:true
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/OnlineTraning/trainTask.vue")
            },
            {
                path: "/trainLearn",
                name: "trainLearn",
                meta: {
                    title: '自主提升学习',
                    developing:true
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/OnlineTraning/trainLearn.vue")
            },
            {
                path: "/summary",
                name: "summary",
                meta: {
                    title: '成绩汇总',
                    developing:true
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/GradeSummary/index.vue")
            },
            {
                path: "/analysis",
                name: "analysis",
                meta: {
                    title: '学情分析',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/LearnAnalysis/index.vue")
            },
            {
                path: "/collect",
                name: "collect",
                meta: {
                    title: '我的收藏',
                    developing:true
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/MyCollect/index.vue")
            },
            {
                path: "/setting",
                name: "setting",
                meta: {
                    title: '个人设置',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Setting/index.vue")
            },
            {
                path: "/safeSetting",
                name: "safeSetting",
                meta: {
                    title: '安全设置',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Setting/safeSetting.vue")
            },
            {
                path: "/loginLog",
                name: "loginLog",
                meta: {
                    title: '登录日志',
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Setting/loginLog.vue")
            },
            {
                path: "/group",
                name: "",
            },
            {
                path: "/group/index",
                name: "group",
                meta: {
                    title: '组长工作-我的工作'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/GroupWork/index.vue")
            },
            {
                path: "/group/comment",
                name: "comment",
                meta: {
                    title: '组长工作-评语配置'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/GroupWork/comment.vue")
            },
            {
                path: "/group/auditLog/:stuID/:taskID",
                name: "auditLog",
                meta: {
                    title: '审核日志'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/GroupWork/auditLog.vue")
            },
            {
                path: "/group/logTips",
                name: "logTips",
                meta: {
                    title: '日志提醒'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/GroupWork/logTips.vue")
            },
            {
                path: "/gowlxt/userID/:userID/token/:token",
                name: "gowlxt",
                meta: {
                    title: '未来学堂跳转'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../utils/gowlxt.vue")
            },
            {
                path: "/jobFeedback",
                name: "jobFeedback",
                meta: {
                    title: '就业反馈'
                },
                component: () => import (  "../views/JobFeedback.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if(to.meta.developing){
        ElMessage.info('该功能正在开发中...');
        return;
    }else{
        next();
    }
})

export default router;