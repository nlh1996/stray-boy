const et = require('Listener')
const Enum = require('Enum')

var PlayerManager = cc.Class({
  // 成员变量
  ctor() {
    this.properties = {
      life: 1000,
      attack: 10,
      defence: 10,
      knowledge: 0,
      sport: 0,
      charm: 0,
      health: 0,
      attackSpeed: 10,
      moveSpeed: 100,
      hunger: 100,
      currentHunger: 100,
    },
    this.materials = {
      raw_meat: 0, //生肉
      fruit: 0,    //果子
      herb: 0,     //草药
      wood: 0,     //木材
      sulphur: 0,  //硫磺
      leather: 0,  //皮革
    }
    this.goods = {
      cooked_meat: 0,  //熟肉
      drug: 0,         //药品
    }
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
  
  setProperty(code) {
    for(let i=0; i<code.length; i++) {
      switch(code[i]) {
        case 100:
          this.duraction -= 50
          break
        case 111:
          if(this.properties.currentHunger > 0) {
            this.properties.currentHunger -= 10
          }
          if(this.properties.currentHunger == 0) {
            et.emit(Enum.EVENT.NO_HUNGER)
            return
          }
          break
        case 121:

          break
        case 201:
          this.duraction += this.properties.moveSpeed
          break
        case 202:

          break
        case 402:

          break
        case 503:
          this.materials.wood += 3
          break
        case 603:
          this.materials.herb += 3
          break
        case 703:
          this.materials.raw_meat += 3
          break
      }
    }
  }
})

var player = new PlayerManager()

module.exports = player