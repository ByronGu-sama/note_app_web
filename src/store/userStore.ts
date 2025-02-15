import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import userInfoRequest from "../requestAPI/requestList.ts";
import type {IUserInfo} from "../models/userInfoModel.ts";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<IUserInfo>({
        uid: 0,
        username: "",
        avatarUrl: "",
        birth: "",
        gender: "0",
        signature: "",
        address: "",
        language: "",
        collects: 0,
        follows: 0,
        followers: 0,
        likes: 0,
        noteCount: 0,
    })
    const getUserInfo = () => {
        clearUserInfo()
        axios.get(userInfoRequest.GET_USER_INFO).then((res) => {
            userInfo.value = {...res.data.data}
        })
    }

    const clearUserInfo = () => {
        userInfo.value = {
            uid: 0,
            username: "",
            avatarUrl: "",
            birth: "",
            gender: "0",
            signature: "",
            address: "",
            language: "",
            collects: 0,
            follows: 0,
            followers: 0,
            likes: 0,
            noteCount: 0,
        }
    }

    return {
        userInfo,
        getUserInfo,
        clearUserInfo,
    }
})