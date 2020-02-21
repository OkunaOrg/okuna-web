<template>
    <text-highlight :queries="textHighlightQueries" :highlight-class="highlightClass">Hello #Everyone @this is a c/test https://www.google.com</text-highlight>
</template>

<style lang="scss" scoped>


</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import HashtagMatcher from "~/lib/matchers/HashtagMatcher";
    import UsernameMatcher from "~/lib/matchers/UsernameMatcher";
    import UrlMatcher from "~/lib/matchers/UrlMatcher";
    import CommunitynameMatcher from "~/lib/matchers/CommunityNameMatcher";

    @Component({
        name: "OkSmartText",
    })
    export default class extends Vue {

        @Prop(String) readonly text: string;


        textHighlightQueries = [
            HashtagMatcher,
            UsernameMatcher,
            UrlMatcher,
            CommunitynameMatcher
        ];

        highlightClass = 'has-text-weight-bold';


    }
</script>
