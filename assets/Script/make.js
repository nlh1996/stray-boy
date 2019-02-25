
cc.Class({
    extends: cc.Component,

    properties: {
      Btn_back: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.Btn_back.node.on('click', this.back, this)
    },

    back() {
      cc.director.loadScene('game')
    },

    start () {
      
    },

    // update (dt) {},
});
