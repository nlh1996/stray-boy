import duanzao from '../conf/duanzao'
import goods from '../conf/goods'

// 背包类
class Backpack{
  constructor() {
    this.backpack = null
    this.goods = goods
  }
  static getInstance() {
    if(this.backpack == null) {
      this.backpack = new Backpack()
    }
    return this.backpack
  }

  // 制造物品
  make(good) {
    var sum = 0
    for(let i=0; i<good.needs.length; i++) {
      for(let index=0; index<15; index++) {
        if(good.needs[i].name == this.goods[index].name) {
          sum += good.needs[i].num
        }
      }
    }
    console.log(sum)
  }
}

// 装备类
class  Weaponry{
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

// 道具类
class Prop{
  constructor(index) {

  }
}

export default {Backpack,Weaponry,Prop}