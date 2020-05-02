<template>
    <div class="columns is-mobile is-multiline is-variable is-1 is-marginless">
        <div class="column is-narrow">
            <button
                    class="button is-rounded ok-has-background-primary-highlight is-borderless"
            >
                <ok-staff-icon class="ok-svg-icon-primary-invert-60" style="top: -3px"></ok-staff-icon>
                <span class="has-padding-left-10 has-padding-right-10">
                            Staff
                        </span>
            </button>
        </div>
        <div class="column is-narrow">
            <button
                    class="button is-rounded ok-has-background-primary-highlight is-borderless"
            >
                <ok-rules-icon class="ok-svg-icon-primary-invert-60" style="top: -3px"></ok-rules-icon>
                <span class="has-padding-left-10 has-padding-right-10">
                            Rules
                        </span>
            </button>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";

    @Component({
        name: "OkCommunityProfileInfoButtons",
    })
    export default class OkCommunityProfileInfoButtons extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

    }
</script>



