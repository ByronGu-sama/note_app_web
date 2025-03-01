export default {
    // 连接ws服务
    CONNECT_WS: 'ws://localhost:8081/message/init',

    // 登陆
    LOGIN: "/auth/login",
    // 注册
    REGISTER: "/auth/register",
    // 登出
    LOGOUT: "/auth/logout",
    // 校验验证码
    VERIFY_CAPTCHA: "/auth/verifyCaptcha",
    // 获取用户信息
    GET_USER_INFO: "/userInfo",
    // 更新用户信息
    UPDATE_USER_INFO: "/userInfo/update",
    // 获取用户关注列表
    GET_USER_FOLLOWS: "/userInfo/follows",
    // 获取用户粉丝列表
    GET_USER_FOLLOWERS: "/userInfo/followers",
    // post 创建笔记
    NEW_NOTE: "/note",
    // post 获取笔记详情
    GET_NOTE_DETAIL: "/note",
    // delete 删除笔记
    DEL_NOTE: "/note",
    // 获取笔记列表
    NOTE_LIST: "/note/list",
    // 搜索笔记
    SEARCH_NOTE_LIST: "/note/search",
    // 获取我的笔记
    MY_NOTE_LIST: "/note/myNotes",
    // 获取笔记图片
    NOTE_PIC: "/note/pic",
    // 点赞
    LIKE_NOTE: "/note/like",
    // 取消点赞
    DISLIKE_NOTE: "/note/dislike",
    // 收藏笔记
    COLLECT_NOTE: "/note/collect",
    // 取消收藏笔记
    CANCEL_COLLECT_NOTE: "/note/cancelCollect",
    // 评论笔记
    NEW_NOTE_COMMENT: "/comment",
    // 获取笔记评论列表
    GET_NOTE_COMMENT_LIST: "/comment/getList",
    // 获取笔记子评论列表
    GET_NOTE_SUB_COMMENT_LIST: "/comment/getSubList",
    // 删除笔记评论
    DEl_NOTE_COMMENT: "/comment/delComment",
    // 点赞评论 /comment/like/:cid
    LIKE_NOTE_COMMENT: "/comment/like",
    // 取消点赞评论
    DISLIKE_NOTE_COMMENT: "/comment/dislike",
    // 更新用户页banner
    UPDATE_PROFILE_BANNER: "/style/updateProfileBanner",
    // 获取主题
    GET_STYLE: "/style",
    // 获取WS连接
    GET_WS_CONNECTION: "/message/init",
}