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
    this.name = mstList[id].name
    this.lv = mstList[id].lv
    this.attack = mstList[id].attack
    this.defence = mstList[id].defence
    this.life = mstList[id].life
    this.duraction = mstList[id].duraction
    this.about = mstList[id].about
    this.attackType = mstList[id].attackType
    this.exp = mstList[id].exp
    this.goods = [
      {good1: mstList[id].good1, num: mstList[id].good1num, por: mstList[id].por},
      {good2: mstList[id].good2, num: mstList[id].good2num, por: mstList[id].por},
    ]
  }
}

export default Monster
