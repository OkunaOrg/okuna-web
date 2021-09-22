<template>
    <div class="is-flex justify-center align-items-center">
        <ok-circles class="ok-generic-modal"></ok-circles>
    </div>
</template>

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
