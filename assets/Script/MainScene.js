const player = require("PlayerManager")
const gameEvent = require("Event")
const et = require('Listener')
const Enum = require('Enum')
const Command = require('Command')
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
      time: {
        default: null,
        type: cc.Label
      },
      duraction: {
        default: null,
        type: cc.Label
      },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      this.initTalent()
      this.updateLabel()
      et.on(Enum.EVENT.NO_HUNGER,this.hungry)
      //当前前面主要按钮
      this.Btn_Forward = this.node.getChildByName('Btn_Forward')
      this.Btn_Search = this.node.getChildByName('Btn_Search')
      this.Btn_Make = this.node.getChildByName('Btn_Make')
      this.Btn_Rest = this.node.getChildByName('Btn_Rest')
      this.arrBtn = [this.Btn_Forward,this.Btn_Search,this.Btn_Make,this.Btn_Rest]

      //按钮监听
      this.Btn_Forward.on('click', this.forward, this)
      this.Btn_Make.on('click', this.make, this)
      this.Btn_Search.on('click', this.search, this)
      this.Btn_Rest.on('click', this.rest, this)
    },

    start () {

    },

    hungry() {
      console.log('I am hungry!')
    },

    // 探索事件
    search() {
      if(player.properties.currentHunger > 0) {
        let command = new Command(gameEvent.getSearchEvent())
        command.execute(player)
        var event = command.getEvent()
      }else {
        var event = gameEvent.noEnergy()
      }
      this.content.string = ''
      const content = event.content
      let i = content.length - 1
      let index = 0
      this.labelSchedule(i,index,content)
      this.updateLabel()
    },

    // 人物休息
    rest() {
      player.properties.currentHunger += 20
      this.updateLabel()
    },

    // 打开制造页
    make() {
      cc.director.loadScene('make')
    }, 

    // 前进按钮事件回调
    forward() {
      if(player.properties.currentHunger > 0) {
        let command = new Command(gameEvent.getRandomEvent())
        command.execute(player)
        var event = command.getEvent()
      }else {
        var event = gameEvent.noEnergy()
      }
      this.content.string = ''
      const content = event.content
      let i = content.length - 1
      let index = 0
      this.labelSchedule(i,index,content)
      this.updateLabel()
    },

    // 文字出现效果
    labelSchedule(i,index,content) {
      this.changeBtnState(this.arrBtn,i*0.08)
      this.schedule(() => {
        this.content.string = this.content.string + content[index]
        index++
        if(index>i) {
          this.changeBtnState(this.arrBtn, 1.0)
        }
      },0.08,i,0)
    },

    // 改变按钮状态
    changeBtnState(arr,dt) {
      for(let i=0; i<arr.length; i++) {
        arr[i].getComponent(cc.Button).enabled = 
        arr[i].getComponent(cc.Button).enabled ? false: true
        if(arr[i].getComponent(cc.Button).enabled == false) {
          let action1 = cc.fadeOut(dt)
          arr[i].runAction(action1)
        }else {
          let action2 = cc.fadeIn(dt)
          let action1 = cc.delayTime(0.2)
          let seq = cc.sequence(action1,action2)
          arr[i].runAction(seq)
        }
      }
    },

    // 人物天赋初始化
    initTalent() {
      switch(player.talent) {
        case Enum.TALENT.学霸:
          player.properties.knowledge = 2
          break
        case Enum.TALENT.强壮:
          player.properties.sport = 2
          break
        case Enum.TALENT.多才:
          player.properties.charm = 2
          break
      }
    },

    // 初始化人物属性面板
    updateLabel() {
      this.life.string = player.properties.life
      this.attack.string = player.properties.attack
      this.defence.string = player.properties.defence
      this.knowledge.string = player.properties.knowledge
      this.sport.string = player.properties.sport
      this.charm.string = player.properties.charm
      this.health.string = player.properties.health
      this.attackSpeed.string = player.properties.attackSpeed
      this.moveSpeed.string = player.properties.moveSpeed
      this.hunger.string = '饥饿 ' + player.properties.currentHunger + '/' + player.properties.hunger
      this.time.string = player.time + '分钟'
      this.duraction.string = player.duraction
    },

    // update (dt) {},
});
