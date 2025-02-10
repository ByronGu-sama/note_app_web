export interface INoteDetailModel {
    nid:string;
    uid:number;
    avatarUrl:string;
    username:string;
    pics:string[];
    title:string;
    content:string;
    createdAt:string;
    updatedAt:string;
    public: number;
    categoryId:string;
    tags: string;
    likesCount:number;
    commentsCount:number;
    collectionsCount:number;
    sharesCount:number;
    viewsCount:number;
}