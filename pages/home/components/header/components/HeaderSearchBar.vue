<template>
    <div class="ok-header-search-bar">
        <popper
                :force-show="dropdownIsOpen"
                :visible-arrow="false"
                trigger="clickToOpen"
                :options="{
      placement: 'bottom',
      modifiers: { offset: { offset: '0,10px' } }
    }">
            <div
                    v-bind:style="{opacity: searchQuery ? 1 : 0, 'pointer-events': searchQuery ? 'auto': 'none' }"
                    class="popper ok-has-background-primary has-border-radius-10 ok-has-border-primary-highlight">
                <ok-search class="ok-header-search-dropdown"
                           :initial-search-query="searchQuery"
                           @onSearchItemClicked="onSearchItemClicked"
                           ref="okSearch">
                </ok-search>
            </div>

            <div slot="reference" class="has-padding-right-10 has-padding-left-10 has-width-100-percent is-relative">
                <div class="field has-width-100-percent">
                    <label for="search" class="label has-text-left ok-has-text-primary-invert-80 is-hidden">
                        Search
                    </label>
                    <div class="control has-icons-left ok-header-search-bar">
                        <input type="text" placeholder="Search"
                               class="input is-rounded is-normal ok-input has-text-centered"
                               required
                               autocomplete="off"
                               id="search"
                               @focus="onFocus"
                               v-model="searchQuery"
                        >
                    </div>
                </div>
            </div>
        </popper>

    </div>
</template>


<style lang="scss">

    .tooltip {
        top: 0;
    }

    .ok-header-search-bar {
        width: 100%;

        .v-popover, .trigger {
            width: 100%;
        }
    }

    .ok-header-search-dropdown {
        width: 400px;
        max-height: 530px;
        overflow-y: auto;
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

        searchQuery = "";

        $el: Element;

        $refs: {
            okSearch: OkSearch,
        };

        boundOnDomClicked: EventListener;

        mounted() {
            this.boundOnDomClicked = this.onDomClicked.bind(this);
            document.addEventListener("click", this.boundOnDomClicked);
        }

        beforeDestroy() {
            document.removeEventListener("click", this.boundOnDomClicked);
        }

        onDomClicked(event) {
            const isClickInside = this.$el.contains(event.target);

            if (!isClickInside) {
                this.dropdownIsOpen = false;
            }
        }

        onFocus(event) {
            if (this.searchQuery) {
                this.dropdownIsOpen = true;
            }
        }

        onSearchItemClicked(searchItem: any) {
            this.dropdownIsOpen = false;
        }

        @Watch("searchQuery")
        onSearchQueryChanged(val: string, oldVal: string) {
            if (val) {
                this.dropdownIsOpen = true;
                this.$refs.okSearch.searchWithQuery(val);
            } else {
                this.$refs.okSearch.clearSearch();
            }
        }
    }
</script>
