// 本脚本为游戏的主要逻辑脚本
import player from './PlayerManager'
const et = require('Listener')
import {TALENT,EVENT,GAME_SCENE,STATE} from 'Enum'
import GameSceneMng from './GameSceneMng'

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
      hunger: {
        default: null,
        type: cc.Label
      },
      energy: {
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
      place: {
        default: null,
        type: cc.Label
      },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      //this.initTalent()
      this.updateLabel()
      //当前界面主要按钮
      this.node1 = this.node.getChildByName('Node1')
      this.Btn_Forward = this.node1.getChildByName('Btn_Forward')
      this.Btn_Search = this.node1.getChildByName('Btn_Search')
      this.Btn_Make = this.node1.getChildByName('Btn_Make')
      this.Btn_Rest = this.node1.getChildByName('Btn_Rest')
      this.Btn_Eat = this.node1.getChildByName('Btn_Eat')
      this.arrBtn = [this.Btn_Forward,this.Btn_Search,this.Btn_Make,this.Btn_Rest,this.Btn_Eat]

      //按钮监听
      this.Btn_Forward.on('click', this.forward, this)
      this.Btn_Make.on('click', this.openMake, this)
      this.Btn_Search.on('click', this.search, this)
      this.Btn_Rest.on('click', this.rest, this)
      this.Btn_Eat.on('click', this.opneBackpack, this)

      //注册监听事件
      et.on(EVENT.NO_HUNGER, this.hungry)
      //每次加载组件都重新注册
      et.on(EVENT.COMBAT, () => { 
        this.node1.active = false
      })
      et.on(EVENT.WIN, () => {
        this.node1.active = true
      })
      et.on(EVENT.HURT, this.updateLabel, this)
      et.on(EVENT.UPGRADE, this.upGrade, this)
      et.on(EVENT.FINISH, () => {
        this.node1.active = true
      })
    },

    onDestroy() {
      //注销先前的事件，确保新注册的事件this总是指向当前组件
      et.off(EVENT.COMBAT)
      et.off(EVENT.WIN)
      et.off(EVENT.FINISH)
      et.off(EVENT.UPGRADE)
      et.off(EVENT.HURT)
    },

    //升级显示加点UI
    upGrade() {
      this.node1.active = false
    },

    start () {
    },

    hungry() {
      console.log('I am hungry!')
    },

    // 探索事件
    search() {
      // 设置玩家当前状态为探索
      player.setState(STATE.SEARCH)
      // 获得玩家当前事件描述
      const event = player.getCurrentEvent()
      if(event) {
        this.labelSchedule(event.about)
      }
      this.updateLabel()
    },

    // 前进按钮事件回调
    forward() {
      player.setState(STATE.FORWARD)
      const event = player.getCurrentEvent()
      if(event) {
        this.labelSchedule(event.about)
      }
      this.updateLabel()
    },

    // 人物休息
    rest() {
      player.rest()
      this.updateLabel()
    },

    // 打开制造页
    openMake() {
      GameSceneMng.getInstance().setGameScene(GAME_SCENE.MAKE)
    }, 

    opneBackpack() {
      GameSceneMng.getInstance().setGameScene(GAME_SCENE.GOOD_LIST)
    },

    // 文字出现效果
    labelSchedule(content) {
      this.content.string = ''
      let index = 0
      let i = content.length - 1
      this.changeBtnState(this.arrBtn, i*0.08)
      this.schedule(() => {
        this.content.string = this.content.string + content[index]
        index++
        if(index>i) {
          this.changeBtnState(this.arrBtn, 1.0)
        }
      },0.08,i,0)
    },

    // 按钮状态改变
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
          let seq = cc.sequence(action1, action2)
          arr[i].runAction(seq)
        }
      }
    },

    // 人物天赋初始化
    initTalent() {
      switch(player.properties.talent) {
        case TALENT.学霸:
          player.properties.knowledge = 2
          break
        case TALENT.强壮: 
          player.properties.sport = 2
          break
        case TALENT.多才:
          player.properties.charm = 2
          break
      }
    },

    // 更新人物属性面板
    updateLabel() {
      this.life.string = player.properties.life
      this.health.string = player.properties.health
      this.attackSpeed.string = player.properties.attackSpeed
      this.moveSpeed.string = player.properties.moveSpeed
      this.hunger.string = '饥饿 ' + player.properties.currentHunger + '/' + player.properties.hunger
      this.energy.string = '精力 ' + player.properties.currentEnergy + '/' + player.properties.energy
      this.time.string = player.hour + '小时'
      this.duraction.string = player.duraction
      this.place.string = player.properties.currentPlace
    },

    // // 计时器
    // update (dt) {
    //   player.dt += 1
    //   if(player.dt == 60) {
    //     player.dt = 0
    //     player.second += 1
    //     if(player.duraction <= 0) {
    //       GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME_OVER)
    //     }
    //   }
    //   if(player.second == 60) {
    //     player.second = 0
    //     player.minute += 1
    //   }
    //   if(player.minute == 60) {
    //     player.minute = 0
    //     player.hour += 1
    //   }
    //   this.updateTime()
    // },

    // // 显示时间
    // updateTime() {
    //   if(player.second < 10) {
    //     var second = '0' + player.second
    //   }else {
    //     var second = player.second
    //   }
    //   if(player.minute < 10) {
    //     var minute = '0' + player.minute
    //   }else {
    //     var minute = player.minute
    //   }
    //   if(player.hour < 10) {
    //     var hour = '0' + player.hour
    //   }else {
    //     var hour = player.hour
    //   }
    //   this.time.string = hour + ':' + minute + ':' + second
    //   this.duraction.string = player.duraction
    // }
});
