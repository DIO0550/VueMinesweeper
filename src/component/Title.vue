<template>
  <div class="container">
    <panel />
    <div class="game_title">マインスイーパー</div>
    <div class="block">
      <div class="input_block">
        <label>高さ：</label>
        <input id="input_column" class="input_column input_level" v-model="input_column" />
      </div>
      <div class="input_block">
        <label>幅：</label>
        <input id="input_row" class="input_row input_level" v-model="input_row" />
      </div>
      <div class="input_block">
        <label>ボム：</label>
        <input id="input_bomb" class="input_bomb input_level" v-model="input_bomb" />
      </div>
    </div>
    <div class="start_button_wrapper">
      <button class="start_button easy_button" v-on:click="easyButtonClick">Easy</button>
    </div>
    <div class="start_button_wrapper">
      <button class="start_button normal_button" v-on:click="normalButtonClick">Normal</button>
    </div>
    <div class="start_button_wrapper">
      <button class="start_button high_button" v-on:click="highButtonClick">High</button>
    </div>
  </div>
</template>


<script>
import panel_const from "../javascript/Const/PanelConst"
import { mapActions } from "vuex"

export default {
  data() {
    return {
      input_column: 0,
      input_row: 0,
      input_bomb: 0
    };
  },
  methods: {

    easyButtonClick() {
        console.log("START easyButtonClick");
        
        this.setPanelInfo(panel_const.easy_level)
        this.pushGameScene();

        console.log("END easyButtonClick");
    },
    /**
     * [normal]ボタンの押下時の
     */
    normalButtonClick() {
        console.log("START normalButtonClick");
        
        this.setPanelInfo(panel_const.normal_level);
        this.pushGameScene();

        console.log("END normalButtonClick");
    },
    /**
     * [high]ボタンの押下時の動作
     */
    highButtonClick() {
        console.log("START highButtonClick");
        
        this.setPanelInfo(panel_const.high_level);
        this.pushGameScene();

        console.log("END highButtonClick");
    },
    setPanelInfo(info) {
      this.setPanelInfoColumn(info.column);
      this.setPanelInfoRow(info.row);
      this.setPanelInfoBombCount(info.bomb_count);
    },
    pushGameScene() {
      console.log("START pushGameScene");
      this.$router.push({
        name: "Game"
      })
      console.log("END pushGameScene")
    },
    ...mapActions("panel_info_store", {
      setPanelInfoColumn(dispatch, column) {
        dispatch("setColumn", column)
      },
      setPanelInfoRow(dispatch, row) {
        dispatch("setRow", row)
      },
      setPanelInfoBombCount(dispatch, bomb_count) {
        dispatch("setBombCount", bomb_count);
      },
    })
  }
};
</script>

<style lang="scss" scoped>
/**.
スタートボタン
 */
.start_button {
  width: 100px;
}

.easy_button {
  background-color: aqua;
}

.normal_button {
  background-color: yellow;
}

.high_button {
  background-color: red;
}

/**
スタートボタンのラッパー
 */
.start_button_wrapper {
  margin-top: 10px;
  text-align: center;
}

/**
 タイトル
 */
.game_title {
  text-align: center;
  font-size: 20px;
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
  width: 50px;
}

.block {
  display: inline-block;
}

.container {
    text-align: center;
}
</style>
