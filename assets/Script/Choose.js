import player from './PlayerManager'
import {EVENT} from 'Enum'
const et = require('Listener')
// 游戏特殊事件选择
cc.Class({
    extends: cc.Component,

    properties: {
      btn_yse: cc.Button,
      btn_no: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start () {
      this.btn_yse.node.on('click', this.callback, this)
      this.btn_no.node.on('click', this.callback, this)
    },

    callback(btn) {
      if(player.getCurrentEvent().type == '战斗') {
        et.emit(EVENT.BEFORE_COMBAT)
        return
      }
      if(btn.node.name == 'Btn_Yes') {
        player.setCurrentEvent({about: player.getCurrentEvent().yes})
      }else {
        player.setCurrentEvent({about: player.getCurrentEvent().no})
      }
      et.emit(EVENT.FINISH)
      const content = player.getCurrentEvent().about
      this.node.parent.getComponent('MainScene').labelSchedule2(content)
    },

    // update (dt) {},
});
