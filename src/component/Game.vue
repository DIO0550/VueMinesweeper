<template>
    <div class="game_bounds">
        <game_end_modal v-if="is_display_modal"/>
        <div class="info_block">
            残り：<div class="display" v-bind:class="tenPlace"></div><div class="display" v-bind:class="onePlace"></div>
        </div>
        <div class="panels" ref="panel_block" :style="{height: panels_height + 'px', left: panel_left_mergin + 'px'}">
            <template v-for="i in number_of_row">
                <panel v-for="j in number_of_column" v-bind:key="number_of_column * (i - 1) + (j - 1)" 
                                    :row="(i - 1)" :column="(j - 1)" :bomb="isBomb((i - 1), (j - 1))"
                                    :aroundBombNum="aroundBombNum((i - 1), (j - 1))"
                                    :aroundPanelOpen="aroundPanelOpen"
                                    :didOpenedPanel="didOpenPanel"
                                    :didOpenBomb="didOpenBomb"
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

import panel_const from "../javascript/Const/PanelConst"
import calc_util from '../javascript/Util/CalcUtil';
import { mapState, mapGetters} from "vuex"

const left_mergin = 100;
const top_mergin = 100;
export default {
    data() {
        return {
            // 行
            number_of_row: 0,
            // 列
            number_of_column: 0,
            // ボムのカウント
            bomb_num: 0,
            // ボムの位置
            bombs: new Map(),
            // 開く必要があるパネルの数
            need_open_panel: Math.max,
            // モーダルメッセージを表示するか
            is_display_modal: false,
            // パネルとの左の幅
            panel_left_mergin: 0,
            // パネルの高さ
            panels_height: 0
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
        createBombs() {
            var panel_list = [];
            var panel_num = this.number_of_row * this.number_of_column;
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

            for (var k = 0; k < this.bomb_num; k++) {
                var number = panel_list[k]
                var column = number % this.number_of_column;
                var row = Math.floor(number /  this.number_of_column);
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
        isBomb(row, column) {
            console.log("START isBomb")
            var has_bomb = this.bombs.has(column + row * this.number_of_column)
            console.log("END isBomb false")
            return has_bomb;
        },
        /**
         * 周りのボムの数を返す
         * @param row 行
         * @param column 列
         * @returns ボムの数 
         */
        aroundBombNum(row, column) {
            console.log("START aroundBombNum");
            var bomb_num = this.topBombNum(row, column);
            bomb_num += this.sideBombNum(row, column);
            bomb_num += this.bottomBombNum(row, column);
            console.log("END aroundBombNum bomb_num =" + bomb_num);
            return bomb_num;
        },
        /**
         * 上側のボムの数を返す
         * @param row 行
         * @param column 列
         * @returns ボムの数 
         */
        topBombNum(row, column) {
            console.log("START aroundBombNum");
            var bomb_num = 0;
            for (var i = 0; i < 3; i++) {
                var check_row = row - 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.isOutOfBounds(check_row, check_column)) {
                    continue;
                }
                if (this.isBomb(check_row, check_column)) {
                    bomb_num++;
                }
            }
            console.log("END aroundBombNum");
            return bomb_num;
        },
        /**
         * 左右のボムの数を返す
         * @param row 行
         * @param column 列
         * @returns ボムの数 
         */
        sideBombNum(row, column) {
            console.log("START sideBombNum");
            var bomb_num = 0;
            for (var i = 0; i < 2; i++) {
                var check_column = column + ((i * 2) - 1);
                // 範囲外
                if (this.isOutOfBounds(row, check_column)) {
                    continue;
                }
                if (this.isBomb(row, check_column)) {
                    bomb_num++;
                }
            }
            console.log("END sideBombNum");
            return bomb_num;
        },
        /**
         * 下側のボムの数を数える
         * @param row 行
         * @param column 列
         * @return ボムの数
         */
        bottomBombNum(row, column) {
            console.log("START bottomBombNum");
            var bomb_num = 0;
            for (var i = 0; i < 3; i++) {
                var check_row = row + 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.isOutOfBounds(check_row, check_column)) {
                    continue;
                }
                if (this.isBomb(check_row, check_column)) {
                    bomb_num++;
                }
            }
            console.log("END bottomBombNum");
            return bomb_num;
        },
        /**
         * 引数で受け取った行と列が範囲外か返す
         * @param row 行
         * @param column 列
         * @return 範囲外か
         */
        isOutOfBounds(row, column) {
            console.log("START isOutOfBounds");
            if (row < 0 || column < 0) {
                console.log("END isOutOfBounds return = true");
                return true;
            }

            if (row > (this.number_of_row - 1) || column > (this.number_of_column - 1)) {
                console.log("END isOutOfBounds return = true");
                return true;
            }
            console.log("END isOutOfBounds return = false");
            return false;
        },

        /**
         * 周囲のパネルを開く
         * @param row 行
         * @param column 列
         */
        aroundPanelOpen(row, column) {
            console.log("START aroundPanelOpen");
            this.topPanelOpen(row, column);
            this.sidePanelOpen(row, column);
            this.bottompanelopen(row, column);
            console.log("END aroundPanelOpen");
        },
        /**
         * 上側のパネルを開く
         * @param row 行
         * @param column 列
         */
        topPanelOpen(row, column) {
            console.log("START topPanelOpen");
            for (var i = 0; i < 3; i++) {
                var check_row = row - 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.isOutOfBounds(check_row, check_column)) {
                    continue;
                }
                var index = check_row * this.number_of_column + check_column;
                this.$refs['Panels'][index].clickPanel();
            }
            console.log("END topPanelOpen");
        },
        /**
         * 左右のパネルを開く
         * @param row 行
         * @param column 列
         */
        sidePanelOpen(row, column) {
            console.log("START sidePanelOpen");
            for (var i = 0; i < 2; i++) {
                var check_column = column + ((i * 2) - 1);
                // 範囲外
                if (this.isOutOfBounds(row, check_column)) {
                    continue;
                }
                var index = row * this.number_of_column + check_column;
                this.$refs['Panels'][index].clickPanel();
            }
            console.log("END sidePanelOpen");
        },
        /**
         * 下側のパネルを開く
         * @param row 行
         * @param column 列
         */
        bottompanelopen(row, column) {
            console.log("START bottompanelopen");
            for (var i = 0; i < 3; i++) {
                var check_row = row + 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.isOutOfBounds(check_row, check_column)) {
                    continue;
                }
                var index = check_row * this.number_of_column + check_column;
                this.$refs['Panels'][index].clickPanel();
            }
            console.log("END bottompanelopen");
        },
        /**
         * パネルが開かれた後の処理
         */
        didOpenPanel() {
            console.log("START didOpenPanel");
            this.need_open_panel--;
            if (this.need_open_panel == 0) {
                this.is_display_modal = true;
            }
            console.log("END didOpenPanel");
        },
        /**
         * パネル全体の高さを返す
         */
        setupBoundsHeight() {
            console.log("START setupBoundsHeight");
            this.panels_height = panel_const.panel_height * this.number_of_row + 100;
            console.log("END setupBoundsHeight");
        },
        /**
         * パネル全体の左側の幅
         */
        setupPanelLeftMergin() {
            console.log("START panel_left_mergin");
            this.panel_left_mergin = (this.$refs.panel_block.clientWidth - (panel_const.panel_height * this.number_of_row)) / 2;
            console.log("END panel_left_mergin mergin = " + this.panel_left_mergin);
        },
        /**
         * サイズとポジションを調整する
         */
        setupSizePosition() {
            console.log("START setupSizePosition");
            this.setupBoundsHeight();
            this.setupPanelLeftMergin();
            console.log("END setupSizePosition");
        },
        /**
         * 引数で受け取った数字から、デジタル数字用のクラスを返す
         * @param 表示する数字
         * @return デジタル数字用のクラス名
         */
        digitalNumberClass(number) {
            return "d" + number;
        },
        /**
         * ボムが開いた際の処理
         */
        didOpenBomb() {
            console.log("START didOpenBomb")
            this.is_display_modal = true;
            console.log("END didOpenBomb")
        },
    },
    /**
     * インスタンス初期化後
     */
    created() {
        this.number_of_column = this.column;
        this.number_of_row = this.row;
        this.bomb_num = this.bombcount;
        // ボム生成
        this.createBombs();
        this.need_open_panel = this.number_of_row * this.number_of_column - this.bomb_num;
    },
    computed: {
        /**
         * 10の位用クラスを返す
         */
        tenPlace() {
            var value = calc_util.numberPlace(this.need_open_panel, 2);
            return this.digitalNumberClass(value);
        },
        /**
         * 1の位用クラスを返す
         */
        onePlace() {
            var value = calc_util.numberPlace(this.need_open_panel, 1);
            return this.digitalNumberClass(value);
        },
        // ...mapState("panel_info_store", {
        //     number_of_column: state => state.column,
        //     number_of_row: state => state.row,
        //     bomb_num: state => state.bomb_num
        // }),
        ...mapGetters("panel_info_store", {
            column: "column",
            row: "row",
            bombcount: "bombCount"
        }),
    },
    /**
     * create後、DOMにアクセスできるタイミングで呼ばれる
     */
    mounted() {
        window.addEventListener('resize', this.setupSizePosition)
        // ポジションとサイズを調整する
        this.setupSizePosition();
    },
    /**
     * Destroy前に呼ばれる
     */
    beforeDestroy() {
        window.removeEventListener('resize', this.setupSizePosition)
    }
}
</script>

<style lang="scss" scoped>
@import "../css/digital_number.scss";

.info_block {
    width:100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game_bounds {
    width:100%;
}

.panels {
    top:10px;
    width:100%;
    position: relative;
}
</style>


