<template>
    <div class="ok-user-hover-card-container">
        <v-popover
            trigger="hover"
            :autoHide="true"
            :delay="{ show: 500, hide: 250 }"
            :popperOptions="popperOptions"
            :style="{ display: 'inline-block' }"
        >
            <slot></slot>

            <div slot="popover" class="ok-user-hover-card">
                <ok-user-hover-card-content
                    v-if="user"
                    :user="user"
                ></ok-user-hover-card-content>
                <ok-post-skeleton v-else></ok-post-skeleton>
            </div>
        </v-popover>
    </div>
</template>

<style lang="scss" scoped>
    .ok-user-hover-card-container {
        display: inline-block;
    }

    .ok-user-hover-card {
        width: 450px;
        box-shadow: 0 4px 7px -1px rgba(0, 0, 0, 0.1), 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';

    import { IUser } from '~/models/auth/user/IUser';
    import OkUserHoverCardContent from '~/components/hover-cards/user-hover-card/OkUserHoverCardContent.vue';
    import OkPostSkeleton from '~/components/skeletons/post/OkPostSkeleton.vue';

    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IUserService } from '~/services/user/IUserService';

    @Component({
        name: 'OkUserHoverCard',
        components: { OkUserHoverCardContent, OkPostSkeleton }
    })
    export default class OkUserHoverCard extends Vue {
        @Prop(String) private readonly username;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private user: IUser | null = null;

        mounted() {
            this.userService.getUser({ userUsername: this.username })
                .then(user => {
                    this.user = user;
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
