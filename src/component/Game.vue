<template>
    <div class="game_bounds">
        <GameEndModal v-if="is_game_clear" :message="'ゲームクリア'"/>
        <GameEndModal v-if="is_game_over" :message="'ゲームオーバー'"/>
        <div>
            <div class="info_block">
                <div class="info_block_label">残り</div>
                <div>{{ need_open_panel }}</div>
            </div>
            <div class="info_block">
                <div class="info_block_label">BOMB</div>
                <div>{{ bombCount }}</div>
            </div>
            <div class="info_block">
                <div class="info_block_label">TIME</div>
                <div>{{ game_time }}</div>
            </div>

        </div>
        <div class="panels" ref="panel_block" :style="{height: panels_height + 'px', width: panels_width + 'px'}">
            <template v-for="i in row">
                <Panel v-for="j in column" v-bind:key="column * (i - 1) + (j - 1)" 
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
import Panel from './Panel';

/**
 * ゲーム終了時のモーダル
 */
import GameEndModal from './GameEndModal';

import panel_const from "../javascript/Const/PanelConst"
import {timer, TIMER_FORMAT} from "../javascript/Util/Timer"

import { mapState, mapGetters} from "vuex"

const left_mergin = 100;
const top_mergin = 100;
export default {
    data() {
        return {
            // ボムの位置
            bombs: new Map(),
            // 開く必要があるパネルの数
            need_open_panel: Math.max,
            // ゲームクリアしたか
            is_game_clear: false,
            // ゲームオーバーか
            is_game_over: false,
            // パネルとの左の幅
            panel_left_mergin: 0,
            // パネルの高さ
            panels_height: 0,
            // パネルの幅
            panels_width: 0,
            // タイム
            game_time: "00:00:00",
            // 開始時間
            start_time: null,
            // タイマー
            game_timer: null
        }
    },
    components: {
        Panel,
        GameEndModal
    },
    methods: {
        /**
         * ボムを生成する
         */
        createBombs() {
            var panel_list = [];
            var panel_num = this.row * this.column;
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

            for (var k = 0; k < this.bombCount; k++) {
                var number = panel_list[k]
                var column = number % this.column;
                var row = Math.floor(number /  this.column);
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
            var has_bomb = this.bombs.has(column + row * this.column)
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
            var bombCount = this.topBombNum(row, column);
            bombCount += this.sideBombNum(row, column);
            bombCount += this.bottomBombNum(row, column);
            console.log("END aroundBombNum bombCount =" + bombCount);
            return bombCount;
        },
        /**
         * 上側のボムの数を返す
         * @param row 行
         * @param column 列
         * @returns ボムの数 
         */
        topBombNum(row, column) {
            console.log("START aroundBombNum");
            var bombCount = 0;
            for (var i = 0; i < 3; i++) {
                var check_row = row - 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.isOutOfBounds(check_row, check_column)) {
                    continue;
                }
                if (this.isBomb(check_row, check_column)) {
                    bombCount++;
                }
            }
            console.log("END aroundBombNum");
            return bombCount;
        },
        /**
         * 左右のボムの数を返す
         * @param row 行
         * @param column 列
         * @returns ボムの数 
         */
        sideBombNum(row, column) {
            console.log("START sideBombNum");
            var bombCount = 0;
            for (var i = 0; i < 2; i++) {
                var check_column = column + ((i * 2) - 1);
                // 範囲外
                if (this.isOutOfBounds(row, check_column)) {
                    continue;
                }
                if (this.isBomb(row, check_column)) {
                    bombCount++;
                }
            }
            console.log("END sideBombNum");
            return bombCount;
        },
        /**
         * 下側のボムの数を数える
         * @param row 行
         * @param column 列
         * @return ボムの数
         */
        bottomBombNum(row, column) {
            console.log("START bottomBombNum");
            var bombCount = 0;
            for (var i = 0; i < 3; i++) {
                var check_row = row + 1;
                var check_column = column + (i - 1);
                // 範囲外
                if (this.isOutOfBounds(check_row, check_column)) {
                    continue;
                }
                if (this.isBomb(check_row, check_column)) {
                    bombCount++;
                }
            }
            console.log("END bottomBombNum");
            return bombCount;
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

            if (row > (this.row - 1) || column > (this.column - 1)) {
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
                var index = check_row * this.column + check_column;
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
                var index = row * this.column + check_column;
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
                var index = check_row * this.column + check_column;
                this.$refs['Panels'][index].clickPanel();
            }
            console.log("END bottompanelopen");
        },
        /**
         * パネルが開かれた後の処理
         */
        didOpenPanel() {
            this.startTimer()
            console.log("START didOpenPanel");
            this.need_open_panel--;
            if (this.need_open_panel == 0) {
                this.stopTimer()
                this.is_game_clear = true;
            }
            console.log("END didOpenPanel");
        },
        /**
         * パネル全体の高さを設定する
         */
        setupBoundsHeight() {
            console.log("START setupBoundsHeight");
            this.panels_height = panel_const.panel_height * this.row + 100;
            console.log("END setupBoundsHeight");
        },
        /**
         * パネル全体の幅を設定する
         */
        setupBoundsWidth() {
            console.log("START setupBoundsWidth");
            this.panels_width = panel_const.panel_width * this.column;
            console.log("END setupBoundsWidth")
        },
        /**
         * サイズとポジションを調整する
         */
        setupSizePosition() {
            console.log("START setupSizePosition");
            this.setupBoundsHeight();
            this.setupBoundsWidth();
            console.log("END setupSizePosition");
        },
        /**
         * ボムが開いた際の処理
         */
        didOpenBomb() {
            this.stopTimer()
            console.log("START didOpenBomb")
            this.is_game_over = true;
            console.log("END didOpenBomb")
        },
        startTimer() {
            if (this.game_timer != null) {
                return
            }
            this.start_time = new Date()
            this.game_timer = setInterval(function() {this.game_time = timer.diffTimeString(this.start_time, TIMER_FORMAT.HOUR)}.bind(this), 1000)
        },
        stopTimer() {
            if (this.game_timer == null) {
                return
            }
            clearInterval(this.game_timer)
            this.game_timer = null
        }
    },
    /**
     * インスタンス初期化後
     */
    created() {
        // ボム生成
        this.createBombs();
        this.need_open_panel = this.row * this.column - this.bombCount;
    },
    computed: {
        ...mapGetters("panel_info_store", {
            column: "column",
            row: "row",
            bombCount: "bombCount"
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

.info_block {
    justify-content: center;
    align-items: center;
    font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
    "Hiragino Maru Gothic Pro", "ヒラギノ角ゴ Pro W3",
    "Hiragino Kaku Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
    font-size: 40px;
    width: 400px;
    display: inline-flex;
    flex-wrap: wrap;
}

.info_block_label {
    background-color: orange;
    border-radius: 10px;
    color: white;
    width: 400px;
}

.game_bounds {
    text-align: center;
}

.panels {
    top:10px;
    position: relative;
    display: inline-flex;
}
</style>


