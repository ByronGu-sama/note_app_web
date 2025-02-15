import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import type {IStyleModel} from "../models/styleModel.ts";
import requestList from "../requestAPI/requestList.ts";

export const useStyleStore = defineStore('style', () => {
    const styleInfo = ref<IStyleModel>({
        uid: 0,
        profileBanner: "",
    })

    const getStyle = () => {
        axios.get(`${requestList.GET_STYLE}`).then((res) => {
            if(res.data.code === 200) {
                styleInfo.value.uid = res.data.data.uid;
                styleInfo.value.profileBanner = res.data.data.profileBanner;
            }
        })
    }

    const clearStyle = () => {
        styleInfo.value = {
            uid: 0,
            profileBanner: "",
        }
    }

    return {
        styleInfo,
        getStyle,
        clearStyle,
    }
})