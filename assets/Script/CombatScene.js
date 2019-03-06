// 本脚本负责游戏的战斗场景
import player from './PlayerManager'
import {BEHAVIOR} from './Enum'

cc.Class({
    extends: cc.Component,

    properties: {
      Btn_Combat: cc.Button,
      Btn_RunAway: cc.Button,
    },

    onLoad() {
      this.Btn_Combat.node.on('click',this.combat,this)
      this.Btn_RunAway.node.on('click',this.runAway,this)
    },

    combat() {
      player.setState(BEHAVIOR.COMBAT)
    },

    runAway() {
      player.setState(BEHAVIOR.RUNAWAY)
    },

    start () {

    },

    // update (dt) {},
});
