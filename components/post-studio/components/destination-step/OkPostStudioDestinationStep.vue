<template>
    <div class="ok-post-creator-content has-height-100-percent is-flex flex-direction-column">
        <ok-mobile-header>
            <template v-slot:leading>
                <div class="has-padding-10 has-cursor-pointer" @click="onWantsToGoToPreviousStep" role="button">
                    <ok-chevron-left-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-chevron-left-icon>
                </div>
            </template>
                <span class="ok-has-text-primary-invert has-text-weight-bold">
                    {{ $t('global.snippets.share_to')}}
                </span>
        </ok-mobile-header>
        <div class="is-paddingless is-marginless is-flex-1">
            <ok-tile :on-click="onWantsToSelectDestinationCircles">
                <template v-slot:leading>
                    <ok-circles-icon
                            class="ok-svg-icon-primary-invert"></ok-circles-icon>
                </template>

                <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{ $t('global.snippets.my_circles')}}
                            </span>
                </template>
            </ok-tile>
            <ok-tile :on-click="onWantsToSelectDestinationCommunity">
                <template v-slot:leading>
                    <ok-communities-icon
                            class="ok-svg-icon-primary-invert"></ok-communities-icon>
                </template>

                <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{ $t('global.snippets.a_community')}}
                            </span>
                </template>
            </ok-tile>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkTile from "~/components/tiles/OkTile.vue";

    @Component({
        name: "OkPostStudioDestinationStep",
        components: {
            OkTile,
            OkMobileHeader,
        },
    })
    export default class OkPostStudioDestinationStep extends Vue {
        onWantsToSelectDestinationCommunity(){
            this.$emit('onWantsToSelectDestinationCommunity');
        }

        onWantsToSelectDestinationCircles(){
            this.$emit('onWantsToSelectDestinationCircles');
        }

        onWantsToGoToPreviousStep(){
            this.$emit('onWantsToGoToPreviousStep');
        }


    }
</script>
