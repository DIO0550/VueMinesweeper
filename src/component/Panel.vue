<template>
    <div class="outer_bounds" v-on:click="click_panel()" v-if="$data.open != true" :style="{top: pos_y + 'px', left: pos_x + 'px'}">
        <div class="inner_bounds">
        </div>
    </div>
    <div v-else>
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
        }
    },
    methods: {
        /**
         * パネル押下時の動作
         */
        click_panel() {
            console.log("START click_panel");
            this.$data.open = true;
            console.log("END click_panel");
        }
    },
    computed: {
        /**
         * X座標
         */
        pos_x() {
            console.log("START pos_x" + this.column);
            return this.column * PanelConst.panel_width;
        },
        /**
         * Y座標
         */
        pos_y() {
            console.log("START pos_y" + this.row);
            return this.row * PanelConst.panel_height;
        }

    }
}
</script>

<style lang="scss" scoped>
@import "../css/PanelStyle.scss";

.outer_bounds {
    background-color: darkgray;
    height: $height;
    width: $width;
    border: 2px solid black;
    box-sizing: border-box;
    position: absolute;
}

.inner_bounds {
    background-color: rgb(200, 200, 200);
    height: calc(#{ $height } - 10px);
    width: calc(#{ $width } - 10px);
    top: 3px;
    left: 3px;
    position: relative;
}
</style>