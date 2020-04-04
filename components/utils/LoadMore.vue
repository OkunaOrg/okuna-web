<template>
    <div class="ok-loadmore">
        <div class="ok-loadmore-content" :class="{ 'is-dropped': topDropped || bottomDropped}"
             :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">
            <slot name="top">
                <div class="ok-loadmore-top" v-if="topMethod">
                    <spinner v-if="topStatus === 'loading'" class="ok-loadmore-spinner" :size="20"
                             type="fading-circle"></spinner>
                    <span class="ok-loadmore-text">{{ topText }}</span>
                </div>
            </slot>
            <slot></slot>
            <slot name="bottom">
                <div class="ok-loadmore-bottom" v-if="bottomMethod">
                    <spinner v-if="bottomStatus === 'loading'" class="ok-loadmore-spinner" :size="20"
                             type="fading-circle"></spinner>
                    <span class="ok-loadmore-text">{{ bottomText }}</span>
                </div>
            </slot>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-loadmore {
        overflow: hidden;

        &-content {
            .is-dropped {
                transition: .2s;
            }
        }

        &-top, &-bottom {
            text-align: center;
            height: 50px;
            line-height: 50px;
        }

        &-top {
            margin-top: -50px;
        }

        &-bottom {
            margin-bottom: -50px;
        }

        &-spinner {
            display: inline-block;
            margin-right: 5px;
            vertical-align: middle;
        }

        &-text {
            vertical-align: middle;
        }
    }

</style>

