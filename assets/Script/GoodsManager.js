// 所有物品的管理
import duanzao from '../Conf/duanzao'
import goods from '../Conf/goods'
import prop from '../Conf/prop'
import weapon from '../Conf/weapon'

// 背包类 单例
class Backpack {
  constructor() {
    this.backpack = null
    this.goods = goods
    this.goodsList = []
    this.materials = []
    this.propList = []
    this.weaponList = []
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
    for(let i=0; i<this.weaponList.length; i++) {
      if(good.id == this.weaponList[i].id) {
        this.weaponList[i].num += 1
      }
    }
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

  // 材料变化
  setProperty(code) {
    for(let i=0; i<code.length; i++) {
      switch(code[i]) {
        // 木材
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

  // 物品消耗
  consume(id) {
    for(let i=0; i<this.propList.length; i++) {
      if(id == this.propList[i].id) {
        this.propList[i].num -- 
        return
      }
    }
  }

  // 是由拥有该物品
  isHaveGood(goodName) {
    for(let i=0; i<this.weaponList.length; i++) {
      if(this.weaponList[i].name == goodName) {
        if(this.weaponList[i].num>0) {
          return true
        }else {
          return false
        }
      }
    }
  }
}

// 打造类
class Duanzao {
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

// 装备类
class Weapon {
  constructor(index) {
    if(index < weapon.length) {
      this.id = weapon[index].id
      this.name = weapon[index].name
      this.num = 0
      this.attack = weapon[index].attack
      this.defence = weapon[index].defence
      this.speed = weapon[index].speed
      this.life = weapon[index].life
      this.about = '上古众神使用过的武器'
      this.des = weapon[index].des
      this.type = weapon[index].type
      this.time = weapon[index].time
      this.buff1 = weapon[index].buff1
      this.buff2 = weapon[index].buff2
      this.buff3 = weapon[index].buff3
    }
  }
}

// 材料类
class Materials {
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
    this.id = prop[index].id
    this.name = prop[index].name
    this.effect = prop[index].effect
    this.buy = prop[index].buy
    this.sell = prop[index].sell
    this.num = 20
    this.about = prop[index].about
  }
}

// 初始化材料
for(let i=0; i<goods.length; i++) {
  let obj = new Materials(i)
  if(obj.id) {
    Backpack.getInstance().materials.push(obj)
  }
}

// 初始化道具
for(let i=0; i<prop.length; i++) {
  let obj = new Prop(i)
  if(obj.id) {
    Backpack.getInstance().propList.push(obj)
  }
}

// 初始化装备
for(let i=0; i<weapon.length; i++) {
  let obj = new Weapon(i)
  if(obj.id) {
    Backpack.getInstance().weaponList.push(obj)
  }
}

export default {Backpack,Duanzao}