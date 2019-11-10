<template>
    <div>
        <template v-for="i in $data.number_of_column">
            <Panel v-for="j in $data.number_of_row" v-bind:key="100 * i + j" :row="j" :column="i"/>
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
            number_of_column:PanelConst.high_lebel.column
        }
    },
    components: {
        Panel
    }
}
</script>

<style lang="scss" scoped>
</style>


