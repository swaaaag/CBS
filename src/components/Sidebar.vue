<script>
import { computed, nextTick, onBeforeMount,onMounted,ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const onRoutes = computed(() => {
            return route.path;
        });
        
        

        const items = ref([
        {
            icon: "homeFilled",
            index: "/dashboard",
            title: "控制面板",
            show:true
        },
        {
            icon: "list",
            index: "/mytask",
            title: "我的任务",
            show:true,
            subs: [
                {
                    index: "/mytask/index",
                    title: "任务总览",
                },
                {
                    index: "/dailyTask",
                    title: "日常任务",
                },
                {
                    index: "/trainRes",
                    title: "实训成果",
                },
                {
                    index: "/message",
                    title: "消息提醒",
                },
                {
                    index: "/tempDown",
                    title: "模板下载",
                },
                {
                    index: "/taskReport",
                    title: "实习报告",
                }
            ],
        },
        {
            icon: "school",
            index: "/training",
            title: "在线实训",
            show:true,
                subs: [
                {
                    index: "/trainTask",
                    title: "在线实训任务",
                },
                {
                    index: "/trainLearn",
                    title: "自主提升学习",
                }
            ],
        },
        {
            icon: "monitor",
            index: "/summary",
            title: "成绩汇总",
            show:true,
        },
        {
            icon: "data-analysis",
            index: "/analysis",
            title: "学情分析",
            show:true,
        },
        {
            icon: "collection",
            index: "/collect",
            title: "我的收藏",
            show:true,
        },
        {
            icon: "setting",
            index: "",
            title: "个人设置",
            show:true,
            subs: [
                {
                    index: "/setting",
                    title: "个人设置-基本信息",
                },
                {
                    index: "/safeSetting",
                    title: "个人设置-安全设置",
                },
                {
                    index: "/loginLog",
                    title: "个人设置-登录日志",
                }
            ],
        },
        {
            icon: "calendar",
            index: "/group",
            title: "组长工作",
            show:true,
            subs: [
                {
                    index: "/group/index",
                    title: "组长工作-我的工作",
                },
                {
                    index: "/group/comment",
                    title: "组长工作-评语配置",
                }
            ],
            
        }
        
        ]);

        const IsLeader = JSON.parse(localStorage.getItem('trainInfo')).IsLeader;
        items.value.forEach((item)=>{
            if(item.index == '/group'){
                if(IsLeader){
                    item.show=true;
                }else{
                    item.show=false;
                }
            }
        })
           
        return {
            items,
            onRoutes,
        };
    },
};
</script>


<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items" :key="item.index">
                <div v-show="item.show">
                    <template v-if="item.subs">
                        <el-sub-menu :index="item.index" :key="item.index">
                            <template #title>
                                <span class="sidebar-title">
                                    <el-icon class="pb3"><component :is="item.icon" /></el-icon>
                                    {{ item.title }}
                                </span>
                            </template>
                            <div v-for="subItem in item.subs" :key="subItem.index">  
                                <el-menu-item class="menu-fr" :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                                </el-menu-item>
                            </div>
                        </el-sub-menu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :key="item.index">
                            <template #title>
                                <span class="sidebar-title">                               
                                    <el-icon class="pb3"><component :is="item.icon" /></el-icon>
                                    {{ item.title }}
                                </span>
                            </template>
                        </el-menu-item>
                    </template>
                </div>
            </template>
        </el-menu>
    </div>
</template>



<style lang="scss" scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    background-color: #324157;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
el-menu-item {
    font-size: 20px;
}
.sidebar-title {
    font-size: 20px;
    margin-left: 30px;
    .pb3 {
        padding-bottom: 3px;
    }
}

.menu-fr{
    margin-left: 3em;
}
    
</style>
