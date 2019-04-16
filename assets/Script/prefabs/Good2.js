// good2道具预制件的脚本
import player from '../PlayerManager'
import {EVENT} from 'Enum'
cc.Class({
    extends: cc.Component,

    properties: {
      btn: cc.Button,
      btn_label: cc.Label,
      label1: cc.Label,
      label2: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      this.btn.node.on('click', this.eat, this)
    },

    // 进食
    eat() {
      let result = player.eat(this.node.good)
      if(result ==  '') {
        var content = this.node.good.about
      }
      if(result == EVENT.FULL) {
        var content = '吃饱了'
      }
      if(result == EVENT.LIFEFULL) {
        var content = '生命已满'
      }
      cc.director.getScene().getChildByName('Canvas').getComponent('GoodScene').labelSchedule(content)
    },

    start () {

    },

    // label数据更新
    updateData() {
      let good = this.node.good
      this.btn_label.string = good.name
      this.label1.string = '拥有：' + good.num
      this.label2.string = '效果：' + good.about
    },

    // 判断按钮是否为可用状态
    btnState() {
      if(this.node.good.num > 0) {
        this.btn.enabled = true
        this.btn_label.node.color = cc.color(20,240,36)
      } else {
        this.btn.enabled = false
        this.btn_label.node.color = cc.color(105,105,105)
      }     
    },

    update (dt) {
      this.updateData()
      this.btnState()
    },
});
