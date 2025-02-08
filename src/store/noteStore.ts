import {defineStore} from "pinia";
import {ref} from "vue";
import type {INoteDetailModel} from "../models/noteDetailModel.ts";
import axios from "axios";
import requestList from "../requestAPI/requestList.ts";

export const useNoteStore = defineStore('note', () => {
    const noteDetail = ref<INoteDetailModel>();
    const showNoteDetail = ref<boolean>(false);

    const getNoteDetail = (nid:string) => {
        axios.get(requestList.GET_NOTE_DETAIL + "/" + nid).then((res) => {
            if (res.data.code == 200) {
                noteDetail.value = {...res.data.data};
            }
        }).catch(() => {
            console.log("获取笔记详情失败")
        })
    }

    return {
        noteDetail,
        showNoteDetail,
        getNoteDetail,
    }
})