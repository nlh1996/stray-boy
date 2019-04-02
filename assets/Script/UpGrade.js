// 角色升级脚本,负责升级加点
const et = require('Listener')
import player from './PlayerManager'
import {EVENT} from 'Enum'

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
      },
      knowledge: {
        default: null,
        type: cc.Label
      },
      sport: {
        default: null,
        type: cc.Label
      },
      charm: {
        default: null,
        type: cc.Label
      },
      life: {
        default: null,
        type: cc.Label
      },
      attack: {
        default: null,
        type: cc.Label
      },
      defence: {
        default: null,
        type: cc.Label
      },
    },
 
    onLoad () {
      this.count = 3
      this.updateLabel()
      et.on(EVENT.UPGRADE, this.upGrade, this)

      this.btn1.node.on('click', this.jiadian, this)
      this.btn2.node.on('click', this.jiadian, this)
      this.btn3.node.on('click', this.jiadian, this)
      this.btn1.type = '智商'
      this.btn2.type ='情商' 
      this.btn3.type = '体质'
    },

    onDestroy() {
      et.off(EVENT.UPGRADE)

    },

    jiadian(btn) {
      this.count --
      player.jiadian(btn.type)
      this.updateLabel()
      if(this.count == 0) {
        this.count = 3
        et.emit(EVENT.FINISH)
      }
    },

    upGrade() {
      this.updateLabel()
    },

    start () {
    },

    updateLabel() {
      this.countLabel.string = '可用加点：' + this.count
      this.knowledge.string = player.properties.knowledge
      this.sport.string = player.properties.sport
      this.charm.string = player.properties.charm
      this.life.string = player.properties.life
      this.attack.string = player.properties.attack
      this.defence.string = player.properties.defence
    }
    // update (dt) {},
});
