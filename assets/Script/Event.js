// 所有游戏事件都在本脚本内
var Event = cc.Class({
  ctor() {
    this.RandomEvent = [
    {content:'遇到一只狗！【狗肉+2】', code: [100,111,201]},
    {content:'踩到大便！！【幸运-1】', code: [100,111,201]},
    {content:'捡了一毛钱！【幸运+1，金钱+0.1】', code: [100,111,201]}] 
    this.SureEvent = []
    this.ConditionalEvent = []
    this.SearchEvent = [
      {content:'收集到【木材】*3', code: [100,111,503]},
      {content:'收集到【药草】*3', code: [100,111,603]},
      {content:'收集到【生肉】*3', code: [100,111,703]},
    ]
    this.ErrorEvent = [{content:'没有精力了，您需要休息！'}]
  },
  getRandomEvent() {
    let i = Math.floor(Math.random()*3)
    return this.RandomEvent[i]
  },
  getSearchEvent() {
    let i = Math.floor(Math.random()*3)
    return this.SearchEvent[i]
  },
  noEnergy() {
    return this.ErrorEvent[0]
  }
})

var gameEvent = new Event()
module.exports = gameEvent