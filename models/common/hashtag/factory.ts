import { IModelFactory } from '~/interfaces/IModelFactory';
import { HashtagData } from 'types/models-data/common/HashtagData';
import { Hashtag } from '~/models/common/hashtag/Hashtag';
import { IHashtag } from '~/models/common/hashtag/IHashtag';

class HashtagFactory extends IModelFactory<IHashtag> {
    make(data: HashtagData): IHashtag {
        return new Hashtag(data);
    }
}

const hashtagFactory = new HashtagFactory();

export default hashtagFactory;
