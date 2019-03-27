// 定义所有枚举的脚本
var TALENT = cc.Enum({
  学霸: 1,
  强壮: 2,
  多才: 3
})

var EVENT = cc.Enum({
  HUNGER: '饿了',
  COMBAT: '触发战斗',
  HURT: '受到伤害',
  WIN: '战斗获得胜利',
  FULL: '吃饱了',
  GAMEOVER: '游戏结束',
  UPGRADE: '升级',
  FINISH: '加点结束'
})

var GAME_SCENE = cc.Enum({
  START: 'start',
  GAME: 'game',
  MAKE: 'make',
  GOOD_LIST: 'good_list',
  GAME_OVER: 'game_over'
})

var STATUS = cc.Enum({
  STATUS_OK: 0,
  NO_ENERGY: 1,
  NO_HUNGER: 2
})

export default {TALENT,EVENT,GAME_SCENE,STATUS}