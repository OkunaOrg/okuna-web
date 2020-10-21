import { ModelData } from 'types/models-data/ModelData';

export interface PostImageData extends ModelData {
    image: string;
    width: number;
    height: number;
    thumbnail: string;
}
