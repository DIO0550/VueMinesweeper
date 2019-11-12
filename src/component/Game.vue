<template>
    <div>
        <template v-for="i in $data.number_of_column">
            <Panel v-for="j in $data.number_of_row" v-bind:key="100 * i + j" :row="j" :column="i" :bomb="is_bomb(j, i)"/>
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
            bombs:[]
        }
    },
    components: {
        Panel
    },
    methods: {
        create_bombs() {
            var panel_list = [];
            var panel_num = PanelConst.high_lebel.row * PanelConst.high_lebel.column;
            for (var i = 0;  i < panel_num;  i++) {
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

                this.$data.bombs.push(
                    {
                        column: column,
                        row: row
                    }
                );
            }

        },
        is_bomb(row, column) {
            console.log("START is_bomb")
            for (var i = 0; i < this.$data.bombs.length; i++) {
                var bomb = this.$data.bombs[i];
                if (bomb.row == row && bomb.column == column) {
                    console.log("END is_bomb true")
                    return true;
                }
            }
            console.log("END is_bomb false")
            return false;
        }

    },
    created() {
        this.create_bombs()
    }
}
</script>

<style lang="scss" scoped>
</style>


