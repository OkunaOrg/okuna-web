<template>
    <div class="columns is-multiline is-variable is-1 is-mobile">
        <div class="column is-narrow" v-for="category in community.categories">
            <ok-category-button :category="category"></ok-category-button>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";
    import { ICommunity } from '~/models/communities/community/ICommunity';
    import OkCategoryButton from '~/components/buttons/OkCategoryButton.vue';

    @Component({
        name: "OkCommunityProfileCategories",
        components: {OkCategoryButton, OkSmartText},
    })
    export default class OkCommunityProfileCategories extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


    }
</script>



