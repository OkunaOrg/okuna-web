import { ModelData } from 'types/models-data/ModelData';

export interface UserProfileData extends ModelData {
    name: string,
    avatar: string,
    cover: string,
    bio: string,
    url: string,
    location: string,
    badges: string,
    followers_count_visible: boolean,
    community_posts_visible: boolean,
}