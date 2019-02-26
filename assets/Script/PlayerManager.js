const et = require('Listener')
const Enum = require('Enum')

var PlayerManager = cc.Class({
  // 成员变量
  ctor() {
    this.life = 1000
    this.attack = 10
    this.defence = 10
    this.knowledge = 0
    this.sport = 0
    this.charm = 0
    this.health = 0
    this.attackSpeed = 10
    this.moveSpeed = 100
    this.hunger = 100
    this.currentHunger = 90
    this.time = 0
    this.duraction = 1000
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
        case 100:
          this.duraction -= 50
          break
        case 111:
          if(this.currentHunger > 0) {
            this.currentHunger -= 10
          }
          if(this.currentHunger == 0) {
            et.emit(Enum.EVENT.NO_HUNGER)
            return
          }
          break
        case 121:

          break
        case 201:
          this.duraction += this.moveSpeed
          break
        case 202:

          break
        case 402:

          break
      }
    }
  }
})

var player = new PlayerManager()

module.exports = player 