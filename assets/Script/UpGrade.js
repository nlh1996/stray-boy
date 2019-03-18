// 角色升级脚本,负责升级加点
cc.Class({
    extends: cc.Component,

    properties: {
      btn1: {
        type: cc.Button,
        default: null
      },
      btn2: {
        type: cc.Button,
        default: null
      },
      btn3: {
        type: cc.Button,
        default: null
      },
      countLabel: {
        type: cc.Label,
        default: null
      }
    },
 
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.node.active = false
      this.count = 3
    },

    start () {

    },

    updateLabel() {
      this.countLabel.string = '可用加点：' + this.count
    }

    // update (dt) {},
});
