import { ModelData } from 'types/models-data/ModelData';

export interface PostLinkData extends ModelData {
    link: string;
    has_preview: boolean;
}
