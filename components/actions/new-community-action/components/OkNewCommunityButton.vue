<template>
    <button
        class="button is-rounded is-fullwidth has-text-weight-bold justify-center align-items-center ok-new-community-button is-paddingless ok-has-background-accent-gradient"
        :style="{ color: 'white' }"
        @click="onButtonClicked"
    >
        <ok-plus-icon class="is-icon-2n5x"></ok-plus-icon>
        <span class="has-padding-left-10 is-hidden">{{$t('global.snippets.create_community')}}</span>
    </button>
</template>

<style lang="scss">
    .ok-new-community-button {
        height: 4rem !important;
        width: 4rem !important;
    }
</style>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator'
    import { TYPES } from '~/services/inversify-types';
    import { okunaContainer } from '~/services/inversify';
    import { IModalService } from '~/services/modal/IModalService';

    @Component({
        name: 'OkNewCommunityButton',
        components: {}
    })
    export default class OkNewCommunityButton extends Vue {
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        async onButtonClicked() {
            await this.modalService.openCreateCommunityModal({
                images: {
                    avatarUrl: '',
                    avatarBlob: null,
                    coverUrl: '',
                    coverBlob: null
                }
            });
        }
    }
</script>
