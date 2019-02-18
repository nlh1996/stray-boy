// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const player = require("PlayerManager")
const Enum = require('Enum')
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
          player.knowledge = 2
          player.talent = Enum.TALENT.学霸
          break
        case 'Button_2':
          player.sport = 2
          player.talent = Enum.TALENT.强壮
          break
        case 'Button_3':
          player.charm = 2
          player.talent = Enum.TALENT.多才
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
