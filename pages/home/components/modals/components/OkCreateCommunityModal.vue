<template>
    <div class="is-flex justify-center align-items-center">
        <ok-create-community-form
            class="ok-wide-modal"
            :communityStub="params && params.communityStub"
            :images="params && params.images"
            @onComplete="onComplete"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkCreateCommunityForm from '~/components/forms/OkCreateCommunityForm.vue';
    import { CreateCommunityModalParams } from '~/services/modal/IModalService';

    @Component({
        name: 'OkCreateCommunityModal',
        components: { OkCreateCommunityForm }
    })
    export default class OkCreateCommunityModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        @Prop({
            type: Object,
            required: false
        }) readonly params: CreateCommunityModalParams;

        onComplete() {
            this.$parent['close']();
        }
    }
</script>
