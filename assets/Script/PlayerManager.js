const et = require('Listener')
const Enum = require('Enum')

var PlayerManager = cc.Class({
  // 成员变量
  ctor() {
    // 人物属性
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
    
    // 材料
    this.materials = {
      raw_meat: 0, //生肉
      fruit: 0,    //果子
      herb: 0,     //草药
      wood: 0,     //木材
      sulphur: 0,  //硫磺
      leather: 0,  //皮革
    }

    // 成品
    this.goods = {
      cooked_meat: {num: 0, needs: [{type: Enum.MATERIALS.RAW_MEAT, num: 1}, {type: Enum.MATERIALS.WOOD, num: 1}],success: 70},  //熟肉
      drug: {num: 0, needs: [{type: Enum.MATERIALS.HERB, num: 2}], success: 70},  //药品
      tent: {num: 0, needs: []},
      corselet: {num: 0, needs: []}
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

  // 判断制造是否满足物品制造需求
  validate(good) {
    for(let i=0; i<good.needs.length; i++) {
      switch(good.needs[i].type) {
        case Enum.MATERIALS.RAW_MEAT:
          if(this.materials.raw_meat < good.needs[i].num) {
            return false
          }
          break
        case Enum.MATERIALS.WOOD:
          if(this.materials.wood < good.needs[i].num) {
            return false
          }
          break
        case Enum.MATERIALS.HERB:
          if(this.materials.herb < good.needs[i].num) {
            return false
          }
          break
        case Enum.MATERIALS.FRUIT:
          if(this.materials.fruit < good.needs[i].num) {
            return false
          }
          break
        case Enum.MATERIALS.SULPHUR:
          if(this.materials.sulphur < good.needs[i].num) {
            return false
          }
          break
        case Enum.MATERIALS.LEATHER:
          if(this.materials.leather < good.needs[i].num) {
            return false
          }
          break
      }      
    }
    return true
  },

  // 制造物品
  make(good) {
    for(let i=0; i<good.needs.length; i++) {
      switch(good.needs[i].type) {
        case Enum.MATERIALS.RAW_MEAT:
          this.materials.raw_meat -= good.needs[i].num
          break
        case Enum.MATERIALS.WOOD:
          this.materials.wood -= good.needs[i].num
          break
        case Enum.MATERIALS.HERB:
          this.materials.herb -= good.needs[i].num
          break
      }
    }
    good.num += 1
  },

  // 属性改变
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