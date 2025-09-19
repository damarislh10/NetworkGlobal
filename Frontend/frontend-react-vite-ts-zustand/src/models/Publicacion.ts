export type Post = {
    id: string;
    userId: string;
    message: string;
    createdAt: string;
    likes: number;
    likedByMe: boolean;
    authorName?: string | null;
    authorAlias?: string | null;
};
