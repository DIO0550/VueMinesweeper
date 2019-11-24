<template>
    <div class="modal_mask">
        <div class="modal_message">
            <button class="retry_button message_button">再挑戦</button>
            <button class="back_title_button message_button">タイトルに戻る</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        
        }
    },
    props: {
        message: {
            type: String,
            default: "ゲームクリア",
            required: true
        }
    },
    methods: {
        /**
         * スタート画面に戻る
         */
        back_title() {
            console.log("START back_start");
            this.$router.push({
                name: "Title"
            })
            console.log("END back_start")
        }
    }
}
</script>
<style lang="scss" scoped>
/**
 * メッセージの下のマスク
 */
.modal_mask {
    z-index: 9998;

    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);

    /** maskの上に表示するものを中央表示にする */
    display: flex;
    align-items: center;
    justify-content: center;
}

/**
 * モーダルのメッセージ
 */
.modal_message {
    color: white;
}

/** ボタンの高さ */
$button_height: 20px;
/** ボタンの幅 */
$button_width: 80px;

/** メッセージ内のボタン */
.message_button {
    height: $button_height;
    width: $button_width;
}

.retry_button {

}
</style>