import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useMessageStore = defineStore('message', () => {
    interface message {
        from_id: number;
        from_name: string,
        from_avatar: string,
        to_id: number,
        type: number,
        content: string,
        mediaType: number,
        url: string,
        pub_time: string,
        group_id: string,
    }
    interface messageMap {
        [key: number]: [targetName:string, message[]]
    }

    const curMsgTarget = ref({
        uid: 0,
        username: "",
    });
    const msgList = reactive<messageMap>({}); // 私聊消息

    const updateMsgTarget = (uid:number, username:string) => {
        curMsgTarget.value.uid = uid;
        curMsgTarget.value.username = username;
    }

    const pushMsgToList = (uid:number, username:string, msg:message | null) => {
        if (msgList.hasOwnProperty(uid)) {
            if(msg) {
                msgList[uid][1].push(msg);
            }
        } else {
            if(msg) {
                msgList[uid] = [username, [msg]];
            } else {
                msgList[uid] = [username, []];
            }
        }
    }


    return {
        curMsgTarget,
        msgList,
        updateMsgTarget,
        pushMsgToList,
    }
})