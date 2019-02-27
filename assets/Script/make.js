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
      this.label1.string = '#需【生肉】'+player.materials.raw_meat+'/1'+'【木材】'+player.materials.wood+'/1'
      this.label2.string = '#获得【熟肉】'+'(拥有'+player.goods.cooked_meat+')'
      this.Btn_Forward = this.node.getChildByName('Btn_Forward')
      this.Btn_back.node.on('click', this.back, this)
    },

    back() {
      cc.director.loadScene('game')
    },

    start () {
      
    },

    // update (dt) {},
});
