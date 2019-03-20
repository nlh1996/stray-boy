// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      console.log(111)
    },

    // 物品制造事件
    makeGood(event) {
      console.log(event)
      // // 角色执行制造行为
      // player.make(button.good)
      // // 更新title提示
      // this.unscheduleAllCallbacks()
      // this.labelSchedule(button.good.name)
      // // 更新物品数量显示
      // this.updateData()
      // // 按钮状态判断
      // this.btnState()
    },

    start () {

    },

    // update (dt) {},
});
