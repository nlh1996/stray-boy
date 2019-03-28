import {STATUS,EVENT} from 'Enum'
import {Backpack} from './GoodsManager'
const et = require('Listener')
// 状态模式

// 状态基类
class BaseState {
  constructor() {
    this.event = []
    this.abnormalEvent = [
      {about:'处于饥饿状态，您需要进食！'},
      {about:'没有精力啦，您需要休息！'},
    ]
  }
  doSomething(obj) {
    return
  }
  // 异常状态事件
  abnormalState(obj,status) {
    if(status == STATUS.NO_HUNGER) {
      obj.currentEvent = this.abnormalEvent[0]
    }
    if(status == STATUS.NO_ENERGY) {
      obj.currentEvent = this.abnormalEvent[1]
    }
  }
}

// 探索状态
class Search extends BaseState {
  constructor() {
    super()
    this.event = [
      {about:'收集到【木材】*3', code: [503]},
      {about:'收集到【药草】*3', code: [603]},
      {about:'收集到【生肉】*3', code: [703]},
      {about:'收集到【果子】*3', code: [803]},
    ]
  }
  doSomething(obj) {
    let status = obj.consume(5,5,0.5)
    if(status == STATUS.STATUS_OK) {
      this.getSearchEvent(obj)
      // 获得物品
      if(obj.currentEvent.code) {
        Backpack.getInstance().setProperty(obj.currentEvent.code)
      }
    }else {
      this.abnormalState(obj,status)
    }
  }
  // 获取探索事件
  getSearchEvent(obj) {
    let pro = Math.floor(Math.random()*100) 
    if(30+obj.properties.charm >= pro) {
      let i = Math.floor(Math.random()*4)
      obj.currentEvent = this.event[i]
    } else {
      obj.currentEvent = {about: '很可惜，什么都没有发现。。。', code: [100]}
    }
  }
}

// 前进状态
class Forward extends BaseState {
  constructor() {
    super()
    this.event = [
      {about:'收集到【木材】*3', code: [503]},
      {about:'收集到【药草】*3', code: [603]},
      {about:'收集到【生肉】*3', code: [703]},
      {about:'收集到【果子】*3', code: [803]},
    ]
    this.plot = [
      {about:'前方发现一个山洞', id: 5, result: {id:101, num:1}},
      {about:'发现地上有五块钱，是否捡起', id: 6, result: {id:101, num:1}}
    ]
  }

  doSomething(obj) {
    let status = obj.consume(10,10,1)
    if(status == STATUS.STATUS_OK) {
      // 角色前进
      obj.forward()
      let res = this.getPlotEvent(obj)
      if(!res) {
        this.getForwardEvent(obj)
      }
    }else {
      this.abnormalState(obj,status)
    }
  }

  // 一定几率触发特殊事件
  getPlotEvent(obj) {
    for(let i=0; i<obj.properties.currentPlace.arr.length; i++) {
      for(let x=0; x<this.plot.length; x++) {
        if(obj.properties.currentPlace.arr[i] == this.plot[x].id) {
          console.log(this.plot[x].about)
          obj.currentEvent = this.plot[x]
          return true
        }
      }
    }
    return false
  }

  // 前进事件
  getForwardEvent(obj) {
    let pro = Math.floor(Math.random()*100) 
    // 发现物品或者遇敌
    if(10 + obj.properties.charm >= pro) {
      let i = Math.floor(Math.random()*this.event.length)
      obj.currentEvent = this.event[i]
      Backpack.getInstance().setProperty(obj.currentEvent.code)
    } else {
      obj.currentEvent = null
      et.emit(EVENT.COMBAT)
    }
  }
}


// 状态管理
class StateMng {
  constructor() {
    this.stateArr = []
  }
  init() {
    this.stateArr[0] = new Search() 
    this.stateArr[1] = new Forward() 
  }
  getState(num) {
    return this.stateArr[num]
  }
}

const stateMng = new StateMng()
stateMng.init()

export default stateMng