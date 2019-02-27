
var GoodsManager = cc.Class({
  ctor() {
    this.meat = 0
    this.fruit = 0
    this.herb = 0
    this.wood = 0
    this.sulphur = 0
    this.leather = 0
  },
  setProperty(type,num) {
    switch(type) {
      case 1:
        this.meat += num
        break
      case 2:
        this.fruit += num
        break
      case 3:
        this.herb += num
        break
      case 4:
        this.wood += num
        break
      case 5:
        this.sulphur += num
        break
      case 6:
        this.sulphur += num
        break
    }
  }
})

var goodsManager = new GoodsManager()

module.exports = goodsManager