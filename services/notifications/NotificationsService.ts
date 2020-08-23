import { inject, injectable } from '~/node_modules/inversify';
import { INotificationsService } from '~/services/notifications/INotificationsService';
import { IOkLogger } from '~/services/logging/types';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { TYPES } from '~/services/inversify-types';
import { IStorageService } from '~/services/storage/IStorageService';
import { ILoggingService } from '~/services/logging/ILoggingService';
import { IUser } from '~/models/auth/user/IUser';
import { INotification } from '~/models/notifications/notification/INotification';
import { CancelableOperation } from '~/lib/CancelableOperation';
import { IUserService } from '~/services/user/IUserService';

@injectable()
export class NotificationsService implements INotificationsService {

    static readonly pollingLastNotificationTimeoutInMs = 2000;
    static readonly hasNewNotificationStorageKey = 'hasNewNotification';
    static readonly lastNotificationIdStorageKey = 'lastNotificationId';


    hasNewNotification: BehaviorSubject<boolean | undefined> = new BehaviorSubject(undefined);
    lastNotificationId: BehaviorSubject<number | undefined> = new BehaviorSubject(undefined);


    private logger: IOkLogger;
    private storage: IOkStorage<any>;
    private refreshUserOperation?: CancelableOperation<INotification[]>;
    private nextUserRefreshTimeout: any;

    constructor(
        @inject(TYPES.StorageService)  storageService?: IStorageService,
        @inject(TYPES.LoggingService)  loggingService?: ILoggingService,
        @inject(TYPES.UserService) private userService?: IUserService,
    ) {
        this.storage = storageService!.getLocalForageStorage('notificationsService');
        this.logger = loggingService.getLogger({
            name: 'NotificationsService'
        });
    }

    async bootstrap() {
        await this.bootstrapHasNewNotification();
        await this.bootstrapLastNotificationId();
        this.userService.loggedInUser.subscribe(this.onLoggedInUserChange.bind(this));
    }

    setNoLongerHasNewNotification() {
        return this.setHasNewNotification(false);
    }

    private async onLoggedInUserChange(user: IUser | null | undefined) {
        if (user) {
            if (!this.nextUserRefreshTimeout) {
                this.logger.info('Starting polling user');
                this.startPollingLastNotification();
            }
        } else if (user === null) {
            this.stopPollingLastNotification();
            this.logger.info('Clearing notifications data');
            this.clearLastNotificationId();
            this.clearHasNewNotification();
        }
    }

    startPollingLastNotification() {
        return this.pollLastNotification();
    }

    stopPollingLastNotification() {
        this.refreshUserOperation.cancel();
        if (this.nextUserRefreshTimeout) {
            clearTimeout(this.nextUserRefreshTimeout);
            this.nextUserRefreshTimeout = undefined;
        }
    }


    async pollLastNotification() {
        this.nextUserRefreshTimeout = setTimeout(async () => {
            const lastNotification = await this.getLastNotification();
            if (lastNotification) await this.onLastNotification(lastNotification);
            this.pollLastNotification();
        }, NotificationsService.pollingLastNotificationTimeoutInMs);
    }

    async getLastNotification() {
        try {
            this.refreshUserOperation = CancelableOperation.fromPromise(this.userService.getNotifications({
                types: [],
                count: 1
            }));
            const notifications = await this.refreshUserOperation.value;
            if (notifications.length) return notifications[0];
        } catch (error) {
            this.logger.error('Failed to get last notification');
        }
    }

    async onLastNotification(lastNotification: INotification) {
        const lastNotificationId = lastNotification.id;
        const storedLastNotificationId = await this.getLastNotificationId();

        if (storedLastNotificationId) {
            if (lastNotification.id > storedLastNotificationId) {
                // Its a newer notification
                await this.setHasNewNotification(true);
            }
        } else if (this.userService.loggedInUser.value.unreadNotificationsCount) {
            await this.setHasNewNotification(true);
        }

        await this.setLastNotificationId(lastNotificationId);
    }


    private async bootstrapHasNewNotification() {
        const hasNewNotification = await this.getHasNewNotification();
        this.notifyHasNewNotificationChange(hasNewNotification);
    }

    async setHasNewNotification(hasNewNotification: boolean) {
        this.logger.info(`Setting has new notification: ${hasNewNotification}`);
        await this.storage.set(NotificationsService.hasNewNotificationStorageKey, hasNewNotification);
        this.notifyHasNewNotificationChange(hasNewNotification);
    }

    async getHasNewNotification() {
        return await this.storage.get(NotificationsService.hasNewNotificationStorageKey);
    }

    clearHasNewNotification() {
        return this.storage.remove(NotificationsService.hasNewNotificationStorageKey);
    }

    private notifyHasNewNotificationChange(hasNewNotification: boolean) {
        this.hasNewNotification.next(hasNewNotification);
    }

    private async bootstrapLastNotificationId() {
        const lastNotificationId = await this.getLastNotificationId();
        this.notifyLastNotificationIdChange(lastNotificationId);
    }

    async setLastNotificationId(lastNotificationId: number) {
        await this.storage.set(NotificationsService.lastNotificationIdStorageKey, lastNotificationId);
        this.notifyLastNotificationIdChange(lastNotificationId);
    }

    clearLastNotificationId() {
        return this.storage.remove(NotificationsService.lastNotificationIdStorageKey);
    }

    async getLastNotificationId() {
        return await this.storage.get(NotificationsService.lastNotificationIdStorageKey);
    }

    private notifyLastNotificationIdChange(lastNotificationId: number) {
        this.lastNotificationId.next(lastNotificationId);
    }


}
