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
                component: () => import ('../components/video/video.vue'),
                meta: {
                    keepAlive: false
                }
            },
            {
                path: "newNote",
                name: "newNote",
                component: () => import ('../components/newNote/newNote.vue'),
                meta: {
                    keepAlive: false
                }
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
        path: "/updateProfile",
        name: "UpdateProfile",
        component: () => import('../components/profile/updateProfileInfo.vue'),
        meta: {
            keepAlive: false
        },
    },
    {
        path: "/appSetting",
        name: "AppSetting",
        component: () => import('../components/profile/appSetting.vue'),
        meta: {
            keepAlive: false
        },
    },
    {
        path: "/searchResult",
        name: "SearchResult",
        component: () => import('../components/home/searchResult.vue'),
        meta: {
            keepAlive: true
        }
    },
    {
        path: "/noteDetail/:nid",
        name: "NoteDetail",
        component: () => import('../components/miniComponents/noteDetail.vue'),
        meta: {
            keepAlive: false
        }
    },
    {
        path: "/startup",
        name: "Startup",
        component: () => import ('../components/startup.vue'),
        meta: {
            keepAlive: false
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import ('../components/login.vue'),
        meta: {
            keepAlive: false
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import ('../components/register.vue'),
        meta: {
            keepAlive: false
        },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router