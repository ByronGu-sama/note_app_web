import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import userInfoRequest from "../requestAPI/requestList.ts";
import type {IUserInfo} from "../models/userInfoModel.ts";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<IUserInfo | null>(null)
    const getUserInfo = () => {
        axios.get(userInfoRequest.GET_USER_INFO).then((res) => {
            userInfo.value = {...res.data.data}
        })
    }

    return {
        userInfo,
        getUserInfo,
    }
})