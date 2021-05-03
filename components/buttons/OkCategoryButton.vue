<template>
    <button v-if="activeTheme"
            :disabled="requestInProgress"
            class="button has-text-weight-bol is-small is-borderless is-semi-rounded"
            :style="buttonCssStyle"
            @click="handleButtonClick"
    >
        {{ category.title.toLowerCase() }}
    </button>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { ICategory } from "~/models/common/category/ICategory";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { IThemeService } from "~/services/theme/IThemeService";

    @Component({
        name: "OkCategoryButton",
        components: {},
        subscriptions: function () {
            return {
                activeTheme: this["themeService"].activeTheme
            }
        }
    })
    export default class OkCategoryButton extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly category: ICategory;

        @Prop({
            type: Boolean,
            default: false
        }) readonly faint: boolean;


        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>
        };


        requestInProgress = false;

        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);


        get buttonCssStyle() {

            const activeTheme = this.$observables.activeTheme.value;
            const themeColorIsCommunityColor = this.category.color.hex() === activeTheme.primaryColor.hex();

            return {
                "backgroundColor": themeColorIsCommunityColor ? activeTheme.primaryHighlightColor.hsl().string() : this.category.color.hex(),
                "color": themeColorIsCommunityColor ? activeTheme.primaryInvertColor.hex() : this.category.colorInvert.hex(),
                "opacity": this.faint ? 0.5 : undefined
            };
        }

        handleButtonClick(e: Event) {
            e.preventDefault();
            this.$emit('categoryClick', this.category);
        }


    }
</script>
