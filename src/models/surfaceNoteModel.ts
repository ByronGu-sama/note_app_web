export interface ISurfaceNote {
    nid?: string; // 笔记id
    uid?: bigint; // 作者id
    username?: string; // 作者名
    avatarUrl?: string; // 作者头像
    cover?: string; // 封面
    cover_height?: number; // 封面高度
    title?: string; // 标题
    public?: number; // 是否公开
    categoryId?: string; // 分类
    tags?: string; // 标签
    likes_count?: number; // 点赞数
}