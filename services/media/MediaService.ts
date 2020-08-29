import { inject, injectable } from '~/node_modules/inversify';
import {
    IMediaService,
    OkFile, OkFileType,
    PickMediaParams,
} from '~/services/media/IMediaService';
import { TYPES } from '~/services/inversify-types';
import { IToastService } from '~/services/toast/IToastService';
import { ILocalizationService } from '~/services/localization/ILocalizationService';
import { IUtilsService } from '~/services/utils/IUtilsService';
import { ToastType } from '~/services/toast/lib/ToastType';

@injectable()
export class MediaService implements IMediaService {
    static readonly maxMediaSizeInMbs = 20;

    static readonly videoMimes = [
        'video/mp4',
        'video/quicktime',
        'video/3gpp',
    ];

    static readonly imageMimes = [
        'image/gif',
        'image/jpeg',
        'image/png',
    ];

    static isVideoMimeType(mimeType: string) {
        return MediaService.videoMimes.includes(mimeType);
    }

    static isImageMimeType(mimeType: string) {
        return MediaService.imageMimes.includes(mimeType);
    }

    static getMediaTypeForMimeType(mimeType: string) {
        if (MediaService.isImageMimeType(mimeType)) return OkFileType.image;

        if (MediaService.isVideoMimeType(mimeType)) return OkFileType.video;

        return OkFileType.unknown;
    }


    constructor(@inject(TYPES.ToastService) private toastService?: IToastService,
                @inject(TYPES.UtilsService) private utilsService?: IUtilsService,
                @inject(TYPES.LocalizationService) private localizationService?: ILocalizationService,
    ) {
    }

    async pickMedia(params: PickMediaParams): Promise<OkFile | undefined> {
        return this.pickFile({
            acceptedMimes: [
                ...MediaService.videoMimes,
                ...MediaService.imageMimes,
            ]
        });
    }

    private pickFile(params: {
        acceptedMimes: string[],

    }): Promise<OkFile | undefined> {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = params.acceptedMimes.join(',');

            input.onchange = (event: any) => {
                const file = event.target.files[0];

                const fileName = file.name;
                const fileSizeInBytes = file.size;
                const fileSizeInMbs = this.utilsService.convertBytesToMbs(fileSizeInBytes); //
                const fileType = file.type;

                if (file.sizeInMbs > MediaService.maxMediaSizeInMbs) {
                    const errorMessage = this.localizationService.localize(
                        'global.errors.media.max_size',
                        {
                            limit: `${MediaService.maxMediaSizeInMbs}MBs`
                        }
                    );
                    this.toastService.show({
                        message: errorMessage,
                        type: ToastType.error
                    });
                    resolve();
                } else if (!params.acceptedMimes.includes(fileType)) {
                    const errorMessage = this.localizationService.localize(
                        'global.errors.media.unsupported_type',
                    );
                    this.toastService.show({
                        message: errorMessage,
                        type: ToastType.error
                    });
                    resolve();
                } else {
                    resolve({
                        file: file,
                        name: fileName,
                        sizeInBytes: fileSizeInBytes,
                        sizeInMbs: fileSizeInMbs,
                        mimeType: fileType,
                        type: MediaService.getMediaTypeForMimeType(fileType)
                    });
                }
            };

            input.click();
        });
    }

}
