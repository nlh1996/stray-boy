import story from '../Conf/story'
import GameSceneMng from './GameSceneMng'
import {GAME_SCENE} from 'Enum'
cc.Class({
    extends: cc.Component,

    properties: {
      content: cc.Label,
      btn: cc.Button
    },

    // onLoad () {},

    start () {
      this.labelSchedule(story[0].about)
      this.btn.node.on('click', this.startGame, this)
    },


    // 文字提示
    labelSchedule(content) {
      this.unscheduleAllCallbacks()
      this.content.string = ''
      let index = 0
      let i = content.length - 1
      this.schedule(() => {
        this.content.string = this.content.string + content[index]
        index++
        if(index>i) {
          this.startGame()
        }
      },0.06,i,0)
    },

    startGame() {
      var finished = cc.callFunc(function () {
        GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
      })
      var myAction = cc.sequence(cc.fadeOut(2.0), finished);
      this.node.runAction(myAction)
    }
    // update (dt) {},
});
