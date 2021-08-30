<template>
    <article>
        <ok-circle-tile :circle="circle">
            <template slot="trailing" v-if="!isConnectionsCircle">
                <button
                    class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold has-padding-10 is-size-7"
                    @click.prevent="onWantsToDeleteCircle"
                >Delete</button>
            </template>
        </ok-circle-tile>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { ICircle } from '~/models/connections/circle/ICircle';
    import OkCircleTile from '~/components/tiles/OkCircleTile.vue';

    @Component({
        name: 'OkCircleListItem',
        components: {OkCircleTile}
    })
    export default class OkCircleListItem extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly circle: ICircle;

        @Prop({
            type: Boolean,
            required: true
        }) readonly isConnectionsCircle: boolean;

        @Prop({
            type: Boolean,
            required: false,
            default: false
        }) readonly isButtonDisabled: boolean;

        onWantsToDeleteCircle() {
            this.$emit('deleteButtonClicked', this.circle);
        }
    }
</script>
