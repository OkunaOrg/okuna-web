<template>
    <div class="has-padding-right-10 has-padding-left-10 has-width-100-percent">
        <div class="field has-width-100-percent">
            <label for="search" class="label has-text-left ok-has-text-primary-invert-80 is-hidden">
                Search
            </label>
            <div class="control has-icons-left ok-header-search-bar"
                 v-bind:class="{ 'ok-header-search-bar-unfocused': !isInputFocused}">
                <input type="text" placeholder="Search"
                       class="input is-rounded is-normal ok-input"
                       required
                       id="search"
                       @focus="isInputFocused = true"
                       @blur="isInputFocused = false"
                >
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

    .ok-header-search-bar {

        &-unfocused {
            input {
                text-align: center !important;
            }

            .icon.is-left {
                left: 13.7rem !important;
                bottom: 1.2rem;
            }

        }
    }


</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkHeaderSearchBar",
    })
    export default class extends Vue {

        isInputFocused = false;

    }
</script>