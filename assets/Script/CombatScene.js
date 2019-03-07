// 本脚本负责游戏的战斗场景
import player from './PlayerManager'
import {BEHAVIOR,EVENT} from './Enum'
import {白毛僵尸,灰眼僵尸,绿眼僵尸,僵尸王,僵尸工厂} from './MonsterFactory'
const et = require('Listener')

cc.Class({
    extends: cc.Component,

    properties: {
      Btn_Combat: cc.Button,
      Btn_RunAway: cc.Button,

      Node: {
        default: null,
        type: cc.Node
      }
    },

    onLoad() {
      this.initMonster()
      this.Node.active = false
      this.Btn_Combat.node.on('click',this.combat,this)
      this.Btn_RunAway.node.on('click',this.runAway,this)

      et.on(EVENT.COMBAT,() => {
        this.Node.active = true
      })
      et.off(EVENT.COMBAT)
    },

    combat() {
      player.setState(BEHAVIOR.COMBAT)
    },

    runAway() {
      player.setState(BEHAVIOR.RUNAWAY)
    },

    initMonster() {

    },

    start () {

    },

    // update (dt) {},
});
