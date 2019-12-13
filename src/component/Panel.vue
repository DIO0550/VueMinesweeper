<template>
    <div class="outer_bounds" v-on:click="clickPanel" v-if="this.open != true" :style="{top: pos_y + 'px', left: pos_x + 'px'}">
        <div class="inner_bounds">
        </div>
    </div>
    <div class="back_bounds" v-else :style="{top: pos_y + 'px', left: pos_x + 'px'}">
        {{ panel_text() }}
    </div>
</template>

<script>

import panel_const from "../javascript/Const/PanelConst"
export default {
    data() {
        return {
            // めくれているか 
            open: false,
        }
    },
    props: {
        // 行
        row: {
            type: Number,
            default: 0,
            required: true
        },
        // 列
        column: {
            type: Number,
            default: 0,
            required: true
        },
        // ボム
        bomb: {
            type: Boolean,
            default: false,
            required: true
        },
        // 周りのボムの数
        aroundBombNum: {
            type: Number,
            default: 0,
            required: true
        },
        // 自身の周りのパネルを開く
        aroundPanelOpen: {
            type: Function,
            name: "aroundPanelOpen",
            required: true
        },
        // パネルをめくった際の処理
        didOpenedPanel: {
            type: Function,
            name: "didOpenedPanel",
            required: true
        },
        // ボムをめくった際の処理
        didOpenBomb: {
            type: Function,
            name: "didOpenBomb",
            required: true
        }
    },
    methods: {
        /**
         * パネル押下時の動作
         */
        clickPanel() {
            console.log("START clickPanel");
            // めくれているなら、何もしない
            if (this.open) {
                console.log("END clickPanel");
                return;
            }
            this.open = true;
            if (this.bomb) {
                this.didOpenBomb()
                console.log("END clickPanel");
                return;
            }
            this.didOpenedPanel()
            if (this.aroundBombNum != 0) {
                console.log("END clickPanel");
                return;
            }

            // 周りにボムがなければ、ボムを再度開く
            this.aroundPanelOpen(this.row, this.column);
            console.log("END clickPanel");
        },
        /**
         * パネルに表示する文字
         */
        panel_text() {
            console.log("START panel_text");
            if (this.bomb) {
                console.log("END panel_text");
                return "💣"
            }
            const text = this.aroundBombNum == 0 ? "" : this.aroundBombNum;
            console.log("END panel_text");
            return text;
        },
    },
    computed: {
        /**
         * X座標
         */
        pos_x() {
            return this.column * panel_const.panel_width;
        },
        /**
         * Y座標
         */
        pos_y() {
            return this.row * panel_const.panel_height;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../css/panel_style.scss";

/**
 * 外枠
 */
.outer_bounds {
    background-color: darkgray;
    height: $height;
    width: $width;
    border: 2px solid black;
    box-sizing: border-box;
    position: absolute;
}
/** 
 * 内枠
 */
.inner_bounds {
    background-color: rgb(200, 200, 200);
    height: calc(#{ $height } - 10px);
    width: calc(#{ $width } - 10px);
    top: 3px;
    left: 3px;
    position: relative;
}
/** 
 * めくれた後
 */
.back_bounds {
    height: $height;
    width: $width;
    border: 2px solid black;
    box-sizing: border-box;
    position: absolute;
    font-size: $text_size;
    text-align: center;
    vertical-align: middle;
}
</style>