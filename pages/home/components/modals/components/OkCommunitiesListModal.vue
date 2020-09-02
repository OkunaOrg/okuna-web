<template>
    <div class="has-height-100-percent ok-has-background-primary is-semi-rounded has-overflow-hidden">
        <div class="box ok-has-background-primary-highlight has-height-100-percent has-overflow-scroll">
            <div class="has-padding-bottom-30" v-if="params.title">
                <h2 class="title ok-has-text-primary-invert">
                    {{ params.title }}
                </h2>
            </div>
            <div>
                <ok-http-list
                        v-if="environmentResolution"
                        :refresher="params.refresher"
                        :list-type="(environmentResolution === EnvironmentResolution.desktop ? 'community' : 'community-mobile')"
                        :on-scroll-loader="params.onScrollLoader"
                        :show-no-more="false"
                        :items-container-class="'columns is-multiline'" :item-class="'column is-4-tablet is-3-desktop is-paddingless'">
                    <nuxt-link slot-scope="props" :to="'/c/' + props.item.name">
                        <div
                                v-if="environmentResolution === EnvironmentResolution.desktop"
                                class="has-padding-10"
                        >
                            <ok-community-card
                                    :community="props.item"></ok-community-card>
                        </div>
                        <div class="has-padding-bottom-10 has-padding-left-10 has-padding-right-10" v-else>
                            <ok-community-tile :community="props.item"></ok-community-tile>
                        </div>
                    </nuxt-link>
                </ok-http-list>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { HttpListModalParams } from "~/services/modal/IModalService";
    import OkHttpList from "~/components/http-list/OkHttpList.vue";
    import OkCommunityCard from "~/components/cards/community-card/OkCommunityCard.vue";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import OkCommunityTile from "~/components/tiles/OkCommunityTile.vue";

    @Component({
        name: "OkCommunitiesListModal",
        components: {OkCommunityTile, OkCommunityCard, OkHttpList},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkCommunitiesListModal<T> extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: HttpListModalParams<T>;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;


        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);


    }
</script>
