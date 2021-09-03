<template>
    <div class="is-flex justify-center align-items-center">
        <ok-circles class="ok-circles-modal"></ok-circles>
    </div>
</template>

<style lang="scss" scoped>
    .ok-circles-modal {
        width: 460px;

        @media only screen and ( max-width: 460px ) {
            width: 95vw;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { CirclesModalParams } from '~/services/modal/IModalService';
    import OkCircles from '~/components/circles/OkCircles.vue';

    @Component({
        name: 'OkCirclesModal',
        components: {OkCircles}
    })
    export default class OkCirclesModal extends Vue {
        @Prop({
            type: Object,
            required: false
        }) readonly params: CirclesModalParams;
    }
</script>
