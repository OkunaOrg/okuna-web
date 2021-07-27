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
import { Howl } from 'howler';
import { IUserPreferencesService } from '~/services/user-preferences/IUserPreferencesService';

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
    private notificationHowl: Howl;

    constructor(
        @inject(TYPES.StorageService)  storageService?: IStorageService,
        @inject(TYPES.UserPreferencesService) private userPreferencesService?: IUserPreferencesService,
        @inject(TYPES.LoggingService)  loggingService?: ILoggingService,
        @inject(TYPES.UserService) private userService?: IUserService,
    ) {
        this.storage = storageService!.getStorage('notificationsService');
        this.logger = loggingService.getLogger({
            name: 'NotificationsService'
        });
    }


    async bootstrap() {
        await this.bootstrapHasNewNotification();
        await this.bootstrapLastNotificationId();
        this.bootstrapNotificationSound();
        this.userService.loggedInUser.subscribe(this.onLoggedInUserChange.bind(this));
    }

    setNoLongerHasNewNotification() {
        return this.setHasNewNotification(false);
    }

    private bootstrapNotificationSound() {
        const mp3Sound = '/sounds/juntos.mp3';
        const oggSound = '/sounds/juntos.ogg';
        const m4rSound = '/sounds/juntos.m4r';

        this.notificationHowl = new Howl({
            volume: 0.2,
            src: [
                mp3Sound,
                oggSound,
                m4rSound
            ]
        });
    }

    private playNotificationSound() {
        if (this.userPreferencesService.notificationsSoundIsEnabled.value) {
            this.logger.info('Playing notification sound');
            this.notificationHowl.play();
        }
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

    private startPollingLastNotification() {
        return this.pollLastNotification();
    }

    private stopPollingLastNotification() {
        this.refreshUserOperation.cancel();
        if (this.nextUserRefreshTimeout) {
            clearTimeout(this.nextUserRefreshTimeout);
            this.nextUserRefreshTimeout = undefined;
        }
    }


    private async pollLastNotification() {
        this.nextUserRefreshTimeout = setTimeout(async () => {
            const lastNotification = await this.getLastNotification();
            if (lastNotification) await this.onLastNotification(lastNotification);
            this.pollLastNotification();
        }, NotificationsService.pollingLastNotificationTimeoutInMs);
    }

    private async getLastNotification() {
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

    private async onLastNotification(lastNotification: INotification) {
        const lastNotificationId = lastNotification.id;
        const storedLastNotificationId = await this.getLastNotificationId();

        if (storedLastNotificationId) {
            if (lastNotification.id > storedLastNotificationId) {
                // Its a newer notification
                if(!this.hasNewNotification.value){
                    this.playNotificationSound();
                }
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

    private clearHasNewNotification() {
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

    private clearLastNotificationId() {
        return this.storage.remove(NotificationsService.lastNotificationIdStorageKey);
    }

    async getLastNotificationId() {
        return await this.storage.get(NotificationsService.lastNotificationIdStorageKey);
    }

    private notifyLastNotificationIdChange(lastNotificationId: number) {
        this.lastNotificationId.next(lastNotificationId);
    }


}
