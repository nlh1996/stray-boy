// 游戏结束脚本
cc.Class({
    extends: cc.Component,
    properties: {
      btn1: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      //获取 ArmatureDisplay
      this._armatureDisPlay = this.getComponent(dragonBones.ArmatureDisplay)
      this.btn1.node.on('click',this.callback,this)
        
    },

    callback () {
      //获取 Armatrue
      this._armature = this._armatureDisPlay.armature()
      this._armature.animation.fadeIn('attack1', -1, 1, 0, 'hit')
    },

    // update (dt) {},
});
