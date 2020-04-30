<template>
    <div>
        <ok-user-posts-stream
                :user="user"
                post-container-class="has-padding-bottom-30"
        ></ok-user-posts-stream>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserPostsStream from "~/components/posts-stream/OkUserPostsStream.vue";

    @Component({
        name: "OkDesktopUserProfileTimeline",
        components: {
            OkUserPostsStream,
        }
    })
    export default class OkDesktopUserProfileTimeline extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;
    }
</script>



