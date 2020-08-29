import { ICommunity } from '~/models/communities/community/ICommunity';
import { ICircle } from '~/models/connections/circle/ICircle';


export interface OkPostCreatorParams {
    community?: ICommunity;
    text?: string;
    image?: File;
    video?: File;
}

export enum OkPostCreatorStep{
    content,
    // The place where they pick whether to post to circles or communities
    destination,
    // The place where they select to which circle to post it to
    circles,
    // The place where they select to which community to post it to
    communities,
}


export interface OkNewPostData {
    text: string;
    image?: File;
    video?: File;
    community?: ICommunity;
    circles?: ICircle[];
}


