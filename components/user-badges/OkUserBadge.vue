<template>
    <div class="ok-user-badge" :class="badgeClasses" :title="badge.keywordDescription">
        <ok-badge-icon :title="badge.keywordDescription"></ok-badge-icon>
    </div>
</template>

<style lang="scss" scoped>
    .ok-user-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        color: #fff;
        margin: 0 0.4em;

        svg {
            bottom: 0;
        }
    }

    .ok-verified-badge {
        background: #64b5f6;
        background: linear-gradient(to bottom right, #64b5f6 20%, #448aff 60%, #1565c0 80%);
    }

    .ok-angel-badge {
        background: #e91e63;
        background: linear-gradient(to bottom right, #e91e63 10%, #ff80ab 30%, #e91e63 80%);
    }

    .ok-founder-badge {
        background: #81c784;
        background: linear-gradient(to bottom right, #81c784 10%, #64dd17 20%, #ffee58 50%, #fbc02d 80%, #ffa726 90%);
    }

    .ok-golden-founder-badge {
        background: #ffea00;
        background: linear-gradient(to bottom right, #ffea00 10%, #fbc02d 30%, #f9a825 80%);
    }

    .ok-diamond-founder-badge {
        background: #ffcdd2;
        background: linear-gradient(to bottom right, #ffcdd2 20%, #ff8a80 60%, #e57373 80%);
    }

    .ok-super-founder-badge {
        background: #b39ddb;
        background: linear-gradient(to bottom right, #b39ddb 10%, #d1c4e9 50%, #90caf9 80%);
    }

    .ok-extra-small-badge {
        width: 10px;
        height: 10px;
        font-size: 8px;
    }

    .ok-small-badge {
        width: 15px;
        height: 15px;
        font-size: 12px;
    }

    .ok-medium-badge {
        width: 25px;
        height: 25px;
        font-size: 18px;
    }

    .ok-large-badge {
        width: 45px;
        height: 45px;
        font-size: 28px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { IBadge } from '~/models/common/badge/IBadge';
    import { BadgeKeyword } from '~/models/common/badge/lib/BadgeKeyword';
    import { OkUserBadgeSize } from './lib/OkUserBadgeSize';

    @Component({
        name: "OkUserBadge"
    })
    export default class OkUserBadge extends Vue {
        @Prop({ type: Number, default: OkUserBadgeSize.medium }) readonly size: OkUserBadgeSize;
        @Prop({ type: Object, required: true }) readonly badge: IBadge;

        get badgeClasses() {
            let backgroundClass;
            let sizeClass;

            switch (this.size) {
                case OkUserBadgeSize.extraSmall:
                    sizeClass = 'ok-extra-small-badge';
                    break;
                case OkUserBadgeSize.small:
                    sizeClass = 'ok-small-badge';
                    break;
                case OkUserBadgeSize.medium:
                    sizeClass = 'ok-medium-badge';
                    break
                case OkUserBadgeSize.large:
                    sizeClass = 'ok-large-badge';
                    break;
            }

            switch (this.badge.keyword) {
                case BadgeKeyword.verified:
                    backgroundClass = 'ok-verified-badge';
                    break;
                case BadgeKeyword.angel:
                    backgroundClass = 'ok-angel-badge';
                    break;
                case BadgeKeyword.founder:
                    backgroundClass = 'ok-founder-badge';
                    break;
                case BadgeKeyword.golden_founder:
                    backgroundClass = 'ok-golden-founder-badge';
                    break;
                case BadgeKeyword.diamond_founder:
                    backgroundClass = 'ok-diamond-founder-badge';
                    break;
                case BadgeKeyword.super_founder:
                    backgroundClass = 'ok-super-founder-badge';
                    break;
            }

            return [ backgroundClass, sizeClass ];
        }
    }
</script>
