// 本脚本定义游戏怪物
// 原型设计模式（类实现）
class 僵尸 {
  constructor(lv,life,attack,defence,hostility) {
    this.lv = lv
    this.life = life
    this.attack = attack
    this.defence = defence
    this.hostility = hostility
  }
  clone() {
  }
  die() {
    console.log(" I'am die! " )
  }
}

class 白毛僵尸 extends 僵尸 {
  constructor(lv,life,attack,defence,hostility) {
    super(10,100,10,5,30)
    this.name = '白毛僵尸'
  }
  clone() {
    return new 白毛僵尸(this.lv,this.life,this.attack,this.defence,this.hostility)
  }
}

class 灰眼僵尸 extends 僵尸 {
  constructor(lv,life,attack,defence,hostility) {
    super(20,200,15,10,50)
    this.name = '灰眼僵尸'
  }
  clone() {
    return new 灰眼僵尸(this.lv,this.life,this.attack,this.defence,this.hostility)
  }
}

class 蓝眼僵尸 extends 僵尸 {
  constructor(lv,life,attack,defence,hostility) {
    super(lv,life,attack,defence,hostility)
  }
  clone() {
    return new 蓝眼僵尸(this.lv,this.life,this.attack,this.defence,this.hostility)
  }
}

class 绿眼僵尸 extends 僵尸 {
  constructor(lv,life,attack,defence,hostility) {
    super(lv,life,attack,defence,hostility)
  }
  clone() {
    return new 绿眼僵尸(this.lv,this.life,this.attack,this.defence,this.hostility)
  }
}

class 僵尸王 extends 僵尸 {
  constructor(lv,life,attack,defence,hostility) {
    super(lv,life,attack,defence,hostility)
  }
  clone() {
    return new 僵尸王(this.lv,this.life,this.attack,this.defence,this.hostility)
  }
}

class 僵尸工厂 {
  constructor(obj) {
    this.prototype = obj
  }
  生产僵尸() {
    return this.prototype.clone()
  }
}

export default {白毛僵尸,灰眼僵尸,绿眼僵尸,僵尸王,僵尸工厂}
