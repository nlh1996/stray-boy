const et = require('Listener')
// 普通单例_饿汉模式
var PlayerManager = cc.Class({
  // 成员变量
  ctor() {
    this.health = 0
    this.luck = 0
    this.achievement = 0
    this.money = 0
    this.knowledge = 0
    this.sport = 0
    this.charm = 0
    this.game = 0
    this.classRank = 0
    this.talent = 0
    this.date = 1
    this.energy = 60
    this.currentEnergy = 60
    this.time = 8
  },

  Save() {
    cc.sys.localStorage.setItem('userData', JSON.stringify(this))
  },

  Get() {
    const userData = JSON.parse(cc.sys.localStorage.getItem('userData'))
    return userData
  }, 
  
  Score(code) {
    for(let i=0; i<code.length; i++) {
      switch(code[i]) {
        case 111:
          if(this.currentEnergy > 0) {
            this.currentEnergy -= 10
          }else{
            et.emit('fire',event)
          }
          break
        case 121:
          this.time += 1
          break
        case 201:
          this.luck -= 1
          break
        case 202:
          this.luck += 1
          break
        case 402:
          this.money = (this.money*10 + 0.1*10) / 10
          break
      }
    }
  }
})

var player = new PlayerManager()

module.exports = player 