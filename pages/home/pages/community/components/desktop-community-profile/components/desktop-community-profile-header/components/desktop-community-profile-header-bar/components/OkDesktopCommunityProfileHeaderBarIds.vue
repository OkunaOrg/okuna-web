<template>
    <div class="ok-has-text-primary-invert">
        <div class="is-size-5 has-text-weight-bold is-flex align-center">
            {{community.title}}
        </div>
        <div class="is-size-6 has-text-weight-bold is-flex align-center">
            c/{{community.name}}
        </div>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";

    @Component({
        name: "OkDesktopCommunityProfileHeaderBarIds",
    })
    export default class OkDesktopCommunityProfileHeaderBarIds extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


    }
</script>



