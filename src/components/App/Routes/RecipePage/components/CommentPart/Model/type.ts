export interface ICommentCard {
    id: number;
    content: string;
    recipe_id: number;
    user_id: number;
    commentUser: IUserComment;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUserComment {
    id: number;
    username: string;
}
