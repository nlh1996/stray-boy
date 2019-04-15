import {STATUS,EVENT} from 'Enum'
import {Backpack} from './GoodsManager'
import sleep from '../Conf/sleep'
import plot from '../Conf/plot'
import goods from '../Conf/goods'
const et = require('Listener')
// 有限状态机

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
      obj.setCurrentEvent(this.abnormalEvent[0])
    }
    if(status == STATUS.NO_ENERGY) {
      obj.setCurrentEvent(this.abnormalEvent[1])
    }
  }
}

// 探索状态
class Search extends BaseState {
  constructor() {
    super()
    this.event = [
      {about:'收集到【木材】*1', result: {'0': 104,'1': 1}},
      {about:'收集到【药草】*1', result: {'0': 103,'1': 1}},
      {about:'收集到【瘦肉】*1', result: {'0': 101,'1': 1}},
      {about:'收集到【果子】*1', result: {'0': 102,'1': 1}},
    ]
  }
  doSomething(obj) {
    obj.lackGood('遮阳帽')
    let status = obj.consume(5,5,0.5)
    if(status == STATUS.STATUS_OK) {
      this.getSearchEvent(obj)
      // 获得物品
      Backpack.getInstance().setProperty(obj.getCurrentEvent().result)
    }else {
      this.abnormalState(obj,status)
    }
  }
  // 获取探索事件
  getSearchEvent(obj) {
    let pro = Math.floor(Math.random()*100) 
    if(obj.properties.charm*3 >= pro) {
      let i = Math.floor(Math.random()*4)
      obj.currentEvent = this.event[i]
    } else {
      const event = {about: '很可惜，什么都没有发现。。。', result: {'0': 0,'1': 0}}
      obj.setCurrentEvent(event)
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
    this.plot = plot
  }

  doSomething(obj) {
    obj.lackGood('遮阳帽')
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
    let pro = Math.floor(Math.random()*100)
    console.log(pro)
    if(pro<obj.properties.currentPlace.pro*obj.properties.charm) {
      for(let i=0; i<this.plot.length; i++) {
        let res = 0
        if(this.plot[i].condition1 == 0) {
          res++
        }else {
          if(this.plot[i].condition1 == obj.properties.talent) {
            res++
          }
        }

        if(JSON.stringify(this.plot[i].condition2) == "{}") {
          res++
        }else {
          if(this.plot[i].condition2[0] == 12) {
            if(this.plot[i].condition2[1] >= obj.properties.sport) {
              res++
            }
          }
          if(this.plot[i].condition2[0] == 11) {
            if(this.plot[i].conditon2[1] >= obj.properties.charm) {
              res++
            }
          }
          if(this.plot[i].condition2[0] == 10) {
            if(this.plot[i].condition2[1] >= obj.properties.knowledge) {
              res++
            }
          }
        }

        if(this.plot[i].condition3 == 0) {
          res++
        }else {
          if(this.plot[i].condition3>obj.properties.currentPlace.id) {
            res++
          }
        }

        if(this.plot[i].condition4 == 0) {
          res++
        }else {
          if(this.plot[i].condition4<obj.day) {
            res++
          }
        }
        if(res == 4) {
          obj.setCurrentEvent(this.plot[i])
          et.emit(EVENT.CHOOSE)
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
      obj.setCurrentEvent(this.event[i])
      Backpack.getInstance().setProperty(obj.currentEvent.code)
    } else {
      obj.setCurrentEvent(null)
      et.emit(EVENT.BEFORE_COMBAT)
    }
  }
}

// 睡眠状态
class Sleep extends BaseState { 
  constructor() {
    super()
    this.event = sleep
  }

  doSomething(obj) {
    obj.lackGood('帐篷')
    obj.rest()
    let res = this.getPlotEvent(obj)
    if(!res) {
      const event = {about: "睡了一觉，又是元气满满!!！"}
      obj.setCurrentEvent(event)
    }
  }

  getPlotEvent(obj) {
    for(let i = 0; i<this.event.length; i++) {
      if (this.event[i].condition1 == obj.properties.currentPlace.id) {
        obj.setCurrentEvent(this.event[i])
        if(this.event[i].primary == true) {
          this.event.splice(i,1)
        }
        return true
      }
      if(this.event[i].condition1 == 0 &&this.event[i].condition2 == obj.day) {
        obj.setCurrentEvent(this.event[i])
        if(this.event[i].primary == true) {
          this.event.splice(i,1)
        }
        return true
      }
    }
    return false
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
    this.stateArr[2] = new Sleep() 
  }
  getState(num) {
    return this.stateArr[num]
  }
} 

const stateMng = new StateMng()
stateMng.init()

export default stateMng