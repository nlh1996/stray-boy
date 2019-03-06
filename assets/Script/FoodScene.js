// 该脚本负责制造场景的逻辑
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
      label1: {
        default: null,
        type: cc.Label
      },
      label2: {
        default: null,
        type: cc.Label
      },
      label3: {
        default: null,
        type: cc.Label
      },
      label4: {
        default: null,
        type: cc.Label
      },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      this.updateData()
      this.Btn_back.node.on('click', this.back, this)

      this.Btn_Meat.node.on('click', this.eatFood, this)
      this.Btn_Fruit.node.on('click', this.eatFood, this)
      this.Btn_Drug.node.on('click', this.eatFood, this)

      this.arr = [this.Btn_Fruit,this.Btn_Meat,this.Btn_Drug]

      // 绑定按钮和特定物品
      this.Btn_Fruit.good = player.materials.fruit
      this.Btn_Meat.good = player.goods.cooked_meat
      this.Btn_Drug.good = player.goods.drug


      this.btnState()
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
      cc.director.loadScene('game')
    },

    // 进食
    eatFood(button) {
      player.eat(button.good)
      this.unscheduleAllCallbacks()
      this.labelSchedule(button.good)
      // 视图更新
      this.updateData()
      // 按钮状态判断
      this.btnState()
    },

    // 文字出现效果
    labelSchedule(good) {
      this.title.string = ''
      let content = '饥饿+' + good.hunger + '!'
      let index = 0
      let i = content.length - 1
      this.schedule(() => {
        this.title.string = this.title.string + content[index]
        index++
      },0.08,i,0)
    },

    updateData() {
      this.label1.string = '#拥有：' + player.materials.fruit.num
      this.label2.string = '#效果：饥饿+20，15%几率恢复1点健康值'
      this.label3.string = '#拥有：' + player.goods.cooked_meat.num
      this.label4.string = '#效果: 饥饿+70'
    },

    start () {
      
    },

    // update (dt) {},
});
