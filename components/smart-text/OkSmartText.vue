<template>
    <text-highlight class="has-preserved-whitespace"
            :queries="textHighlightQueries"
            :highlightComponent="customTextHighlightItem"
            @onHashtagPressed="onHashtagPressed"
            @onUsernamePressed="onUsernamePressed"
            @onCommunityNamePressed="onCommunityNamePressed"
            @onUrlPressed="onUrlPressed"
    >{{text}}</text-highlight>
</template>

<style lang="scss" scoped>


</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import HashtagMatcher from "~/lib/matchers/HashtagMatcher";
    import UsernameMatcher from "~/lib/matchers/UsernameMatcher";
    import UrlMatcher from "~/lib/matchers/UrlMatcher";
    import CommunitynameMatcher from "~/lib/matchers/CommunityNameMatcher";
    import OkSmartTextHighlightedItem from "~/components/smart-text/components/OkSmartTextHighlightedItem.vue";

    @Component({
        name: "OkSmartText",
    })
    export default class extends Vue {

        @Prop(String) readonly text: string;

        customTextHighlightItem = OkSmartTextHighlightedItem;

        textHighlightQueries = [
            HashtagMatcher,
            UsernameMatcher,
            UrlMatcher,
            CommunitynameMatcher
        ];

        onUrlPressed(url: string) {
            console.log("You pressed url", url);
        }

        onUsernamePressed(username: string) {
            console.log("You pressed username", username);
        }


        onHashtagPressed(hashtag: string) {
            console.log("You pressed hashtag", hashtag);
        }

        onCommunityNamePressed(communityName: string) {
            console.log("You pressed communityName", communityName);
        }
    }
</script>
