<template>
    <section>
        <scroller
                :on-refresh="refresh"
                :on-infinite="infinite">
            <div v-for="(post, index) in posts" :class="{'grey-bg': index % 2 == 0}">
                {{ post }}
            </div>
        </scroller>
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";

    @Component({})
    export default class extends Vue {
        $route!: Route;

        posts = [];
        top: number;
        bottom: number;


        mounted() {
            for (var i = 1; i <= 20; i++) {
                this.posts.push(i + ' - keep walking, be 2 with you.');
            }
            this.top = 1;
            this.bottom = 20;
        }

        refresh(done) {
            var self = this;
            setTimeout(function () {
                var start = self.top - 1;
                for (var i = start; i > start - 10; i--) {
                    self.posts.splice(0, 0, i + " - keep walking, be 2 with you.");
                }
                self.top = self.top - 10;
                done();
            }, 1500)
        }


        infinite(done) {
            var self = this;
            setTimeout(function () {
                var start = self.bottom + 1;
                for (var i = start; i < start + 10; i++) {
                    self.posts.push(i + " - keep walking, be 2 with you.");
                }
                self.bottom = self.bottom + 10;
                done();
            }, 1500)
        }


    }
</script>



