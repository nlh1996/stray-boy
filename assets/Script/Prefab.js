// good1预制件的脚本
import {Backpack} from './GoodsManager'
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
      this.updateData()
      //this.btnState()
    },

    // 物品制造事件
    makeGood(event) {
      Backpack.getInstance().make(this.node.good)
      // // 角色执行制造行为
      // player.make(this.node.good)
      // // 更新title提示
      // this.unscheduleAllCallbacks()
      // this.labelSchedule(button.good.name)
      // // 更新物品数量显示
      // this.updateData()
      // // 按钮状态判断
      // this.btnState()
    },

    // 判断按钮是否为可用状态
    btnState() {
      // 验证是否满足制造需求
      let result = player.validate(this.node.good)
      if(result) {
        this.btn.enabled = true
        this.btn_label.node.color = cc.color(20,240,36)
      } else {
        this.btn.enabled = false
        this.btn_label.node.color = cc.color(105,105,105)
      }     
    },

    start () {

    },

    updateData() {
      this.btn_label.string = this.node.good.name
      this.label1.string = '#需【' + this.node.good.needs[0].name + '】' + this.node.good.needs[0].num+'/1【'
      + this.node.good.needs[1].name +'】' + this.node.good.needs[1].num + '/1'
      this.label2.string = '#获得【' + this.node.good.name +'】' + '(拥有'+ this.node.good.num +')'
    },

    // update (dt) {},
});
