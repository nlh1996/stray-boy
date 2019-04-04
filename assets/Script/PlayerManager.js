// 本脚本定义了角色的所有属性以及行为
const et = require('Listener')
import {EVENT,GAME_SCENE,STATUS} from 'Enum'
import GameSceneMng from './GameSceneMng'
import stateMng from './State'
import {Backpack} from './GoodsManager'
import map from '../Conf/map'
import talent from '../Conf/talent'

class PlayerManager {
  // 成员变量
  constructor() {
    // 人物属性
    this.properties = {
      exp: 10,
      level: 1,
      life: 200,
      maxlife: 200,
      attack: 20,
      defence: 10,
      knowledge: 10,
      sport: 10,
      charm: 10,
      health: 100,
      attackSpeed: 2,
      moveSpeed: 5,
      hunger: 100,
      currentHunger: 100,
      energy: 100,
      currentEnergy: 100,
      currentPlace: {name:'孙庄'},
      moveDuration: 0,
      talent: null
    },

    // 地图
    this.map = map
    // this.dt = 0
    // this.second = 0
    // this.minute = 0
    this.hour = 0
    this.duraction = 300
    this.mstMoveSpeed = 1
    this.mstattackSpeed = 2
    this._state = {}
    this.currentEvent = {}
  }

  init(id) {
    let index = id-1
    this.properties.life = talent[index].life
    this.properties.maxlife = talent[index].life
    this.properties.attack = talent[index].attack
    this.properties.defence = talent[index].defence
    this.properties.knowledge = talent[index].knowladge
    this.properties.sport = talent[index].sport
    this.properties.charm = talent[index].charm
  }

  getCurrentEvent() {
    return this.currentEvent
  }

  Save() {
    cc.sys.localStorage.setItem('userData', JSON.stringify(this))
  }

  Get() {
    const userData = JSON.parse(cc.sys.localStorage.getItem('userData'))
    return userData
  }

  // 设置角色状态
  setState(num) {
    this._state = stateMng.getState(num)
    if(this._state) {
      this._state.doSomething(this)
    }
  }

  // 执行战斗
  combat(mst) {
    // 角色攻击
    if(this.properties.attack>mst.defence) {
      var damage1 = this.properties.attack-mst.defence
    }else {
      var damage1 = 1
    }
    mst.life -= damage1
    // 怪物死亡
    if(mst.life <= 0) {
      et.emit(EVENT.WIN)
      return [damage1, 0]
    }

    // 怪物反击
    if(mst.attack>this.properties.attack) {
      var damage2 = mst.attack-this.properties.defence
    }else {
      var damage2 = 1
    }
    this.properties.life -= damage2
    // 人物死亡
    if(this.properties.life <= 0) {
      GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME_OVER)
    }

    et.emit(EVENT.HURT)
    // 返回伤害值
    return [damage1, damage2]
  }

  // 角色休息
  rest() {
    let diff = this.properties.energy - this.properties.currentEnergy
    this.hour = (this.hour*100 + diff*8)/100
    console.log(this.hour)
    this.properties.currentEnergy = 100
  }

  // 战斗获胜结算
  win(mst) {
    this.properties.exp += mst.exp
  }

  // 执行逃跑
  runAway() {
    GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
  }

  // 角色消耗精力，饥饿,时间
  consume(energy,hunger,hour) {
    this.hour += hour
    // 僵尸前进
    this.duraction -= this.mstMoveSpeed
    if(this.duraction <= 0) {
      et.emit(EVENT.GAMEOVER)
    } 
    if(this.properties.currentEnergy>=energy && this.properties.currentHunger>=hunger) {
      this.properties.currentEnergy -= energy
      this.properties.currentHunger -= hunger
      return STATUS.STATUS_OK
    }
    if(this.properties.currentEnergy<energy) {
      return STATUS.NO_ENERGY
    }
    if(this.properties.currentHunger<hunger) {
      return STATUS.NO_HUNGER
    }
  }

  // 角色进食
  eat(food) {
    let result = ''
    if(food.effect&&this.properties.currentHunger < this.properties.hunger) {
      this.properties.currentHunger += food.effect[1]
      if(this.properties.currentHunger > this.properties.hunger) {
        this.properties.currentHunger = this.properties.hunger
      }
      result = EVENT.HUNGER
      Backpack.getInstance().consume(food.id)
    } else {
      result = EVENT.FULL
    }
    return result
  }

  // 角色前进
  forward() {
    this.duraction += this.properties.moveSpeed
    this.properties.moveDuration += this.properties.moveSpeed
    this.where(this.properties.moveDuration)
  }

  // 加点
  jiadian(type) {
    switch(type) {
      case '智商':
        this.properties.knowledge++
      break
      case '情商':
        this.properties.charm++
      break
      case '体质':
        this.properties.sport++
        this.properties.attack += 2
        this.properties.defence += 1
        this.properties.life += 20
        this.properties.maxlife += 20
      break
    }
  }
  
  // 我在哪
  where(duraction) {
    for(let i=0; i<this.map.length; i++) {
      if(this.map[i].duraction>duraction) {
        let index = i - 1
        if(this.properties.currentPlace == this.map[index].name) {
          return
        }else {
          this.properties.currentPlace = this.map[index]
          console.log(this.properties.currentPlace.name + '欢迎你的到来！')
          return
        }
      }
    }
  }
}

export default new PlayerManager()
