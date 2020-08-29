import { ICommunity } from '~/models/communities/community/ICommunity';
import { ICircle } from '~/models/connections/circle/ICircle';
import { IPost } from '~/models/posts/post/IPost';
import { OkFile } from '~/services/media/IMediaService';


export interface OkPostStudioParams {
    community?: ICommunity;
    post?: IPost;
}

export enum OkPostStudioSteps{
    content,
    // The place where they pick whether to post to circles or communities
    destination,
    // The place where they select to which circle to post it to
    circles,
    // The place where they select to which community to post it to
    communities,
}


export interface OkPostStudioData {
    text?: string;
    media?: OkFile[]
    community?: ICommunity;
    circles?: ICircle[];
    post?: IPost;
}


