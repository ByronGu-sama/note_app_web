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
        // key结构为fromId-toId
        [key: string]: [fromId:number, fromName:string, toId:number, toName:string, message[]]
    }

    const curMsgTarget = ref({
        from_id: 0,
        from_name: '',
        to_id: 0,
        to_name: "",
        mid: "",
    });
    const msgList = reactive<messageMap>({}); // 私聊消息

    const updateMsgTarget = (fromId:number, fromName:string, toId:number, toName:string) => {
        curMsgTarget.value.from_id = fromId;
        curMsgTarget.value.to_id = toId;
        curMsgTarget.value.from_name = fromName;
        curMsgTarget.value.to_name = toName;
        curMsgTarget.value.mid = getMid(fromId, toId);
    }

    const pushMsgToList = (fromId:number, fromName:string, toId:number, toName:string, msg:message) => {
        // key结构遵循字典序从小到大
        let key = getMid(fromId, toId);
        if (msgList.hasOwnProperty(key)) {
            msgList[key][4].push(msg);
        } else {
            msgList[key] = [fromId, fromName, toId, toName, [msg]];
            console.log("new msg:", fromId, toId);
        }
    }

    const createNewDialog = (fromId:number, fromName:string, toId:number, toName:string) => {
        let key = getMid(fromId, toId);
        if (!msgList.hasOwnProperty(key)) {
            msgList[key] = [fromId, fromName, toId, toName, []];
        }
    }

    const getMid = (fromId:number, toId:number) => {
        let from2To:string = fromId + "-" + toId;
        let to2From:string = toId + "-" + fromId;
        return from2To < to2From ? from2To : to2From;
    }

    return {
        curMsgTarget,
        msgList,
        updateMsgTarget,
        pushMsgToList,
        createNewDialog,
    }
})