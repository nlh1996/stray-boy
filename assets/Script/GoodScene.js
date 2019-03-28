// 该脚本负责制造场景的逻辑
import {GAME_SCENE} from './Enum'
import GameSceneMng from './GameSceneMng'
import {Backpack} from './GoodsManager'

cc.Class({
    extends: cc.Component,

    properties: {
      Btn_back: cc.Button,
      title: cc.Label,
      prefab: cc.Prefab,
      content: cc.Node,
    },

    onLoad () {
      // this.updateData()
      this.Btn_back.node.on('click', this.back, this)
      //this.btnState()
    },

    back() {
      GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
    },

    // 文字出现效果
    labelSchedule(content) {
      this.unscheduleAllCallbacks()
      this.title.string = ''    
      let index = 0
      let i = content.length - 1
      this.schedule(() => {
        this.title.string = this.title.string + content[index]
        index++
      },0.08,i,0)
    },

    start () {
      for(let i=0; i<5; i++) {
        let y = -150 - 300*i
        let node = cc.instantiate(this.prefab)
        node.good = Backpack.getInstance().propList[i]
        node.parent = this.content
        node.setPosition(0,y)
      }
    },

    // update (dt) {},
});
