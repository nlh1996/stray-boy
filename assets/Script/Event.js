var Event = cc.Class({
  ctor() {
    this.RandomEvent = [
    {content:'遇到一只狗！【幸运-1】',code: [111,201,121]},
    {content:'踩到大便！！【幸运-1】',code: [111,201,121]},
    {content:'捡了一毛钱！【幸运+1，金钱+0.1】',code: [111,202,402,121]}] 
    this.SureEvent = []
    this.ConditionalEvent = []
    this.ErrorEvent = [{content:'没有精力了，您需要休息！'}]
  },
  getRandomEvent() {
    let i = Math.floor(Math.random()*3)
    return this.RandomEvent[i]
  },
  noEnergy() {
    return this.ErrorEvent[0]
  }
})

var gameEvent = new Event()
module.exports = gameEvent