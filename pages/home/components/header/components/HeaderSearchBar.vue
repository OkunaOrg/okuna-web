<template>
    <div class="ok-header-search-bar">
        <v-popover offset="30"
                   placement="bottom-center"
                   :open.sync="dropdownIsOpen"
        >
            <!-- This will be the popover target (for the events and position) -->
            <div class="has-padding-right-10 has-padding-left-10 has-width-100-percent">
                <div class="field has-width-100-percent">
                    <label for="search" class="label has-text-left ok-has-text-primary-invert-80 is-hidden">
                        Search
                    </label>
                    <div class="control has-icons-left ok-header-search-bar"
                         v-bind:class="{ 'ok-header-search-bar-unfocused': !isInputFocused}">
                        <input type="text" placeholder="Search"
                               class="input is-rounded is-normal ok-input has-text-centered"
                               required
                               id="search"
                               @focus="isInputFocused = true"
                               @blur="isInputFocused = false"
                               v-model.lazy="searchQuery" v-debounce="1000"
                        >
                    </div>
                </div>
            </div>
            <!-- This will be the content of the popover -->
            <div slot="popover" class="ok-has-background-primary has-border-radius-10 ok-has-border-primary-highlight">
                <ok-search class="ok-header-search-dropdown" style="height: 530px; width:400px;"
                           :initial-search-query="searchQuery"
                           ref="okSearch"></ok-search>
            </div>
        </v-popover>
    </div>
</template>


<style lang="scss">

    .ok-header-search-bar {
        width: 100%;

        .v-popover, .trigger {
            width: 100%;
        }
    }

    .ok-header-search-dropdown {
        width: 400px;
        height: 530px;
        overflow-y: scroll;
        overscroll-behavior-y: none;
    }


</style>


<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import OkSearch from "~/components/search/OkSearch.vue";

    @Component({
        name: "OkHeaderSearchBar",
        components: {OkSearch},
    })
    export default class extends Vue {

        dropdownIsOpen = false;
        isInputFocused = false;

        searchQuery = "";

        $refs: {
            okSearch: OkSearch,
        };

        @Watch("searchQuery")
        onChildChanged(val: string, oldVal: string) {
            if (val) this.$refs.okSearch.searchWithQuery(val);
        }
    }
</script>