<template>
    <div class="card ok-has-background-primary-highlight has-overflow-hidden">
        <div class="card-header">
            <div class="columns is-gapless is-marginless has-padding-20 flex-direction-column has-width-100-percent">
                <div class="column has-margin-bottom-5">
                    <b-skeleton width="30%"></b-skeleton>
                </div>
                <div class="column has-margin-bottom-5">
                    <b-skeleton width="80%"></b-skeleton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    @Component({
        name: "OkPostLinkPreviewSkeleton",
        components: {}
    })
    export default class OkPostLinkPreviewSkeleton extends Vue {}
</script>
