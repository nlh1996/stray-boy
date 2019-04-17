// 定义所有枚举的脚本
const TALENT = cc.Enum({
  健身达人: 1,
  情场高手: 2,
  理工男: 3
})

const EVENT = cc.Enum({
  BEFORE_COMBAT: '触发战斗',
  ENTER_COMBAT: '进入战斗',
  HURT: '受到伤害',
  WIN: '战斗获得胜利',
  FULL: '吃饱了',
  LIFEFULL: '生命已满',
  GAMEOVER: '游戏结束',
  UPGRADE: '升级',
  FINISH: '加点结束',
  CHOOSE: '游戏选择',
  FINDSHOP: '发现商店'
})

const GAME_SCENE = cc.Enum({
  START: 'start',
  GAME: 'game',
  MAKE: 'make',
  GOOD_LIST: 'good_list',
  GAME_OVER: 'game_over',
  STORY: 'story'
})

const STATUS = cc.Enum({
  STATUS_OK: 0,
  NO_ENERGY: 1,
  NO_HUNGER: 2
})

// 有限状态机状态
const STATE = cc.Enum({
  SEARCH: 0,
  FORWARD: 1,
  SLEEP: 2,
})

export default {TALENT,EVENT,GAME_SCENE,STATUS,STATE}