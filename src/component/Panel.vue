<template>
    <div class="outer_bounds">
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 行
            row:0,
            // 列
            column:0,
            // ボム
            bomb:false,
            // めくれているか 
            open:false,
        }
    },
}
</script>

<style lang="scss" scoped>

$height: 50px;
$width: 50px;

.outer_bounds {
    background-color: darkgray;
    height: $height;
    width: $width;
}
</style>