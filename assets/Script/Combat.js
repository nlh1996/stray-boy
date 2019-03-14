// 本脚本负责游戏的战斗场景
import player from './PlayerManager'
import {EVENT} from './Enum'
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
      },

      Content: {
        default: null,
        type: cc.Label
      },
    },

    onLoad() {
      this.Node.active = false
      this.Btn_Combat.node.on('click',this.combat,this)
      this.Btn_RunAway.node.on('click',this.runAway,this)

      et.on(EVENT.COMBAT,() => {
        this.Node.active = true
        let monster = new 白毛僵尸()
        this.monster =  monster
        this.updateLabel()
      })

      et.on(EVENT.HURT, this.updateLabel, this)
      
      et.on(EVENT.WIN, () => {
        this.Node.active = false
        this.labelSchedule('恭喜您获得胜利！')
      })
    },

    combat() {
      this.damage = player.combat(this.monster)
      let content = '你丢出了一张符箓 【僵尸生命-' + this.damage[0] + '】' 
      + '僵尸还你一爪【生命-' + this.damage[1] + '】'
      this.labelSchedule(content)
      // this.updateLabel()
    },

    runAway() {
      player.setState(BEHAVIOR.RUNAWAY)
    },

    win() {
      this.monster.die()
      this.labelSchedule('你胜利了！')
    },

    updateLabel() {
      this.Monster.string = this.monster.name + ' lv ' + this.monster.lv + ' hp ' + this.monster.life
    },

    labelSchedule(content) {
      this.Btn_Combat.enabled = false
      this.Content.string = ''
      let index = 0
      let i = content.length - 1
      this.schedule(() => {
        this.Content.string = this.Content.string + content[index]
        index++
        if(index>i) {
          this.Btn_Combat.enabled = true
        }
      },0.06,i,0)
    },

    start () {

    },

    // update (dt) {},
});
