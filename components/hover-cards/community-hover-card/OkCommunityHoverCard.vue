<template>
    <div class="ok-community-hover-card-container">
        <v-popover
            trigger="hover"
            :autoHide="true"
            :delay="{ show: 500, hide: 250 }"
            :popperOptions="popperOptions"
            :style="{ display: 'inline-block' }"
            v-if="environmentResolution === EnvironmentResolution.desktop"
        >
            <slot></slot>

            <div slot="popover" class="ok-community-hover-card">
                <ok-community-hover-card-content
                    v-if="community"
                    :community="community"
                ></ok-community-hover-card-content>
                <ok-post-skeleton v-else></ok-post-skeleton>
            </div>
        </v-popover>

        <slot v-else></slot>
    </div>
</template>

<style lang="scss" scoped>
    .ok-community-hover-card-container {
        display: inline-block;
    }

    .ok-community-hover-card {
        width: 450px;
        box-shadow: 0 4px 7px -1px rgba(0, 0, 0, 0.1), 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';

    import { ICommunity } from '~/models/communities/community/ICommunity';
    import OkCommunityHoverCardContent from '~/components/hover-cards/community-hover-card/OkCommunityHoverCardContent.vue';
    import OkPostSkeleton from '~/components/skeletons/post/OkPostSkeleton.vue';

    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IUserService } from '~/services/user/IUserService';
    import { IEnvironmentService } from '~/services/environment/IEnvironmentService';

    import { BehaviorSubject } from 'rxjs';
    import { EnvironmentResolution } from '~/services/environment/lib/EnvironmentResolution';

    @Component({
        name: 'OkCommunityHoverCard',
        components: { OkPostSkeleton, OkCommunityHoverCardContent },
        subscriptions: function () {
            return {
                environmentResolution: this['environmentService'].environmentResolution
            };
        }
    })
    export default class OkCommunityHoverCard extends Vue {
        @Prop(String) private readonly communityName;

        $observables: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);

        community: ICommunity | null = null;

        EnvironmentResolution = EnvironmentResolution;

        mounted() {
            this.userService.getCommunity({
                communityName: this.communityName,
                appendAuthorizationTokenIfExists: true
            }).then(community => {
                this.community = community;
            });
        }

        popperOptions = {
            positionFixed: true,
            modifiers: {
                flip: {
                    enabled: false
                }
            }
        };
    }
</script>
