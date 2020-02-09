<template>
  <div class="container">
    <div class="game_title">マインスイーパー</div>
    <!-- レベルボタン -->
    <LevelButtons />
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
import LevelButtons from './LevelButtons'
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
  components: {
    LevelButtons
  },
  methods: {
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
