<template>
    <div class="game_bounds">
        <game_end_modal v-if="is_display_modal"/>
        <div class="info_block">
        残り：<div class="display" v-bind:class="ten_place"></div><div class="display" v-bind:class="one_place"></div>
        </div>
        <div class="panels" ref="panel_block" :style="{height: panels_height + 'px', width: panels_width + 'px', left: panel_left_mergin + 'px'}">
            <template v-for="i in number_of_row">
                <panel v-for="j in number_of_column" v-bind:key="number_of_column * (i - 1) + (j - 1)" 
                                    :row="(i - 1)" :column="(j - 1)" :bomb="is_bomb((i - 1), (j - 1))"
                                    :around_bomb_num="around_bomb_num((i - 1), (j - 1))"
                                    :around_panel_open="around_panel_open"
                                    :did_opened_panel="did_open_panel"
                                    :ref="'Panels'"/>
            </template>
        </div>
    </div>
</template>

<script>
/**
 * １マスパネル用
 */
import panel from './Panel';

/**
 * ゲーム終了時のモーダル
 */
import game_end_modal from './GameEndModal';

import panel_const from '../javascript/Const/panel_const';
import calc_util from '../javascript/Util/calc_util';

const left_mergin = 100;
const top_mergin = 100;
export default {
    data() {
        return {
            // 行
            number_of_row: panel_const.high_lebel.row,
            // 列
            number_of_column: panel_const.high_lebel.column,
            // ボムの位置
            bombs: new Map(),
            // 開く必要があるパネルの数
            need_open_panel: Math.max,
            // モーダルメッセージを表示するか
            is_display_modal: false,
            // パネルとの左の幅
            panel_left_mergin: 0,
            // パネルの幅
            panels_width: 0,
            // パネルの高さ
            panels_height: 0,

        }
    },
    components: {
        panel,
        game_end_modal
    },
    methods: {
        /**
         * ボムを生成する
         */
        create_bombs() {
            var panel_list = [];
            var panel_num = panel_const.high_lebel.row * panel_const.high_lebel.column;
            for (var i = 0;  i < panel_num; i++) {
                panel_list.push(i)
            }

            console.log(panel_list);

            var len = panel_list.length;
            //シャッフルアルゴリズム
            while (len) {
                var j = Math.floor( Math.random() * len );
                var t = panel_list[--len];
                panel_list[len] = panel_list[j];
                panel_list[j] = t;
            }

            for (var k = 0; k < panel_const.high_lebel.bomb_count; k++) {
                var number = panel_list[k]
                var column = number % panel_const.high_lebel.column;
                var row = Math.floor(number /  panel_const.high_lebel.column);
                console.log("column=" + column);
                console.log("row =" + row);
                this.bombs.set(number, {
                    column: column,
                    row: row
                });
            }
        },
        /**
         * 引数で受け取ったパネルがボム持ちか返す
         * @param row 行
         * @param column 列
         * @returns ボムかどうか 
         */
        is_bomb(row, column) {
            console.log("START is_bomb")
            var has_bomb = this.bombs.has(column + row * this.number_of_column)
            console.log("END is_bomb false")
            return has_bomb;
        },
        /**
         * 周りのボムの数を返す
         * @param row 行
         * @param column 列
         * @returns ボムの数 
         */
        around_bomb_num(row, column) {
            console.log("START around_bomb_num");
            var bomb_num = this.top_bomb_num(row, column);
            bomb_num += this.side_bomb_num(row, column);
            bomb_num += this.bottom_bomb_num(row, column);
            console.log("END around_bomb_num bomb_num =" + bomb_num);
            return bomb_num;
        },
        /**
         * 上側のボムの数を返す
         * @param row 行
         * @param column 列
         * @returns ボムの数 
         */
        top_bomb_num(row, column) {
            console.log("START around_bomb_num");
            var bomb_num = 0;
            for (var i = 0; i < 3; i++) {
                var check_row = row - 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.is_out_of_bounds(check_row, check_column)) {
                    continue;
                }
                if (this.is_bomb(check_row, check_column)) {
                    bomb_num++;
                }
            }
            console.log("END around_bomb_num");
            return bomb_num;
        },
        /**
         * 左右のボムの数を返す
         * @param row 行
         * @param column 列
         * @returns ボムの数 
         */
        side_bomb_num(row, column) {
            console.log("START side_bomb_num");
            var bomb_num = 0;
            for (var i = 0; i < 2; i++) {
                var check_column = column + ((i * 2) - 1);
                // 範囲外
                if (this.is_out_of_bounds(row, check_column)) {
                    continue;
                }
                if (this.is_bomb(row, check_column)) {
                    bomb_num++;
                }
            }
            console.log("END side_bomb_num");
            return bomb_num;
        },
        /**
         * 下側のボムの数を数える
         * @param row 行
         * @param column 列
         * @return ボムの数
         */
        bottom_bomb_num(row, column) {
            console.log("START bottom_bomb_num");
            var bomb_num = 0;
            for (var i = 0; i < 3; i++) {
                var check_row = row + 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.is_out_of_bounds(check_row, check_column)) {
                    continue;
                }
                if (this.is_bomb(check_row, check_column)) {
                    bomb_num++;
                }
            }
            console.log("END bottom_bomb_num");
            return bomb_num;
        },
        /**
         * 引数で受け取った行と列が範囲外か返す
         * @param row 行
         * @param column 列
         * @return 範囲外か
         */
        is_out_of_bounds(row, column) {
            console.log("START is_out_of_bounds");
            if (row < 0 || column < 0) {
                console.log("END is_out_of_bounds return = true");
                return true;
            }

            if (row > (this.number_of_row - 1) || column > (this.number_of_column - 1)) {
                console.log("END is_out_of_bounds return = true");
                return true;
            }
            console.log("END is_out_of_bounds return = false");
            return false;
        },

        /**
         * 周囲のパネルを開く
         * @param row 行
         * @param column 列
         */
        around_panel_open(row, column) {
            console.log("START around_panel_open");
            this.top_panel_open(row, column);
            this.side_panel_open(row, column);
            this.bottom_panel_open(row, column);
            console.log("END around_panel_open");
        },
        /**
         * 上側のパネルを開く
         * @param row 行
         * @param column 列
         */
        top_panel_open(row, column) {
            console.log("START top_panel_open");
            for (var i = 0; i < 3; i++) {
                var check_row = row - 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.is_out_of_bounds(check_row, check_column)) {
                    continue;
                }
                var index = check_row * this.number_of_column + check_column;
                this.$refs['Panels'][index].click_panel();
            }
            console.log("END top_panel_open");
        },
        /**
         * 左右のパネルを開く
         * @param row 行
         * @param column 列
         */
        side_panel_open(row, column) {
            console.log("START side_panel_open");
            for (var i = 0; i < 2; i++) {
                var check_column = column + ((i * 2) - 1);
                // 範囲外
                if (this.is_out_of_bounds(row, check_column)) {
                    continue;
                }
                var index = row * this.number_of_column + check_column;
                this.$refs['Panels'][index].click_panel();
            }
            console.log("END side_panel_open");
        },
        /**
         * 下側のパネルを開く
         * @param row 行
         * @param column 列
         */
        bottom_panel_open(row, column) {
            console.log("START bottom_panel_open");
            for (var i = 0; i < 3; i++) {
                var check_row = row + 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.is_out_of_bounds(check_row, check_column)) {
                    continue;
                }
                var index = check_row * this.number_of_column + check_column;
                this.$refs['Panels'][index].click_panel();
            }
            console.log("END bottom_panel_open");
        },
        /**
         * パネルが開かれた後の処理
         */
        did_open_panel() {
            this.need_open_panel--;
            if (this.need_open_panel == 0) {
                this.is_display_modal = true;
            }
        },
        /**
         * パネル全体の幅を返す
         */
        setup_bounds_width() {
            console.log("START game_bounds_height")
            var width = panel_const.panel_width * this.number_of_column + 100;
            width = (width < window.innerWidth) ? window.innerWidth : width
            this.panels_width = width;
            console.log("END game_bounds_height");
        },
        /**
         * パネル全体の高さを返す
         */
        setup_bounds_height() {
            console.log("START game_bounds_height")
            this.panels_height = panel_const.panel_height * this.number_of_row + 100;
            console.log("END game_bounds_height");
        },
        /**
         * パネル全体の左側の幅
         */
        setup_panel_left_mergin() {
            console.log("START panel_left_mergin");
            var width = panel_const.panel_width * this.number_of_column + 100;
            width = (width < window.innerWidth) ? window.innerWidth : width
            this.panel_left_mergin = (width - (panel_const.panel_height * this.number_of_row)) / 2;
            console.log("END panel_left_mergin");
        },
        /**
         * サイズとポジションを調整する
         */
        setup_size_position() {
            this.setup_bounds_height();
            this.setup_bounds_width();
            this.setup_panel_left_mergin();
        },
        /**
         * 引数で受け取った数字から、デジタル数字用のクラスを返す
         * @param 表示する数字
         * @return デジタル数字用のクラス名
         */
        digital_number_class(number) {
            return "d" + number;
        }
    },
    /**
     * インスタンス初期化後
     */
    created() {
        // ボム生成
        this.create_bombs();
        this.need_open_panel = this.number_of_row * this.number_of_column - panel_const.high_lebel.bomb_count;
    },
    computed: {
        /**
         * 10の位用クラスを返す
         */
        ten_place() {
            var value = calc_util.number_place(this.need_open_panel, 2);
            return this.digital_number_class(value);
        },
        /**
         * 1の位用クラスを返す
         */
        one_place() {
            var value = calc_util.number_place(this.need_open_panel, 1);
            return this.digital_number_class(value);
        }
    },
    /**
     * create後、DOMにアクセスできるタイミングで呼ばれる
     */
    mounted() {
        window.addEventListener('resize', this.setup_size_position)
        // ポジションとサイズを調整する
        this.setup_size_position();
    },
    /**
     * Destroy前に呼ばれる
     */
    beforeDestroy() {
        window.removeEventListener('resize', this.setup_size_position)
    }
}
</script>

<style lang="scss" scoped>
@import "../css/digital_number.scss";

.info_block {
    display: flex;
    box-sizing: border-box;
    background-color: white;
    align-items: center;
    justify-content: center;

}

.game_bounds {
    top:0;
    left:0;
    width:100%;
    height:100%;
}

.panels {
    top:0;
    left:0;
    position: relative;
}
</style>


