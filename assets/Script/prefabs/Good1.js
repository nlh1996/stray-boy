// good1打造物品预制件的脚本
import {Backpack} from '../GoodsManager'
import player from '../PlayerManager'
cc.Class({
    extends: cc.Component,
    
    properties: {
      btn: cc.Button,
      btn_label: cc.Label,
      label1: cc.Label,
      label2: cc.Label,
    },

    start () {

    },

    // 物品制造事件
    makeGood() {
      // 角色打造物品
      player.make(this.node.good)
      // 更新title提示
      let event = player.getCurrentEvent()
      cc.director.getScene().getChildByName('Canvas').getComponent('MakeScene').labelSchedule(event.about)
    },

    // 判断按钮是否为可用状态
    btnState() {
      // 验证是否满足制造需求
      let result =  Backpack.getInstance().validate(this.node.good)
      if(result) {
        this.btn.enabled = true
        this.btn_label.node.color = cc.color(20,240,36)
      } else {
        this.btn.enabled = false
        this.btn_label.node.color = cc.color(105,105,105)
      }     
    },

    updateData() {
      let good = this.node.good
      let materials = Backpack.getInstance().materials
      let arr = [] 
      for(let a=0; a<good.needs.length; a++) {
        for(let i=0; i<materials.length; i++) {
          if(good.needs[a].name == materials[i].name) {
            arr.push(materials[i].num)
          }
        }
      }
      this.btn_label.string = good.name
      this.label1.string = '#需【' + good.needs[0].name + '】' + arr[0] +'/' + good.needs[0].num
      + '【' + good.needs[1].name +'】' + arr[1] + '/' + good.needs[1].num
      this.label2.string = '#获得【' + good.name +'】' + '(拥有'+ good.num +')'
    },

    update() {
      this.updateData()
      this.btnState()
    }
});
