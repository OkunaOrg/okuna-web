import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IUser } from '~/models/auth/user/IUser';
import { ICommunityMembership } from '~/models/communities/community/community-membership/ICommunityMembership';
import { ICategory } from '~/models/common/category/ICategory';
import { CommunityType } from '~/models/communities/community/lib/CommunityType';
import {
    categoriesDeserializer,
    categoriesSerializer, colorDeserializer,
    colorSerializer,
    communityMembershipsDeserializer,
    communityMembershipsSerializer,
    communityTypeDeserializer,
    communityTypeSerializer,
    userDeserializer,
    usersDeserializer,
    userSerializer,
    usersSerializer
} from '~/models/common/serializers';
import { ICommunity } from '~/models/communities/community/ICommunity';
import Color from 'color';

export class Community extends DataModel<Community> implements ICommunity {
    creator?: IUser;
    name?: string;
    type?: CommunityType;
    rules?: string;
    avatar?: string;
    title?: string;
    userAdjective?: string;
    usersAdjective?: string;
    description?: string;
    color?: Color;
    cover?: string;
    isInvited?: boolean;
    areNewPostNotificationsEnabled?: boolean;
    isCreator?: boolean;
    isReported?: boolean;
    moderators?: IUser[];
    memberships?: ICommunityMembership[];
    administrators?: IUser[];
    isFavorite?: boolean;
    invitesEnabled?: boolean;
    membersCount?: number;
    postsCount?: number;
    pendingModeratedObjectsCount?: number;
    categories?: ICategory[];

    // Computed attributes

    colorInvert: Color;

    dataMaps: DataModelAttributeMap<ICommunity>[] = [
        {
            dataKey: 'creator',
            attributeKey: 'creator',
            deserializer: userDeserializer,
            serializer: userSerializer,
        },
        {
            dataKey: 'name',
            attributeKey: 'name'
        },
        {
            dataKey: 'title',
            attributeKey: 'title'
        },
        {
            dataKey: 'type',
            attributeKey: 'type',
            deserializer: communityTypeDeserializer,
            serializer: communityTypeSerializer,
        },
        {
            dataKey: 'rules',
            attributeKey: 'rules'
        },
        {
            dataKey: 'avatar',
            attributeKey: 'avatar'
        },
        {
            dataKey: 'user_adjective',
            attributeKey: 'userAdjective'
        },
        {
            dataKey: 'users_adjective',
            attributeKey: 'usersAdjective'
        },
        {
            dataKey: 'description',
            attributeKey: 'description'
        },
        {
            dataKey: 'cover',
            attributeKey: 'cover'
        },
        {
            dataKey: 'is_invited',
            attributeKey: 'isInvited'
        },
        {
            dataKey: 'members_count',
            attributeKey: 'membersCount'
        },
        {
            dataKey: 'posts_count',
            attributeKey: 'postsCount'
        },
        {
            dataKey: 'is_creator',
            attributeKey: 'isCreator'
        },
        {
            dataKey: 'is_favorite',
            attributeKey: 'isFavorite'
        },
        {
            dataKey: 'is_reported',
            attributeKey: 'isReported'
        },
        {
            dataKey: 'invites_enabled',
            attributeKey: 'invitesEnabled'
        },
        {
            dataKey: 'are_new_post_notifications_enabled',
            attributeKey: 'areNewPostNotificationsEnabled'
        },
        {
            dataKey: 'pending_moderated_objects_count',
            attributeKey: 'pendingModeratedObjectsCount'
        },
        {
            dataKey: 'color',
            attributeKey: 'color',
            serializer: colorSerializer,
            deserializer: colorDeserializer,
        },
        {
            dataKey: 'moderators',
            attributeKey: 'moderators',
            deserializer: usersDeserializer,
            serializer: usersSerializer,
        },
        {
            dataKey: 'administrators',
            attributeKey: 'administrators',
            deserializer: usersDeserializer,
            serializer: usersSerializer,
        },
        {
            dataKey: 'memberships',
            attributeKey: 'memberships',
            deserializer: communityMembershipsDeserializer,
            serializer: communityMembershipsSerializer,
            defaultValue: []
        },
        {
            dataKey: 'categories',
            attributeKey: 'categories',
            deserializer: categoriesDeserializer,
            serializer: categoriesSerializer,
        },

    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
        this.bootstrapComputedAttributes();
    }

    isMember(user: IUser): boolean {
        return !!this.getMembershipForUser(user);
    }

    private getMembershipForUser(user: IUser): ICommunityMembership | null {
        if (this.memberships.length === 0) return null;

        const membership = this.memberships.find((membership) => membership.userId === user.id);

        return membership || null;
    }

    isModerator(user: IUser) {
        const membership = this.getMembershipForUser(user);
        if (!membership) return false;
        return membership.isModerator;
    }

    isAdministrator(user: IUser) {
        const membership = this.getMembershipForUser(user);
        if (!membership) return false;
        return membership.isAdministrator;
    }

    isStaff(user: IUser) {
        return this.isModerator(user) || this.isAdministrator(user);
    }

    canManageAdministrators(user: IUser): boolean {
        return this.isCreator;
    }

    canManageModerators(user: IUser): boolean {
        return this.isAdministrator(user);
    }

    canManageDetails(user: IUser): boolean {
        return this.isAdministrator(user);
    }

    canManageMembers(user: IUser): boolean {
        return this.isStaff(user);
    }

    canManagePosts(user: IUser): boolean {
        return this.isStaff(user);
    }

    private bootstrapComputedAttributes() {
        if (this.color) {
            let colorInvert;

            if (this.color.isDark()) {
                // Dark
                colorInvert = Color('rgb(255, 255, 255)');
            } else {
                // Light
                colorInvert = Color('rgb(0, 0, 0)');
            }

            this.colorInvert = colorInvert;
        }
    }

}