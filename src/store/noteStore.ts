import {defineStore} from "pinia";
import {ref} from "vue";
import type {INoteDetailModel} from "../models/noteDetailModel.ts";
import axios from "axios";
import requestList from "../requestAPI/requestList.ts";
import type {INoteCommentModel} from "../models/noteCommentModel.ts";
import {ElMessage} from "element-plus";

export const useNoteStore = defineStore('note', () => {
    const noteDetail = ref<INoteDetailModel>({
        nid: "",
        avatarUrl: "",
        categoryId: "",
        collectionsCount: 0,
        commentsCount: 0,
        content: "",
        createdAt: "",
        likesCount: 0,
        pics: [],
        public: 0,
        sharesCount: 0,
        tags: "",
        title: "",
        uid: 0,
        updatedAt: "",
        username: "",
        viewsCount: 0
    });
    const noteDetailHasLoaded = ref(false);
    const noteCommentsList = ref<INoteCommentModel[]>([]);
    const noteCommentsHasLoaded = ref(false);
    const showNoteCard = ref(false);

    // 评论分页
    const limit = 50;
    let page = 1;

    const getNoteDetail = (nid:string) => {
        noteDetail.value = {
            nid: "",
            avatarUrl: "",
            categoryId: "",
            collectionsCount: 0,
            commentsCount: 0,
            content: "",
            createdAt: "",
            likesCount: 0,
            pics: [],
            public: 0,
            sharesCount: 0,
            tags: "",
            title: "",
            uid: 0,
            updatedAt: "",
            username: "",
            viewsCount: 0
        }
        axios.get(`${requestList.GET_NOTE_DETAIL}/${nid}`).then((res) => {
            if (res.data.code == 200) {
                noteDetail.value = res.data.data;
                noteDetailHasLoaded.value = true;
            }
        }).catch(() => {
            ElMessage({
                type: "error",
                message: "笔记加载失败～"
            })
        })
    }

    const getNoteComment = (nid:string) => {
        if(page === 1) {
            noteCommentsList.value = [];
        }
        axios.get(`${requestList.GET_NOTE_COMMENT_LIST}/${nid}?page=${page}&limit=${limit}`).then((res) => {
            if(res.data.code === 200) {
                page++
                for (let i of res.data.data) {
                    noteCommentsList.value.push(i)
                }
                noteCommentsHasLoaded.value = true;
            } else {
                ElMessage({
                    type: "error",
                    message: "评论加载失败~",
                })
            }
        }).catch(() => {
            ElMessage({
                type: "error",
                message: "评论加载失败~",
            })
        })
    }

    const closeDetailCard = () => {
        noteDetailHasLoaded.value = false;
        noteCommentsHasLoaded.value = false;
        page = 1;
    }

    return {
        noteDetail,
        noteDetailHasLoaded,
        noteCommentsList,
        noteCommentsHasLoaded,
        showNoteCard,
        getNoteDetail,
        getNoteComment,
        closeDetailCard,
    }
})