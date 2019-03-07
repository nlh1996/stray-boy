// 所有游戏事件都在本脚本内
var Event = cc.Class({
  ctor() {
    this.RandomEvent = [
      {content:'遇到一只白毛僵尸！！', code: [100,101,111] ,type: 'combat'},
      {content:'遇到一只丧失狗！！！', code: [100,101,111]},
      {content:'遇到一只僵尸王！！！', code: [100,101,111]}
    ] 
    this.SureEvent = []
    this.ConditionalEvent = []
    this.SearchEvent = [
      {content:'收集到【木材】*3', code: [100,111,503]},
      {content:'收集到【药草】*3', code: [100,111,603]},
      {content:'收集到【生肉】*3', code: [100,111,703]},
      {content:'收集到【果子】*3', code: [100,111,803]},
    ]
    this.ErrorEvent = [{content:'处于饥饿状态，您需要进食！'}]
  },

  getRandomEvent() {
    let i = Math.floor(Math.random()*3)
    return this.RandomEvent[i]
  },

  getSearchEvent() {
    let i = Math.floor(Math.random()*4)
    return this.SearchEvent[i]
  },
  
  noEnergy() {
    return this.ErrorEvent[0]
  }
})

var gameEvent = new Event()
module.exports = gameEvent