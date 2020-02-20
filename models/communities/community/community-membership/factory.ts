import { IModelFactory } from '~/interfaces/IModelFactory';
import { ICommunityMembership } from '~/models/communities/community/community-membership/ICommunityMembership';
import { CommunityMembership } from '~/models/communities/community/community-membership/CommunityMembership';
import { CommunityMembershipData } from '~/types/models-data/communities/CommunityMembershipData';

class CommunityMembershipFactory extends IModelFactory<ICommunityMembership> {
    make(data: CommunityMembershipData): ICommunityMembership {
        return new CommunityMembership(data);
    }
}

const communityMembershipFactory = new CommunityMembershipFactory();

export default communityMembershipFactory;