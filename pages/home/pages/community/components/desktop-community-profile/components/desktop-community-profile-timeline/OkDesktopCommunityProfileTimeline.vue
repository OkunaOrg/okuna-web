<template>
    <div>
        <ok-community-posts-stream
                :community="community"
                post-container-class="has-padding-bottom-30"
        ></ok-community-posts-stream>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkCommunityPostsStream from "~/components/posts-stream/community-posts/OkCommunityPostsStream.vue";

    @Component({
        name: "OkDesktopCommunityProfileTimeline",
        components: {
            OkCommunityPostsStream,
        }
    })
    export default class OkDesktopCommunityProfileTimeline extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;
    }
</script>



