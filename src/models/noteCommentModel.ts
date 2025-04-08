export interface INoteCommentModel {
    cid:string;
    nid:string;
    uid:number;
    avatarUrl:string;
    username:string;
    content:string;
    created_at:string;
    parent_id:string;
    parent_name:string;
    root_id:string;
    likes_count:number;
    children:INoteCommentModel[];
    liked:boolean;
}