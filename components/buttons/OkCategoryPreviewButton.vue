<template>
    <ok-fat-button :text="category.title" :background-image-src="category.avatar" :text-background-color="category.color"
                     :text-color="category.colorInvert"></ok-fat-button>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICategory } from "~/models/common/category/ICategory";
    import OkFatButton from '~/components/buttons/OkFatButton.vue';

    @Component({
        name: "OkCategoryPreviewButton",
        components: {OkFatButton},
    })
    export default class OkCategoryPreviewButton extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly category: ICategory;

    }
</script>
