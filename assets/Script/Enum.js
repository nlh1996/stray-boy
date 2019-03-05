// 定义所有枚举的脚本
var TALENT = cc.Enum({
  学霸: 1,
  强壮: 2,
  多才: 3
})

var MATERIALS = cc.Enum({
  RAW_MEAT: 1,
  FRUIT: 2,
  HERB: 3,
  WOOD: 4,
  SULPHUR: 5,
  LEATHER: 6
})

var EVENT = cc.Enum({
  COMBAT: 0,
  RUNAWAY: 1,
  NO_HUNGER: 2
})

export default {TALENT,EVENT,MATERIALS}