// 本脚本负责游戏的开始
const player = require("PlayerManager")
import {TALENT,GAME_SCENE} from 'Enum'
import GameSceneMng from './GameSceneMng'
cc.Class({
    extends: cc.Component,

    properties: {
      button1: cc.Button,
      button2: cc.Button,
      button3: cc.Button,
      button4: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      this.button1.node.on('click', this.colorChange, this)
      this.button2.node.on('click', this.colorChange, this)
      this.button3.node.on('click', this.colorChange, this)
      this.button4.node.on('click', this.gameStart, this)
      this.button4.interactable = false
    },

    colorChange(button) {
      this.button4.interactable = true
      this.button1.normalColor = cc.Color.WHITE
      this.button2.normalColor = cc.Color.WHITE
      this.button3.normalColor = cc.Color.WHITE
      button.normalColor = cc.Color.GREEN
      switch(button.node.name) {
        case 'Button_1':
          player.properties.talent = TALENT.健身达人
          break
        case 'Button_2':
          player.properties.talent = TALENT.情场高手
          break
        case 'Button_3':
          player.properties.talent = TALENT.理工男
          break
      }
    },

    gameStart() {
      if(player.properties.talent != null) {
        //初始化人物属性
        player.init(player.properties.talent)
        //开始游戏
        GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
      }
    },

    start () {
      
    },

    // update (dt) {},
});
