import {createWebHashHistory, createRouter} from "vue-router";
const routes:any[] = [
    {
        path: "/",
        name: "Home",
        component: () => import ('../components/home/home.vue')
    },
    {
        path: "/video",
        name: "Video",
        component: () => import ('../components/video/video.vue')
    },
    {
        path: "/message",
        name: "Message",
        component: () => import ('../components/message/message.vue')
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import ('../components/profile/profile.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router