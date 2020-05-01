<template>
    <div class="card ok-has-background-primary">
        <div :class="{'ok-has-border-bottom-primary-highlight': community.description}">
            <p class="menu-label ok-has-text-primary-invert-80 has-padding-left-20 has-padding-right-20 has-padding-top-20 is-marginless">
                {{$t('global.keywords.about')}}
            </p>
            <div v-if="community.description" class="content ok-has-text-primary-invert has-padding-top-10 has-padding-right-20 has-padding-left-20 has-padding-bottom-20">
                <ok-smart-text :text="community.description"></ok-smart-text>
            </div>
        </div>
        <div class="card-content">
            <div class="columns is-mobile is-multiline is-variable is-3 is-marginless">
                <div class="column is-narrow">
                    <ok-community-profile-visibility :community="community"></ok-community-profile-visibility>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkSmartText from '~/components/smart-text/OkSmartText.vue';
    import OkCommunityProfileVisibility from '~/pages/home/pages/community/components/shared/OkCommunityProfileVisibility.vue';

    @Component({
        name: "OkDesktopCommunityProfileSidebarDetails",
        components: {OkCommunityProfileVisibility, OkSmartText},
    })
    export default class OkDesktopCommunityProfileSidebarDetails extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


    }
</script>



