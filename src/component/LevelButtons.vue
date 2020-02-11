<template>
  <div>
    <div class="level_block">
        <div class="start_button_wrapper">
            <button class="start_button easy_button" v-on:click="easyButtonClick">EASY</button>
        </div>
        <div class="start_button_wrapper">
            <button class="start_button normal_button" v-on:click="normalButtonClick">NORMAL</button>
        </div>
        <div class="start_button_wrapper">
            <button class="start_button hard_button" v-on:click="hardButtonClick">HARD</button>
        </div>
    </div>
  </div>
</template>

<script>
import panel_const from "../javascript/Const/PanelConst";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      input_column: 0,
      input_row: 0,
      input_bomb: 0
    };
  },
  methods: {
    /**
     * [EASY]ボタンの押下時の動作
     */
    easyButtonClick() {
      console.log("START easyButtonClick");

      this.setPanelInfo(panel_const.easy_level);
      this.pushGameScene();

      console.log("END easyButtonClick");
    },
    /**
     * [NORMAL]ボタンの押下時の動作
     */
    normalButtonClick() {
      console.log("START normalButtonClick");

      this.setPanelInfo(panel_const.normal_level);
      this.pushGameScene();

      console.log("END normalButtonClick");
    },
    /**
     * [HARD]ボタンの押下時の動作
     */
    hardButtonClick() {
      console.log("START hardButtonClick");

      this.setPanelInfo(panel_const.hard_level);
      this.pushGameScene();

      console.log("END hardButtonClick");
    },
    setPanelInfo(info) {
      console.log("bomb info = " + info);
      this.setPanelInfoColumn(info.column);
      this.setPanelInfoRow(info.row);
      this.setPanelInfoBombCount(info.bomb_count);
    },
    pushGameScene() {
      console.log("START pushGameScene");
      this.$router.push({
        name: "Game"
      });
      console.log("END pushGameScene");
    },
    
    ...mapActions("panel_info_store", {
      setPanelInfoColumn(dispatch, column) {
        dispatch("setColumn", column);
      },
      setPanelInfoRow(dispatch, row) {
        dispatch("setRow", row);
      },
      setPanelInfoBombCount(dispatch, bomb_count) {
        dispatch("setBombCount", bomb_count);
      }
    })
  }
};
</script>

<style lang="scss" scoped>
$easy_button_color: rgb(117, 216, 255);
$normal_button_color: rgb(253, 253, 117);
$hard_button_color: rgb(243, 69, 69);
$button_disable_color: rgb(200, 200, 200);
/**.
スタートボタン
 */
.start_button {
  width: 300px;
  font-size: 30px;
  border-radius: 10px;
  outline: none;
  background-color: white;
  box-shadow: 20px;
  font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
    "Hiragino Maru Gothic Pro", "ヒラギノ角ゴ Pro W3",
    "Hiragino Kaku Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
}

.easy_button {
  color: $easy_button_color;
  border-color: $easy_button_color;
  border-width: 10px;
}
.easy_button:hover {
  color: white;
  background-color: $easy_button_color;
}

.normal_button {
  color: $normal_button_color;
  border-color: $normal_button_color;
  border-width: 10px;
}
.normal_button:hover {
  color: white;
  background-color: $normal_button_color;
}

.hard_button {
  color: $hard_button_color;
  border-color: $hard_button_color;
  border-width: 10px;
}
.hard_button:hover {
  color: white;
  background-color: $hard_button_color;
}

/**
スタートボタンのラッパー
 */
.start_button_wrapper {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
}

/**
 レベルブロック
 */
.level_block {
  display: inline-flex;
}

</style>