<template>
    <div>
        <template v-for="i in number_of_row">
            <Panel v-for="j in number_of_column" v-bind:key="number_of_column * (i - 1) + (j - 1)" 
                                :row="(i - 1)" :column="(j - 1)" :bomb="is_bomb((i - 1), (j - 1))"
                                :around_bomb_num="around_bomb_num((i - 1), (j - 1))"
                                :around_panel_open="around_panel_open"
                                :ref="'Panels'"/>
        </template>
    </div>
</template>

<script>
/**
 * １マスパネル用
 */
import Panel from './Panel';
import PanelConst from '../javascript/Const/panel_const';

export default {
    data() {
        return {
            number_of_row:PanelConst.high_lebel.row,
            number_of_column:PanelConst.high_lebel.column,
            bombs:new Map()
        }
    },
    components: {
        Panel
    },
    methods: {
        /**
         * ボムを生成する
         */
        create_bombs() {
            var panel_list = [];
            var panel_num = PanelConst.high_lebel.row * PanelConst.high_lebel.column;
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

            for (var k = 0; k < PanelConst.high_lebel.bomb_count; k++) {
                var number = panel_list[k]
                var column = number % PanelConst.high_lebel.column;
                var row = Math.floor(number /  PanelConst.high_lebel.column);
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
        }
    },
    created() {
        // ボム生成
        this.create_bombs()
    }
}
</script>

<style lang="scss" scoped>
</style>


