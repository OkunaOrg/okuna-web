import { Environment } from '~/services/environment/lib/Environment';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { EnvironmentResolution } from '~/services/environment/lib/EnvironmentResolution';

export interface IEnvironmentService {
    environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>;

    apiUrl: string;

    loggingIsEnabled: boolean;

    environment: Environment;

    sentryDsn: string;

    termsOfUseMdUrl: string;

    privacyPolicyMdUrl: string;

    communityGuidelinesMdUrl: string;

}

