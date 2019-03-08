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
      },

      Monster: {
        default: null,
        type: cc.Label
      }
    },

    onLoad() {
      let monster = new 白毛僵尸()
      this.monster =  monster
      this.updateLabel()
      this.Node.active = false
      this.Btn_Combat.node.on('click',this.combat,this)
      this.Btn_RunAway.node.on('click',this.runAway,this)

      et.on(EVENT.COMBAT,() => {
        this.Node.active = true
      })
      et.on(EVENT.HURT,this.updateLabel,this)
    },

    combat() {
      //player.setState(BEHAVIOR.COMBAT)
      player.combat(this.monster)
      // this.updateLabel()
    },

    runAway() {
      player.setState(BEHAVIOR.RUNAWAY)
    },

    updateLabel() {
      this.Monster.string = this.monster.name + ' lv ' + this.monster.lv + ' hp ' + this.monster.life
    },

    start () {

    },

    // update (dt) {},
});
