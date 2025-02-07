import {createWebHashHistory, createRouter} from "vue-router";
const routes:any[] = [
    {
        path: "/",
        name: "Main",
        component: () => import ('../components/main.vue'),
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import ('../components/home/home.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: "video",
                name: "Video",
                component: () => import ('../components/video/video.vue')
            },
            {
                path: "newNote",
                name: "newNote",
                component: () => import ('../components/newNote/newNote.vue'),
            },
            {
                path: "message",
                name: "Message",
                component: () => import ('../components/message/message.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: "profile",
                name: "Profile",
                component: () => import ('../components/profile/profile.vue'),
                meta: {
                    keepAlive: true
                }
            },
        ]
    },
    {
        path: "/startup",
        name: "Startup",
        component: () => import ('../components/startup.vue')
    },
    {
        path: "/login",
        name: "Login",
        component: () => import ('../components/login.vue')
    },
    {
        path: "/register",
        name: "Register",
        component: () => import ('../components/register.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router