import { OkPostStudioData } from '~/components/post-studio/lib/OkPostCreatorTypes';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { OkPostUpload } from '~/services/post-uploader/lib/OkPostUpload';

export interface IPostUploaderService {
    uploads: BehaviorSubject<OkPostUpload[]>;
    uploadPost(postData: OkPostStudioData): OkPostUpload;
}



