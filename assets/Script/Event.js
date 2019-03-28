// 所有游戏事件都在本脚本内
import {STATUS} from 'Enum'
var Event = cc.Class({
  ctor() {
    this.RandomEvent = [
      {content:'遇到一只白毛僵尸！！', type: 'combat'},
      {content:'遇到一只丧尸狗！！！', },
      {content:'遇到一只僵尸王！！！', type: 'combat'}
    ] 
    this.SureEvent = []

    this.SearchEvent = [
      {content:'收集到【木材】*3', code: [503]},
      {content:'收集到【药草】*3', code: [603]},
      {content:'收集到【生肉】*3', code: [703]},
      {content:'收集到【果子】*3', code: [803]},
    ]
  },

  // 获取随机事件
  getRandomEvent() {
    let i = Math.floor(Math.random()*3)
    return this.RandomEvent[i]
  },



  // 前进事件
  getForwardEvent(probability) {
    let pro = Math.floor(Math.random()*100) 
    if(probability >= pro) {
      let i = Math.floor(Math.random()*this.SearchEvent.length)
      return this.SearchEvent[i]
    }
    return null
  },
  
  // 异常状态事件
  abnormalState(status) {
    if(status == STATUS.NO_HUNGER) {
      return this.ErrorEvent[0]
    }
    if(status == STATUS.NO_ENERGY) {
      return this.ErrorEvent[1]
    }
  }
})

var gameEvent = new Event()
module.exports = gameEvent