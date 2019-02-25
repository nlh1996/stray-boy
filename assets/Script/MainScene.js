const player = require("PlayerManager")
const gameEvent = require("Event")
const et = require('Listener')
const Enum = require('Enum')
const command = require('Command')
cc.Class({
    extends: cc.Component,
    properties: {
      content: {
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
      health: {
        default: null,
        type: cc.Label
      },
      attackSpeed: {
        default: null,
        type: cc.Label
      },
      moveSpeed: {
        default: null,
        type: cc.Label
      },
      level: {
        default: null,
        type: cc.Label
      },
      hunger: {
        default: null,
        type: cc.Label
      },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      this.updateLabel()
      this.initTalent()
      et.on(Enum.EVENT.NO_HUNGER,this.hungry)
      //当前前面主要按钮
      this.Btn_Forward = this.node.getChildByName('Btn_Forward')
      this.Btn_Search = this.node.getChildByName('Btn_Search')
      this.Btn_Make = this.node.getChildByName('Btn_Make')
      this.Btn_Rest = this.node.getChildByName('Btn_Rest')

      //按钮监听
      this.Btn_Forward.on('click', this.forward, this)
      this.Btn_Make.on('click', this.make, this)
      this.Btn_Search.on('click', this.search, this)
      this.Btn_Rest.on('click', this.rest, this)
    },

    hungry() {
      console.log('I am hungry!')
    },

    search() {
      console.log('......')
    },

    rest() {
      player.currentHunger += 20
      this.updateLabel()
    },

    make() {
      cc.director.loadScene('make')
    }, 
    
    // 前进按钮事件回调
    forward(button) {
      button.enabled = false
      this.content.string = ''
      if(player.currentHunger > 0) {
        command.goOut.execute(player)
        var event = command.goOut.getEvent()
      }else{
        var event = gameEvent.noEnergy()
      }
      const content = event.content
      let i = content.length - 1
      let index = 0
      this.labelSchedule(i,index,content)
      this.updateLabel()
    },

    labelInfo() {

    },

    // 文字出现效果
    labelSchedule(i,index,content) {
      this.schedule(() => {
        this.content.string = this.content.string + content[index]
        index++
        if(index>i) {
          this.Btn_Forward.getComponent(cc.Button).enabled = true
        }
      },0.08,i,0)
    },

    initTalent() {
      switch(player.talent) {
        case Enum.TALENT.学霸:
          player.knowledge = 2
          break
        case Enum.TALENT.强壮:
          player.sport = 2
          break
        case Enum.TALENT.多才:
          player.charm = 2
          break
      }
    },

    // 初始化人物属性面板
    updateLabel() {
      this.life.string = player.life
      this.attack.string = player.attack
      this.defence.string = player.defence
      this.knowledge.string = player.knowledge
      this.sport.string = player.sport
      this.charm.string = player.charm
      this.health.string = player.health
      this.attackSpeed.string = player.attackSpeed
      this.moveSpeed.string = player.moveSpeed
      this.hunger.string = '饥饿 ' + player.currentHunger + '/' + player.hunger
    },

    start () {

    },

    // update (dt) {},
});
