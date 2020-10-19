import { Environment } from '~/services/environment/lib/Environment';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { EnvironmentResolution } from '~/services/environment/lib/EnvironmentResolution';
import BrowserDetails = Bowser.Parser.BrowserDetails;

export interface IEnvironmentService {
    environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>;
    browserDetails: BehaviorSubject<BrowserDetails | undefined>;

    apiUrl: string;

    contentProxyUrl: string;

    loggingIsEnabled: boolean;

    environment: Environment;

    sentryDsn: string;

    hcaptchaSiteKey: string;

    termsOfUseMdUrl: string;

    privacyPolicyMdUrl: string;

    communityGuidelinesMdUrl: string;

}

