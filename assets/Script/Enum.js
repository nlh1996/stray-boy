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
  HUNGER: '饿了',
  COMBAT: '触发战斗',
  HURT: '受到伤害',
  WIN: '战斗获得胜利',
  FULL: '吃饱了',
  GAMEOVER: '游戏结束' 
})

var BEHAVIOR = cc.Enum({
  COMBAT: 0,
  RUNAWAY: 1,
  DIE: 2
})

var GAME_SCENE = cc.Enum({
  START: 'start',
  GAME: 'game',
  MAKE: 'make',
  FOOD_LIST: 'food_list',
  GAME_OVER: 'game_over'
})

export default {TALENT,EVENT,MATERIALS,BEHAVIOR,GAME_SCENE}