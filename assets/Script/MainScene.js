// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var gameEvent = require('Event')
cc.Class({
    extends: cc.Component,

    properties: {
      button: cc.Button,
      content: {
        default: null,
        type: cc.Label
      },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.button.node.on('click', this.callback, this)
    },

    callback() {
      this.content.string = ''
      event = gameEvent.getRandomEvent()
      let i = event.length - 1
      let index = 0
      this.schedule(() => {
        this.content.string = this.content.string + event[index]
        index++
      },0.1,i,0)
    },

    start () {

    },

    // update (dt) {},
});
