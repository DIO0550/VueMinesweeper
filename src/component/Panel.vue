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
        },
        // 自身の周りのパネルを開く
        around_panel_open: {
            type: Function,
            name: "around_panel_open",
            required: true
        },
        did_opened_panel: {
            type: Function,
            name: "did_opened_panel",
            required: true
        },
    },
    methods: {
        /**
         * パネル押下時の動作
         */
        click_panel() {
            console.log("START click_panel");
            // めくれているなら、何もしない
            if (this.open) {
                console.log("END click_panel");
                return;
            }
            this.open = true;
            if (this.bomb) {
                console.log("END click_panel");
                return;
            }
            this.did_opened_panel()
            if (this.around_bomb_num != 0) {
                console.log("END click_panel");
                return;
            }

            // 周りにボムがなければ、ボムを再度開く
            this.around_panel_open(this.row, this.column);
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
            const text = this.around_bomb_num == 0 ? "" : this.around_bomb_num;
            console.log("END panel_text");
            return text;
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