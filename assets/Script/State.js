import {STATUS} from 'Enum'
import {Backpack} from './GoodsManager'
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
  abnormalState(status) {
    if(status == STATUS.NO_HUNGER) {
      obj.currentEvent = this.abnormalEvent[0]
    }
    if(status == STATUS.NO_ENERGY) {
      obj.currentEvent = this.abnormalEvent[1]
    }
  }
}

// 战斗状态
class Combat extends BaseState {
  constructor() {
    super()

  }
  doSomething(obj) {
    obj.consume()
    obj.combat()
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
      this.abnormalState(status)
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
class GoForward extends BaseState {
  constructor() {
    super()
  }
  doSomething(obj) {

  }
}

// 剧情
class PlotState extends BaseState {
  constructor() {
    super()
  }
  doSomething(obj) {
    obj.runAway()
  }
}

// 状态管理
class StateMng {
  constructor() {
    this.stateArr = []
  }
  init() {
    this.stateArr[0] = new Search() 
  }
  getState(num) {
    return this.stateArr[num]
  }
}

const stateMng = new StateMng()
stateMng.init()

export default stateMng