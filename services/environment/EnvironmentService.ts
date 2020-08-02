import { IEnvironmentService } from '~/services/environment/IEnvironmentService';
import { inject, injectable } from '~/node_modules/inversify';
import { Environment } from '~/services/environment/lib/Environment';
import { TYPES } from '~/services/inversify-types';
import { IWindowService } from '~/services/window/IWindowService';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { EnvironmentResolution } from '~/services/environment/lib/EnvironmentResolution';

@injectable()
export class EnvironmentService implements IEnvironmentService {

    environmentResolution: BehaviorSubject<EnvironmentResolution | undefined> = new BehaviorSubject(undefined);

    constructor(@inject(TYPES.WindowService) private windowService?: IWindowService) {
        this.recalculateEnvironmentResolution(windowService.getWidth());
        this.windowService.onWidthChange(this.recalculateEnvironmentResolution.bind(this));
    }

    get apiUrl() {
        return process.env['API_URL'] as string;
    }

    get loggingIsEnabled(): boolean {
        return process.env.LOGGING === 'true'
    }


    get environment(): Environment {
        return Environment.parse(process.env.ENVIRONMENT as string) as Environment;
    }

    get sentryDsn(): string {
        return process.env.SENTRY_DSN as string;
    }

    get termsOfUseMdUrl(): string {
        return process.env.TERMS_OF_USE_MD_URL as string;
    }

    get privacyPolicyMdUrl(): string {
        return process.env.PRIVACY_POLICY_MD_URL as string;
    }

    get communityGuidelinesMdUrl(): string {
        return process.env.COMMUNITY_GUIDELINES_MD_URL as string;
    }


    private recalculateEnvironmentResolution(windowWidth: number) {
        let environmentResolution;
        if (windowWidth > 1024) {
            environmentResolution = EnvironmentResolution.desktop;
        } else if (windowWidth > 769) {
            environmentResolution = EnvironmentResolution.tablet;
        } else {
            environmentResolution = EnvironmentResolution.mobile;
        }

        if (environmentResolution !== this.environmentResolution.value) {
            this.environmentResolution.next(environmentResolution);
        }
    }

}

