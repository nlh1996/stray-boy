import duanzao from '../conf/duanzao'
import goods from '../conf/goods'

// 背包类
class Backpack{
  constructor() {
    this.backpack = null
    this.goods = []
  }
  static getInstance() {
    if(this.backpack == null) {
      this.backpack = new Backpack()
    }
    return this.backpack
  }
  add(good) {
  }
}

// 装备类
class  Weaponry{
  constructor(index) {
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

// 道具类
class Prop{
  constructor(index) {

  }
}

var materials = {
  raw_meat: {num: 0, name: '兽肉'}, 
  fruit: {num: 0, hunger: 20, name: '果子'},    
  herb: {num: 0, name: '药草'},     
  wood: {num: 0, name: '木材'},     
  sulphur: {num: 0, name: '硫磺'},  
  leather: {num: 0, name: '皮革'},  
}

export default {Backpack,Weaponry,Prop,materials}