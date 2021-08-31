<template>
    <div class="field">
        <div
            class="ok-color-preview"
            :style="{ background: colorString }"
        ></div>

        <input type="color"
            ref="colorInput"
            class="ok-hidden-color-input"
            :id="id"
            v-model="colorString"
            @input="handleColorChange"
        />
    </div>
</template>

<style scoped>
    .ok-color-preview {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 100%;
        margin-right: 0.5em;
    }

    .ok-hidden-color-input {
        visibility: hidden;
        width: 0;
        height: 0;
        padding: 0;
        position: absolute;
        bottom: 0;
        left: 20px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import Color from 'color';

    @Component({
        name: 'OkColorSelector'
    })
    export default class OkColorSelector extends Vue {
        $refs!: {
            colorInput: HTMLInputElement;
        };

        @Prop({
            type: String,
            required: false,
            default: 'color'
        }) readonly id: string;

        @Prop({
            type: String,
            required: false
        }) readonly defaultColor: string;

        colorString: string = '#000';

        mounted() {
            this.colorString = this.defaultColor ?? this.generateRandomColor();
            this.handleColorChange();
        }

        private generateRandomColor(): string {
            const r = Math.floor(Math.random() * 0xFF);
            const g = Math.floor(Math.random() * 0xFF);
            const b = Math.floor(Math.random() * 0xFF);

            return Color.rgb(r, g, b).hex();
        }

        handleColorChange() {
            this.$emit('change', this.colorString);
        }

        click() {
            this.$refs.colorInput.click();
        }

        get(): string {
            return this.colorString;
        }

        set(color: string) {
            this.colorString = color;
        }
    }
</script>
