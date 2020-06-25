<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkResizableTextArea",
    })
    export default class OkResizableTextArea extends Vue {

        @Prop({
            type: Number,
            default: 125
        }) readonly maxHeight: number;

        styleAdded = false;


        beforeDestroy() {
            this.$el.removeEventListener("input", this.resizeTextarea)
        }

        render() {
            return this.$slots.default[0]
        }

        mounted() {
            this.$el.addEventListener("input", this.resizeTextarea);

            this.$nextTick(() => {
                this.addStyleAttribute();
            })
            // ...
        }

        addStyleAttribute() {
            this.$el.setAttribute("style", "height:" + (this.$el.scrollHeight) + "px;overflow-y:auto; resize: none !important;")
            this.styleAdded = true;
        }

        removeStyleAttribute() {
            this.$el.setAttribute("style", "resize: none !important;");
            this.styleAdded = false;
        }

        resizeTextarea(event) {
            if (!event.target.value) {
                this.removeStyleAttribute();
                return;
            }

            if (!this.styleAdded) this.addStyleAttribute();

            if (event.target.scrollHeight > 50 && event.target.scrollHeight <= this.maxHeight) {
                event.target.style.height = "auto";
                event.target.style.height = (event.target.scrollHeight) + "px";
            }

        }


    }
</script>
