// 本脚本负责游戏的开始
const player = require("PlayerManager")
import {TALENT} from 'Enum'
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
    },

    colorChange(button) {
      this.button1.normalColor = cc.Color.WHITE
      this.button2.normalColor = cc.Color.WHITE
      this.button3.normalColor = cc.Color.WHITE
      button.normalColor = cc.Color.GREEN
      switch(button.node.name) {
        case 'Button_1':
          player.talent = TALENT.学霸
          break
        case 'Button_2':
          player.talent = TALENT.强壮
          break
        case 'Button_3':
          player.talent = TALENT.多才
          break
      }
    },

    gameStart() {
      cc.director.loadScene('game')
    },

    start () {
      
    },

    // update (dt) {},
});
