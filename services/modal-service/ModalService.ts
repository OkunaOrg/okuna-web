import { inject, injectable } from '~/node_modules/inversify';
import { IModalService, ModalParams, PostModalParams } from '~/services/modal-service/IModalService';
// From outside Vue instance
import { BehaviorSubject } from '~/node_modules/rxjs';
import { TYPES } from '~/services/inversify-types';
import { IHistoryService } from '~/services/history-service/IHistoryService';
import { ILoggingService } from '~/services/logging/ILogging';
import { IOkLogger } from '~/services/logging/types';
import { ModalType } from '~/services/modal-service/lib/ModalType';

@injectable()
export class ModalService implements IModalService {

    activeModal: BehaviorSubject<ModalType | undefined> = new BehaviorSubject(undefined);
    activeModalParams: BehaviorSubject<ModalParams | undefined> = new BehaviorSubject(undefined);

    activeModalPromise: Promise<any>;
    activeModalResolver: (value?: any) => void;
    activeModalRejector: (reason?: any) => void;
    activeModalReturnData: any;

    private logger: IOkLogger;

    constructor(@inject(TYPES.HistoryService) private historyService?: IHistoryService,
                @inject(TYPES.LoggingService)  loggingService?: ILoggingService
    ) {
        this.logger = loggingService!.getLogger({
            name: 'ModalService'
        });
    };


    async openPostModal(params: PostModalParams): Promise<void> {
        this.ensureHasNoActiveModal();

        // Store original path
        const originalPath = this.historyService.getPath();

        this.historyService.updatePathForPostSilently({
            post: params.post
        });

        await this.openModal(ModalType.post, params);

        // Restore original path
        this.historyService.setPathSilently(originalPath);
    }


    notifyModalClosed(): void {
        this.ensureHasActiveModal();
        this.logModalClosed();
        this.activeModalResolver(this.activeModalReturnData);
        this.resetState();
    }


    setActiveModalReturnData(any) {
        this.activeModalReturnData = any;
    }

    private openModal(modalType: ModalType, params: PostModalParams): Promise<any> {
        this.activeModalParams.next(params);
        this.activeModal.next(modalType);
        this.logModalOpened();

        this.activeModalPromise = new Promise((resolve, reject) => {
            this.activeModalResolver = resolve;
            this.activeModalRejector = reject;
        });

        return this.activeModalPromise;
    }

    private resetState() {
        // Reset state
        this.activeModalReturnData = undefined;
        this.activeModalParams.next(undefined);
        this.activeModal.next(undefined);
        this.activeModalPromise = undefined;
        this.activeModalRejector = undefined;
        this.activeModalResolver = undefined;
    }

    private ensureHasNoActiveModal() {
        if (this.activeModalPromise) throw 'Modal is already active. Cannot proceed';
    }

    private ensureHasActiveModal() {
        if (!this.activeModalPromise) throw 'No modal is currently active. Cannot proceed';
    }

    private logModalOpened() {
        this.logger.info('Modal opened', this.activeModal.value);
    }

    private logModalClosed() {
        this.logger.info('Modal closed', this.activeModal.value);
    }

    private logModalFailed(reason) {
        this.logger.info('Modal failed', this.activeModal.value, 'with reason', reason);
    }


}