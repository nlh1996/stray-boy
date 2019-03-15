// 本脚本负责游戏的战斗场景
import player from './PlayerManager'
import {EVENT,GAME_SCENE} from './Enum'
import GameSceneMng from './GameSceneMng'
import Monster from './MonsterFactory'
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
        let id = parseInt((player.properties.moveDuration+10)/10)
        let monster = new Monster(id)
        this.monster =  monster
        this.updateLabel()
        this.labelSchedule(this.monster.about)
      })

      et.on(EVENT.HURT, this.updateLabel, this)
      
      et.on(EVENT.WIN, () => {
        this.Node.active = false
        player.win(this.monster)
        let content = '【恭喜您获得胜利！】经验+' + this.monster.exp
        this.labelSchedule(content)
      })
    },

    combat() {
      this.damage = player.combat(this.monster)
      let content = '你丢出了一张符箓 【僵尸生命-' + this.damage[0] + '】' 
      + this.monster.attackType +'【生命-' + this.damage[1] + '】'
      if(this.monster.life>0) {
        this.labelSchedule(content)
      }
    },

    runAway() {
      GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
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
      },0.04,i,0)
    },

    start () {

    },

    // update (dt) {},
});
