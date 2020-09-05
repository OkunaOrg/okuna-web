import { PostMediaType } from '~/models/posts/post-media/lib/PostMediaType';

export interface IMediaService {
    pickMedia(params: PickMediaParams): Promise<OkFile | undefined>;
}


export interface PickMediaParams {
    destination: OkMediaDestination,
}

export interface OkFile {
    file: File;
    name: string;
    sizeInBytes: number;
    sizeInMbs: number;
    mimeType: string;
    type: OkFileType;
}

export enum OkMediaDestination {
    avatar,
    cover,
    post
}


export class OkFileType {
    static video = new PostMediaType('V');
    static image = new PostMediaType('I');
    static unknown = new PostMediaType('U');

    static _values: PostMediaType[] = [
        OkFileType.video,
        OkFileType.image,
        OkFileType.unknown,
    ];

    static values() {
        return OkFileType._values.slice(0);
    }

    static parse(val: string): OkFileType | undefined {
        let mediaKeyword;

        for (let i = 0; i < OkFileType._values.length; i++) {
            const value = OkFileType._values[i];
            if (val == value.code) {
                mediaKeyword = value;
                break;
            }
        }

        if (!mediaKeyword) {
            console.error('Unsupported media keyword');
        }

        return mediaKeyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}


