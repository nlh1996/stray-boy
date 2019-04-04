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
      this.btn.node.on('click',()=>{
        GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
      })
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
          GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
        }
      },0.06,i,0)
    },
    // update (dt) {},
});
