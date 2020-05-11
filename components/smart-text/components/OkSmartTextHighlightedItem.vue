<template>
    <mark @click="onClicked" class="has-text-weight-bold ok-has-text-accent has-cursor-pointer">
        <nuxt-link :to="highlightedItemUrl" v-if="highlightedItemType !== OkSmartTextHighlightedItemType.url"
                   class="has-no-hover-text-decoration has-no-hover-text-color">
            <slot></slot>
        </nuxt-link>
        <a :href="highlightedItemUrl" v-else rel="noopener noreferrer" target="_blank"
           class="has-no-hover-text-decoration has-no-hover-text-color">
            <slot></slot>
        </a>
    </mark>
</template>
<style lang="scss">

    .text__highlight {
        background: none !important;
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { OkSmartTextHighlightedItemType } from "~/components/smart-text/lib/SmartTextHighlightedItemType";

    @Component({
        name: "OkSmartTextHighlightedItem",
    })
    export default class extends Vue {

        @Prop(String) readonly text: string;
        @Prop(Number) readonly index: number;

        OkSmartTextHighlightedItemType = OkSmartTextHighlightedItemType;

        mounted() {
        }

        get trimmedHighlightedItemText(){
            return this.text.trim();
        }

        get highlightedItemType(): OkSmartTextHighlightedItemType {
            if (this.trimmedHighlightedItemText.startsWith("#")) {
                return OkSmartTextHighlightedItemType.hashtag;
            } else if (this.trimmedHighlightedItemText.startsWith("c/") || this.trimmedHighlightedItemText.startsWith("/c/")) {
                return OkSmartTextHighlightedItemType.communityName;
            } else if (this.trimmedHighlightedItemText.startsWith("@")) {
                return OkSmartTextHighlightedItemType.username;
            } else {
                return OkSmartTextHighlightedItemType.url;
            }
        }

        get highlightedItemTextValue(): string {
            switch (this.highlightedItemType) {
                case OkSmartTextHighlightedItemType.hashtag:
                case OkSmartTextHighlightedItemType.username:
                    return this.trimmedHighlightedItemText.substring(1);
                case OkSmartTextHighlightedItemType.communityName:
                    if(this.trimmedHighlightedItemText.startsWith('c/')) return this.trimmedHighlightedItemText.substring(2);
                    return this.trimmedHighlightedItemText.substring(3);
                case OkSmartTextHighlightedItemType.url:
                    return this.trimmedHighlightedItemText;
            }
        }

        get highlightedItemUrl() {

            const textValue = this.highlightedItemTextValue;

            switch (this.highlightedItemType) {
                case OkSmartTextHighlightedItemType.hashtag:
                    return `/h/${textValue}`;
                case OkSmartTextHighlightedItemType.communityName:
                    return `/c/${textValue}`;
                case OkSmartTextHighlightedItemType.username:
                    return `/${textValue}`;
                case OkSmartTextHighlightedItemType.url:
                    return textValue;
            }
        }


        onClicked() {
            if (this.text.startsWith("#")) {
                this.$emit("onHashtagPressed", this.highlightedItemTextValue);
            } else if (this.text.startsWith("c/")) {
                this.$emit("onCommunityNamePressed", this.highlightedItemTextValue);
            } else if (this.text.startsWith("@")) {
                this.$emit("onUsernamePressed", this.highlightedItemTextValue);
            } else {
                this.$emit("onUrlPressed", this.highlightedItemTextValue);
            }
        }


    }
</script>
