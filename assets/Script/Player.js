// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocoluckd-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocoluckd-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocoluckd-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var player = require("PlayerManager")
cc.Class({
    extends: cc.Component,

    properties: {
      health: {
        default: null,
        type: cc.Label
      },
      luck: {
        default: null,
        type: cc.Label
      },
      achievement: {
        default: null,
        type: cc.Label
      },
      money: {
        default: null,
        type: cc.Label
      },
      knowledge: {
        default: null,
        type: cc.Label
      },
      sport: {
        default: null,
        type: cc.Label
      },
      charm: {
        default: null,
        type: cc.Label
      },
      game: {
        default: null,
        type: cc.Label
      },
      classRank: {
        default: null,
        type: cc.Label
      },
    },

    onLoad () {
      this.knowledge.string = player.knowledge
      this.sport.string = player.sport
      this.charm.string = player.charm
    },

    start () {

    },

    update (dt) {
      player.knowledge++
    },
});
