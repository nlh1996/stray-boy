var Event = cc.Class({
  ctor() {
    this.RandomEvent = ['遇到一只狗！','踩到大便！！','捡了一毛钱！'] 
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