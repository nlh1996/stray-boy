// 普通单例_饿汉模式
var PlayerManager = cc.Class({
  // 成员变量
  ctor() {
    this.health = 0
    this.luck = 0
    this.achievement = 0
    this.money = 0
    this.knowledge = 0
    this.sport = 0
    this.charm = 0
    this.game = 0
    this.classRank = 0
    this.talent = 0
  },

  Save() {
    cc.sys.localStorage.setItem('userData', JSON.stringify(this))
  },

  Get() {
    const userData = JSON.parse(cc.sys.localStorage.getItem('userData'))
    return userData
  },
})


var player = new PlayerManager()

module.exports = player