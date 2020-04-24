import { ModelData } from 'types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';

export interface PostCommentUserMentionData extends ModelData {
    user?: UserData;
    post_comment?: PostCommentData;
}