<script lang="ts">
    /**
     * Taken originally from https://github.com/mint-ui/mint-loadmore#readme, converted into TS, fixed issues.
     * Original license follows:
     * The MIT License (MIT)
     * Copyright (c) 2016 杨奕
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */


    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"

    @Component({
        name: "OkLoadMore",
    })
    export default class OkLoadMore extends Vue {
        @Prop({
            type: Number,
            default: 0
        },) maxDistance: number;

        @Prop({
            type: Boolean,
            default: false
        },) autoFill: boolean;

        @Prop({
            type: Number,
            default: 2
        },) distanceIndex: number;

        @Prop({
            type: String,
            default: "下拉刷新"
        },) topPullText: string;

        @Prop({
            type: String,
            default: "释放更新"
        },) topDropText: string;

        @Prop({
            type: String,
            default: "加载中..."
        },) topLoadingText: string;

        @Prop({
            type: Number,
            default: 70
        },) topDistance: number;

        @Prop({
            type: Function
        }) topMethod: Function;

        @Prop({
            type: String,
            default: "上拉刷新"
        },) bottomPullText: string;

        @Prop({
            type: String,
            default: "释放更新"
        },) bottomDropText: string;

        @Prop({
            type: String,
            default: "加载中..."
        },) bottomLoadingText: string;

        @Prop({
            type: Number,
            default: 70
        },) bottomDistance: number;

        @Prop({
            type: Function
        }) bottomMethod: Function;

        @Prop({
            type: Boolean,
            default: false
        },) bottomAllLoaded: boolean;

        uuid: string = null;
        translate: number = 0;
        scrollEventTarget: any = null;
        containerFilled: boolean = false;
        topText: string = "";
        topDropped: boolean = false;
        bottomText: string = "";
        bottomDropped: boolean = false;
        bottomReached: boolean = false;
        direction: string = "";
        startY: number = 0;
        startScrollTop: number = 0;
        currentY: number = 0;
        topStatus: string = "";
        bottomStatus: string = "";

        @Watch("topStatus")
        onTopStatusChanged(val: string, oldVal: number) {
            this.$emit("top-status-change", val);
            switch (val) {
                case "pull":
                    this.topText = this.topPullText;
                    break;
                case "drop":
                    this.topText = this.topDropText;
                    break;
                case "loading":
                    this.topText = this.topLoadingText;
                    break;
            }
        }

        @Watch("bottomStatus")
        onBottomStatusChanged(val: string) {
            this.$emit("bottom-status-change", val);
            switch (val) {
                case "pull":
                    this.bottomText = this.bottomPullText;
                    break;
                case "drop":
                    this.bottomText = this.bottomDropText;
                    break;
                case "loading":
                    this.bottomText = this.bottomLoadingText;
                    break;
            }
        }

        mounted() {
            this.uuid = Math.random().toString(36).substring(3, 8);
            this.init();
        }

        onTopLoaded(id) {
            if (id === this.uuid) {
                this.translate = 0;
                setTimeout(() => {
                    this.topStatus = "pull";
                }, 200);
            }
        }

        onBottomLoaded(id) {
            this.bottomStatus = "pull";
            this.bottomDropped = false;
            if (id === this.uuid) {
                this.$nextTick(() => {
                    if (this.scrollEventTarget === window) {
                        document.body.scrollTop += 50;
                    } else {
                        this.scrollEventTarget.scrollTop += 50;
                    }
                    this.translate = 0;
                });
            }
            if (!this.bottomAllLoaded && !this.containerFilled) {
                this.fillContainer();
            }
        }

        getScrollEventTarget(element) {
            let currentNode = element;
            while (currentNode && currentNode.tagName !== "HTML" &&
            currentNode.tagName !== "BODY" && currentNode.nodeType === 1) {
                let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                if (overflowY === "scroll" || overflowY === "auto") {
                    return currentNode;
                }
                currentNode = currentNode.parentNode;
            }
            return window;
        }

        getScrollTop(element) {
            if (element === window) {
                return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
            } else {
                return element.scrollTop;
            }
        }

        bindTouchEvents() {
            this.$el.addEventListener("touchstart", this.handleTouchStart);
            this.$el.addEventListener("touchmove", this.handleTouchMove);
            this.$el.addEventListener("touchend", this.handleTouchEnd);
        }

        init() {
            this.topStatus = "pull";
            this.bottomStatus = "pull";
            this.topText = this.topPullText;
            this.scrollEventTarget = this.getScrollEventTarget(this.$el);
            if (typeof this.bottomMethod === "function") {
                this.fillContainer();
                this.bindTouchEvents();
            }
            if (typeof this.topMethod === "function") {
                this.bindTouchEvents();
            }
        }

        fillContainer() {
            if (this.autoFill) {
                this.$nextTick(() => {
                    if (this.scrollEventTarget === window) {
                        this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                            document.documentElement.getBoundingClientRect().bottom;
                    } else {
                        this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                            this.scrollEventTarget.getBoundingClientRect().bottom;
                    }
                    if (!this.containerFilled) {
                        this.bottomStatus = "loading";
                        this.bottomMethod(this.uuid);
                    }
                });
            }
        }

        checkBottomReached() {
            if (this.scrollEventTarget === window) {
                return document.body.scrollTop + document.documentElement.clientHeight === document.body.scrollHeight;
            } else {
                return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom;
            }
        }

        handleTouchStart(event) {
            this.startY = event.touches[0].clientY;
            this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
            this.bottomReached = false;
            if (this.topStatus !== "loading") {
                this.topStatus = "pull";
                this.topDropped = false;
            }
            if (this.bottomStatus !== "loading") {
                this.bottomStatus = "pull";
                this.bottomDropped = false;
            }
        }

        handleTouchMove(event) {
            if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                return;
            }
            this.currentY = event.touches[0].clientY;
            let distance = (this.currentY - this.startY) / this.distanceIndex;
            this.direction = distance > 0 ? "down" : "up";
            if (typeof this.topMethod === "function" && this.direction === "down" &&
                this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== "loading") {
                event.preventDefault();
                event.stopPropagation();
                if (this.maxDistance > 0) {
                    this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
                } else {
                    this.translate = distance - this.startScrollTop;
                }
                if (this.translate < 0) {
                    this.translate = 0;
                }
                this.topStatus = this.translate >= this.topDistance ? "drop" : "pull";
            }
            if (this.direction === "up") {
                this.bottomReached = this.bottomReached || this.checkBottomReached();
            }
            if (typeof this.bottomMethod === "function" && this.direction === "up" &&
                this.bottomReached && this.bottomStatus !== "loading" && !this.bottomAllLoaded) {
                event.preventDefault();
                event.stopPropagation();
                if (this.maxDistance > 0) {
                    this.translate = Math.abs(distance) <= this.maxDistance
                        ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
                } else {
                    this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
                }
                if (this.translate > 0) {
                    this.translate = 0;
                }
                this.bottomStatus = -this.translate >= this.bottomDistance ? "drop" : "pull";
            }
        }

        handleTouchEnd() {
            if (this.direction === "down" && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
                this.topDropped = true;
                if (this.topStatus === "drop") {
                    this.translate = 50;
                    this.topStatus = "loading";
                    this.topMethod(this.uuid);
                } else {
                    this.translate = 0;
                    this.topStatus = "pull";
                }
            }
            if (this.direction === "up" && this.bottomReached && this.translate < 0) {
                this.bottomDropped = true;
                this.bottomReached = false;
                if (this.bottomStatus === "drop") {
                    this.translate = -50;
                    this.bottomStatus = "loading";
                    this.bottomMethod(this.uuid);
                } else {
                    this.translate = 0;
                    this.bottomStatus = "pull";
                }
            }
            this.direction = "";
        }


    }
</script>