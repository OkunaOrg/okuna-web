<template>
    <ok-image-cover
        v-if="environmentResolution"
        :cover-url="coverUrl"
        :cover-size="environmentResolution === EnvironmentResolution.desktop ? OkCoverSize.medium : OkCoverSize.large"
    ></ok-image-cover>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkImageCover from '~/components/covers/image-cover/OkImageCover.vue';
    import { OkCoverSize } from '~/components/covers/lib/OkCoverSize';
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";

    @Component({
        name: "OkPostLinkPreviewCover",
        components: {OkImageCover},
        subscriptions: function() {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            };
        }
    })
    export default class OkPostLinkPreviewCover extends Vue {
        @Prop({
            type: String,
            default: ''
        }) readonly coverUrl: string;

        OkCoverSize = OkCoverSize;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;

        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
    }
</script>
