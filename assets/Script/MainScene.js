// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
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
      // et.on(Enum.EVENT.NO_ENERGY,() => {
      //   this.node.getChildByName('Btn_Sleep').active = true
      // })

      //注册事件
      var listener1 = new et.Listener()
      var listener2 = new et.Listener()
      listener1.on('事件一',this.callback1)
      listener2.on('事件二',this.callback2)
      // 注销事件一
      listener1.off('事件一')

      //按钮监听
      this.node.getChildByName('Btn_Forward').on('click', this.goForward, this)
    },

    callback1() {
      console.log('事件一收到！')
    },
    
    callback2() {
      console.log('事件二收到！')
    },

    // 前进按钮事件回调
    goForward(button) {
      // 分发事件，只有事件二分发成功，事件一被注销了。
      et.watcher.dispatch('事件一')
      et.watcher.dispatch('事件二')

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

    // 文字出现
    labelSchedule(i,index,content) {
      this.schedule(() => {
        this.content.string = this.content.string + content[index]
        index++
        if(index>i) {
          this.node.getChildByName('Btn_Forward').getComponent(cc.Button).enabled = true
        }
      },0.08,i,0)
    },

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
