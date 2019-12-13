<template>
    <div class="modal_mask">
        <div class="modal_message_panel">
            <div class="modal_message">{{ message }}</div>
            <button class="retry_button message_button" @click="retry">再挑戦</button>
            <button class="back_title_button message_button" @click="back_title">タイトルに戻る</button>
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
        /** メッセージ */
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
        },
        /**
         * 再挑戦
         */
        retry() {
            console.log("START retry") 
            this.$router.go({path: this.$router.currentRoute.path, force: true})
            console.log("END retry") 
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

$message_height: 100px;
$message_width: 300px;
/**
 * モーダルのメッセージ_パネル
 */
.modal_message_panel {
    position: relative;
    background-color: white;
    height: $message_height;
    width: $message_width;
}

/** メッセージ */
.modal_message {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    position: absolute;
}

/** ボタンの高さ */
$button_height: 20px;
/** ボタンの幅 */
$button_width: 120px;
/** ボタンのBottom */
$button_bottom: 10px;
/** ボタンのRight */
$buttom_right: 10px;

/** メッセージ内のボタン */
.message_button {
    position: absolute;
    height: $button_height;
    width: $button_width;
}
.message_button:active {
    color: white;
}

/** 再挑戦ボタン */
.retry_button {
    bottom: $button_bottom; 
    left: $buttom_right;
}

/** タイトルに戻るボタン */
.back_title_button {
    bottom: $button_bottom; 
    right: $buttom_right; 
}
</style>