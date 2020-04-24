import { IModelFactory } from '~/interfaces/IModelFactory';
import { ICommunityInvite } from '~/models/communities/community/community-invite/ICommunityInvite';
import { CommunityInvite } from '~/models/communities/community/community-invite/CommunityInvite';
import { CommunityInviteData } from '~/types/models-data/communities/CommunityInviteData';

class CommunityInviteFactory extends IModelFactory<ICommunityInvite> {
    make(data: CommunityInviteData): ICommunityInvite {
        return new CommunityInvite(data);
    }
}

const communityInviteFactory = new CommunityInviteFactory();

export default communityInviteFactory;