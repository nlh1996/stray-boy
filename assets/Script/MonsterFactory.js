// 本脚本定义游戏怪物
// 原型设计模式（类实现）
import mstList from '../Conf/mst'
// class 僵尸 {
//   constructor(lv,life,attack,defence,hostility) {
//     this.lv = lv
//     this.life = life
//     this.attack = attack
//     this.defence = defence
//     this.hostility = hostility
//   }
//   clone() {
//   }
//   die() {
//     console.log(" I'am die! " )
//   }
// }

// class 白毛僵尸 extends 僵尸 {
//   constructor(lv,life,attack,defence,hostility) {
//     super(10,100,10,5,30)
//     this.name = '白毛僵尸'
//   }
//   clone() {
//     return new 白毛僵尸(this.lv,this.life,this.attack,this.defence,this.hostility)
//   }
// }

// class 僵尸工厂 {
//   constructor(obj) {
//     this.prototype = obj
//   }
//   生产僵尸() {
//     return this.prototype.clone()
//   }
// }
class Monster {
  constructor(id) {
    if(id<mstList.length) {
      this.name = mstList[id].name
      this.lv = mstList[id].lv
      this.attack = mstList[id].attack
      this.defence = mstList[id].defence
      this.life = mstList[id].life
      this.duraction = mstList[id].duraction
      this.about = mstList[id].about
      this.attackType = mstList[id].attacktype
      this.exp = mstList[id].exp
      this.goods = [
        {good: mstList[id].good1, num: mstList[id].num1, pro: mstList[id].pro1},
        {good: mstList[id].good2, num: mstList[id].num2, pro: mstList[id].pro2},
      ]
    }
  }
}

export default Monster
