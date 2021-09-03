<template>
    <div class="is-flex justify-center align-items-center">
        <ok-circle-details
            class="ok-circle-details-modal"
            :circle="params.circle"
            :isConnectionsCircle="params.isConnectionsCircle"
        ></ok-circle-details>
    </div>
</template>

<style lang="scss" scoped>
    .ok-circle-details-modal {
        width: 460px;

        @media only screen and ( max-width: 460px ) {
            width: 95vw;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkCircleDetails from '~/components/circles/OkCircleDetails.vue';
    import { CircleDetailsModalParams } from '~/services/modal/IModalService';

    @Component({
        name: 'OkCircleDetailsModal',
        components: {OkCircleDetails}
    })
    export default class OkCircleDetailsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: CircleDetailsModalParams;
    }
</script>
