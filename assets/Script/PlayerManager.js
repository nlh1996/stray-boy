// 本脚本定义了角色的所有属性以及行为
const et = require('Listener')
import {MATERIALS,EVENT,GAME_SCENE,STATUS} from 'Enum'
import GameSceneMng from './GameSceneMng'
import stateMng from './State'

class PlayerManager {
  // 成员变量
  constructor() {
    // 人物属性
    this.properties = {
      life: 200,
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
      currentPlace: '孙庄',
      moveDuration: 0
    },
    
    // 材料
    this.materials = {
      raw_meat: {num: 0, name: '生肉'}, 
      fruit: {num: 0, hunger: 20, name: '果子'},    
      herb: {num: 0, name: '草药'},     
      wood: {num: 0, name: '木材'},     
      sulphur: {num: 0, name: '硫磺'},  
      leather: {num: 0, name: '皮革'},  
    }

    // 成品
    this.goods = {
      cooked_meat: {name: '熟肉', num: 0, needs: [{type: MATERIALS.RAW_MEAT, num: 1}, {type: MATERIALS.WOOD, num: 1}],success: 70 ,hunger: 70},  
      drug: {name: '药品', num: 0, needs: [{type: MATERIALS.HERB, num: 2}], success: 70, life: 30},  
      tent: {name: '帐篷', num: 0, needs: []},
      corselet: {name: '皮甲', num: 0, needs: []}
    }

    // 地图
    this.map = [
      {name:'孙庄' ,duraction: 0},
      {name:'仁桥' ,duraction: 10},
      {name:'双楼' ,duraction: 20},
      {name:'曲塘' ,duraction: 30},
      {name:'白米' ,duraction: 40},
      {name:'姜堰' ,duraction: 50},
      {name:'黄桥' ,duraction: 75},
      {name:'泰州' ,duraction: 100},
      {name:'扬州' ,duraction: 150},
      {name:'仪征' ,duraction: 180},
      {name:'南京' ,duraction: 200},
      {name:'滁州' ,duraction: 250},
      {name:'合肥' ,duraction: 300},
      {name:'六安' ,duraction: 350},
      {name:'金寨' ,duraction: 400},
      {name:'麻城' ,duraction: 450},
      {name:'武汉' ,duraction: 500},
      {name:'天门' ,duraction: 550},
      {name:'荆州' ,duraction: 600},
      {name:'宜昌' ,duraction: 650},
      {name:'恩施' ,duraction: 700},
      {name:'涪陵' ,duraction: 800},
      {name:'重庆' ,duraction: 1000},
      {name:'自贡' ,duraction: 1200},
      {name:'内江' ,duraction: 1500},
      {name:'雅安' ,duraction: 1800},
      {name:'林芝' ,duraction: 2500},
      {name:'西藏' ,duraction: 4000},
    ]

    this.dt = 0
    this.second = 0
    this.minute = 0
    this.hour = 0
    this.duraction = 300
    this.mstMoveSpeed = 1
    this.mstattackSpeed = 2
    this._state = {}
  }

  Save() {
    cc.sys.localStorage.setItem('userData', JSON.stringify(this))
  }

  Get() {
    const userData = JSON.parse(cc.sys.localStorage.getItem('userData'))
    return userData
  }

  // 判断制造是否满足物品制造需求
  validate(good) {
    for(let i=0; i<good.needs.length; i++) {
      switch(good.needs[i].type) {
        case MATERIALS.RAW_MEAT:
          if(this.materials.raw_meat.num < good.needs[i].num) {
            return false
          }
          break
        case MATERIALS.WOOD:
          if(this.materials.wood.num < good.needs[i].num) {
            return false
          }
          break
        case MATERIALS.HERB:
          if(this.materials.herb.num < good.needs[i].num) {
            return false
          }
          break
        case MATERIALS.FRUIT:
          if(this.materials.fruit.num < good.needs[i].num) {
            return false
          }
          break
        case MATERIALS.SULPHUR:
          if(this.materials.sulphur.num < good.needs[i].num) {
            return false
          }
          break
        case MATERIALS.LEATHER:
          if(this.materials.leather.num < good.needs[i].num) {
            return false
          }
          break
      }      
    }
    return true
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
    // 怪物死亡
    if(mst.life <= 0) {
      et.emit(EVENT.WIN)
    }
    et.emit(EVENT.HURT)
    // 返回伤害值
    return [damage1,damage2]
  }

  // 执行逃跑
  runAway() {
    GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
  }

  // 玩家消耗精力，饥饿
  consume(energy,hunger) {
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

  // 制造物品
  make(good) {
    for(let i=0; i<good.needs.length; i++) {
      switch(good.needs[i].type) {
        case MATERIALS.RAW_MEAT:
          this.materials.raw_meat.num -= good.needs[i].num
          break
        case MATERIALS.WOOD:
          this.materials.wood.num -= good.needs[i].num
          break
        case MATERIALS.HERB:
          this.materials.herb.num -= good.needs[i].num
          break
      }
    }
    good.num += 1
  }

  // 玩家进食
  eat(good) {
    let result = ''
    if(good.hunger&&this.properties.currentHunger < this.properties.hunger) {
      this.properties.currentHunger += good.hunger
      if(this.properties.currentHunger > this.properties.hunger) {
        this.properties.currentHunger = this.properties.hunger
      }
      result = EVENT.HUNGER
      good.num -= 1
    } else {
      result = EVENT.FULL
    }
    if(good.life) {
      this.properties.life += good.life
      good.num -= 1
      result = ''
    }
    return result
  }

  // 属性改变
  setProperty(code) {
    for(let i=0; i<code.length; i++) {
      switch(code[i]) {
        // 僵尸移动
        case 100:
          this.duraction -= this.mstMoveSpeed
          if(this.duraction <= 0) {
            et.emit(EVENT.GAMEOVER)
          } 
          break
        // 角色前进
        case 101:
          this.duraction += this.properties.moveSpeed
          this.properties.moveDuration += this.properties.moveSpeed
          this.where(this.properties.moveDuration)
          break

        case 201:

          break

        case 202:

          break
        case 402:

          break
        case 503:
          this.materials.wood.num += 3
          break
        case 603:
          this.materials.herb.num += 3
          break
        case 703:
          this.materials.raw_meat.num += 3
          break
        case 803:
          this.materials.fruit.num += 3
          break
      }
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
          this.properties.currentPlace = this.map[index].name
          console.log(this.properties.currentPlace + '欢迎你的到来！')
          return
        }
      }
    }
  }
}

export default new PlayerManager()
