<template>
    <div>
        <panel/>
        <div class="game_title">
            マインスイーパー
        </div>
        <div class="start_button_wrapper">
            <button class="start_button" v-on:click="start_button_click()">
                ゲームを始める
            </button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        /**
         * [ゲームスタート]ボタンの押下時の動作
         */
        start_button_click() {
            console.log("START start_button_click");
            this.$router.push({                  
                               name: "Game", 
                            });
            console.log("END start_button_click");
        }
    },

}
</script>

<style lang="scss" scoped>
/**.
スタートボタン
 */
.start_button {
    background-color: aqua;
    
}
/**
スタートボタンのラッパー
 */
.start_button_wrapper {
    margin-top: 30px;
    text-align: center;
}

/**
 タイトル
 */
.game_title {
    text-align: center;
    font-size: 20px;
}
</style>
