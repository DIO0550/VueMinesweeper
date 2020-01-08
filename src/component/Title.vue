<template>
  <div class="container">
    <panel />
    <div class="game_title">マインスイーパー</div>
    <!-- レベルボタン -->
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
    <div>
      <!-- カスタム -->
      <div class="custom_label">
        カスタム
      </div>
      <div class="block">
        <div class="input_block">
          <label class="input_label">高さ：</label>
          <input id="input_column" class="input_column input_level" v-model="input_column" />
        </div>
        <div class="input_block">
          <label class="input_label">幅：</label>
          <input id="input_row" class="input_row input_level" v-model="input_row" />
        </div>
        <div class="input_block">
          <label class="input_label">ボム：</label>
          <input id="input_bomb" class="input_bomb input_level" v-model="input_bomb" />
      </div>
      </div>
        <div class="start_button_wrapper">
        <button class="start_button custom_button" v-on:click="customButtonClick" :disabled="!isEnableCustomButton" v-bind:class="{ custom_button_disable : !isEnableCustomButton }">CUSTOM</button>
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
    /**
     * [CUSTOM]ボタンの押下時の動作
     */
    customButtonClick() {
      console.log("START customButtonClick")
      let info = {
        column: Number(this.input_column),
        row: Number(this.input_row),
        bomb_count: Number(this.input_bomb),
      }
      this.setPanelInfo(info);
      this.pushGameScene();
      console.log("END customButtonClick")
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
  },
  computed: {
    isEnableCustomButton() {
      let column_number = Number(this.input_column);
      if (isNaN(column_number)) {
        return false;
      }

      let row_number = Number(this.input_row);
      if (isNaN(row_number)) {
        return false;
      }

      let bomb_number = Number(this.input_bomb);
      if (isNaN(bomb_number)) {
        return false;
      }

      if (bomb_number == 0) {
        return false
      }

      if (column_number * row_number <= bomb_number) {
        return false
      }
      return true;
    },
  }
};
</script>

<style lang="scss" scoped>
$easy_button_color: rgb(117, 216, 255);
$normal_button_color: rgb(253, 253, 117);
$hard_button_color: rgb(243, 69, 69);
$custom_button_color: rgb(41, 119, 25);
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

.custom_button {
  color: $custom_button_color;
  border-color: $custom_button_color;
  border-width: 10px;
}
.custom_button:hover {
  color: white;
  background-color: $custom_button_color;
}
.custom_button_disable {
  color: $button_disable_color;
  border-color: $button_disable_color;
}
.custom_button_disable:hover {
  color: $button_disable_color;
  border-color: $button_disable_color;
   background-color: white;
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
 タイトル
 */
.game_title {
  color: transparent;
  background: linear-gradient(
    to bottom,
    rgba(69, 179, 224, 1) 40%,
    rgb(147, 207, 231) 80%,
    rgba(255, 255, 255, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-stroke: 2px blue;
  text-align: center;
  font-size: 120px;
  font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
    "Hiragino Maru Gothic Pro", "ヒラギノ角ゴ Pro W3",
    "Hiragino Kaku Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
  margin: auto;
}

.custom_label {
  font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
    "Hiragino Maru Gothic Pro", "ヒラギノ角ゴ Pro W3",
    "Hiragino Kaku Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
  margin-top: 30px;
  font-size: 80px;
  color: $custom_button_color;
}

/**
 レベルブロック
 */
.level_block {
  display: inline-flex;
}

/** 
 入力欄のブロック
 */
.input_block {
  text-align: right;
  display: block;
}

/**
 入力
 */
.input_level {
  width: 70px;
  height: 50px;
  border: 5px solid grey;
  border-radius : 5px;   
  font-size     : 26px; 
  text-align: center;
}
.input_label {
  font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
    "Hiragino Maru Gothic Pro", "ヒラギノ角ゴ Pro W3",
    "Hiragino Kaku Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
  font-size: 40px;
}
.block {
  display: inline-block;
}

.container {
  width: 100%;
  text-align: center;
  vertical-align: middle;
}
</style>
