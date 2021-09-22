<template>
    <div class="is-flex justify-center align-items-center">
        <ok-circle-details
            class="ok-generic-modal"
            :circle="params.circle"
            :isConnectionsCircle="params.isConnectionsCircle"
        ></ok-circle-details>
    </div>
</template>

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
