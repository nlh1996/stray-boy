const player = require('PlayerManager') 
cc.Class({
    extends: cc.Component,

    properties: {
      Btn_back: cc.Button,
      Btn_Meat: cc.Button,
      Btn_Herb: cc.Button,
      Btn_Tent: cc.Button,
      Btn_Corselet: cc.Button,

      label1: {
        default: null,
        type: cc.Label
      },
      label2: {
        default: null,
        type: cc.Label
      },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.updateData()
      this.arr = [this.Btn_Meat,this.Btn_Herb,this.Btn_Tent,this.Btn_Corselet]
      this.Btn_back.node.on('click', this.back, this)

      this.Btn_Meat.node.on('click', this.makeGood, this)
      this.Btn_Drug.node.on('click', this.makeGood, this)
      this.Btn_Tent.node.on('click', this.makeGood, this)
      this.Btn_Corselet.node.on('click', this.makeGood, this)

      // 绑定按钮和特定物品
      this.Btn_Meat.good = player.goods.cooked_meat
      this.Btn_Drug.good = player.goods.drug
      this.Btn_Tent.good = player.goods.tent
      this.Btn_Corselet.good = player.goods.corselet

      for(let i=0; i<this.arr.length; i++) {
        this.arr[i].getComponent(cc.Button).enabled = false
        if(player.materials.raw_meat>=1 && player.materials.wood>=1) {
          this.arr[i].getComponent(cc.Button).enabled = true
          this.arr[i].node.getChildByName('Label').color = cc.color(20,240,36)
        }
      }
    },

    back() {
      cc.director.loadScene('game')
    },

    // 物品制造事件
    makeGood(button) {
      // 角色执行制造
      player.make(button.good)
      // 数据更新
      this.updateData()
      if(player.materials.raw_meat>=1 && player.materials.wood>=1) {
        button.enabled = true
        button.node.getChildByName('Label').color = cc.color(20,240,36)
      }else {
        button.enabled = false
        button.node.getChildByName('Label').color = cc.color(105,105,105)
      }
    },

    updateData() {
      this.label1.string = '#需【生肉】'+player.materials.raw_meat+'/1'+'【木材】'+player.materials.wood+'/1'
      this.label2.string = '#获得【熟肉】'+'(拥有'+player.goods.cooked_meat.num+')'
    },

    start () {
      
    },

    // update (dt) {},
});
