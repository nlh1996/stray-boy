cc.Class({
    extends: cc.Component,

    properties: {
      Btn_back: cc.Button,
      Btn_Meat: cc.Button,
      Btn_Herb: cc.Button,
      Btn_Tent: cc.Button,
      Btn_Corselet: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
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
