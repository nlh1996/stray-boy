var Event = cc.Class({
  ctor() {
    this.RandomEvent = [
    {content:'遇到一只狗！【幸运-1】',code: [201,111,121]},
    {content:'踩到大便！！【幸运-1】',code: [201,111,121]},
    {content:'捡了一毛钱！【幸运+1，金钱+0.1】',code: [202,402,111,121]}] 
    this.SureEvent = []
    this.ConditionalEvent = []
  },
  getRandomEvent() {
    let i = Math.floor(Math.random()*3)
    return this.RandomEvent[i]
  }
})

var gameEvent = new Event()
module.exports = gameEvent