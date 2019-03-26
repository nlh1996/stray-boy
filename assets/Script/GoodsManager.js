// 所有物品的管理
import duanzao from '../Conf/duanzao'
import goods from '../Conf/goods'

// 背包类 单例
class Backpack {
  constructor() {
    this.backpack = null
    this.goods = goods
    this.goodsList = []
    this.materials = []
  }

  static getInstance() {
    if(this.backpack == null) {
      this.backpack = new Backpack()
    }
    return this.backpack
  }

  // 制造物品
  make(good) {
    for(let i=0; i<good.needs.length; i++) {
      for(let index=0; index<this.materials.length; index++) {
        if(good.needs[i].name == this.materials[index].name) {
          this.materials[index].num -= good.needs[i].num
        }
      }
    }
    good.num += 1
  }
  
  // 添加物品到背包
  add(good) {
    this.goodsList.push(good)
  }

  // 判断制造是否满足物品制造需求
  validate(good) {
    for(let i=0; i<good.needs.length; i++) {
      for(let index=0; index<this.materials.length; index++) {
        if(good.needs[i].name == this.materials[index].name) {
          if(this.materials[index].num < good.needs[i].num) {
            return false
          }
        }
      }
    }
    return true
  }

  // 属性改变
  setProperty(code) {
    for(let i=0; i<code.length; i++) {
      switch(code[i]) {
        //木材
        case 503:
          this.materials[3].num += 3
          break
        // 药草
        case 603:
          this.materials[2].num += 3
          break
        //肉
        case 703:
          this.materials[0].num += 3
          break
        //果子
        case 803:
          this.materials[1].num += 3
          break
      }
    }
  }
}

// 打造类
class Weaponry {
  constructor(index) {
    if(index < duanzao.length) {
      this.id = duanzao[index].id
      this.name = duanzao[index].name
      this.num = 0
      this.needs = [
        {name: duanzao[index].need1, num: duanzao[index].sum1},
        {name: duanzao[index].need2, num: duanzao[index].sum2},
        {name: duanzao[index].need3, num: duanzao[index].sum3}
      ]
      this.time = duanzao[index].time
      this.pro = duanzao[index].pro    
    }
  }   
}

// 材料类
class Materals {
  constructor(index) {
    if(goods[index].type == '材料') {
      this.name = goods[index].name
      this.id = goods[index].id
      this.buy = goods[index].buy
      this.sell = goods[index].sell
      this.num = 20
    }
  }
}

// 道具类
class Prop {
  constructor(index) {

  }
}

for(let i=0; i<goods.length; i++) {
  let obj = new Materals(i)
  if(obj.id) {
    Backpack.getInstance().materials.push(obj)
  }
}

export default {Backpack,Weaponry,Prop}