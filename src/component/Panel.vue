<template>
    <div class="outer_bounds" v-on:click="click_panel" v-if="this.open != true" :style="{top: pos_y + 'px', left: pos_x + 'px'}">
        <div class="inner_bounds">
        </div>
    </div>
    <div class="back_bounds" v-else :style="{top: pos_y + 'px', left: pos_x + 'px'}">
        {{ panel_text() }}
    </div>
</template>

<script>
import PanelConst from "../javascript/Const/panel_const"
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
        around_bomb_num: {
            type: Number,
            default: 0,
            required: true
        }
    },
    methods: {
        /**
         * パネル押下時の動作
         */
        click_panel() {
            console.log("START click_panel");
            this.open = true;
            console.log("END click_panel");
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
            console.log("END panel_text");
            return this.around_bomb_num;
        }
    },
    computed: {
        /**
         * X座標
         */
        pos_x() {
            return this.column * PanelConst.panel_width;
        },
        /**
         * Y座標
         */
        pos_y() {
            return this.row * PanelConst.panel_height;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../css/PanelStyle.scss";

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
}
</style>