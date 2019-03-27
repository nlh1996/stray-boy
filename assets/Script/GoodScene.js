// 该脚本负责制造场景的逻辑
import {EVENT,GAME_SCENE} from './Enum'
import GameSceneMng from './GameSceneMng'

const player = require('PlayerManager') 
cc.Class({
    extends: cc.Component,

    properties: {
      Btn_back: cc.Button,
      Btn_Fruit: cc.Button,
      Btn_Meat: cc.Button,
      Btn_Drug: cc.Button,
      title: {
        default: null,
        type: cc.Label
      },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      // this.updateData()
      this.Btn_back.node.on('click', this.back, this)
      //this.btnState()

    },

    // 判断按钮是否为可用状态
    btnState() {
      for(let i=0; i<this.arr.length; i++) {
        if(this.arr[i].good.num > 0) {
          this.arr[i].getComponent(cc.Button).enabled = true
          this.arr[i].node.getChildByName('Label').color = cc.color(20,240,36)
        } else {
          this.arr[i].getComponent(cc.Button).enabled = false
          this.arr[i].node.getChildByName('Label').color = cc.color(105,105,105)
        }
      }
    },

    back() {
      GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
    },

    // 进食
    eatFood(button) {
      let result = player.eat(button.good)
      this.unscheduleAllCallbacks()
      if(result != EVENT.FULL) {
        this.labelSchedule(button.good)
        // 视图更新
        this.updateData()
        // 按钮状态判断
        this.btnState()
      }else {
        this.title.string = ''
        var content = '您已经吃饱了!'
        let index = 0
        let i = content.length - 1
        this.schedule(() => {
          this.title.string = this.title.string + content[index]
          index++
        },0.08,i,0)
      }
    },

    // 文字出现效果
    labelSchedule(good) {
      this.title.string = ''
      if(good.hunger) {
        var content = '饥饿+' + good.hunger + '!'
      }
      if(good.life) {
        var content = '生命+' + good.life + '!'
      }
      let index = 0
      let i = content.length - 1
      this.schedule(() => {
        this.title.string = this.title.string + content[index]
        index++
      },0.08,i,0)
    },

    updateData() {
      this.label1.string = '#拥有：' 
      this.label2.string = '#效果：饥饿+20，15%几率恢复1点健康值'
      this.label3.string = '#拥有：' 
      this.label4.string = '#效果: 饥饿+70'
      this.label5.string = '#拥有：' 
      this.label6.string = '#效果: 生命回复+30'
    },

    start () {
      
    },

    // update (dt) {},
});
