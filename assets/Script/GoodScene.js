// 该脚本负责制造场景的逻辑
import {GAME_SCENE} from './Enum'
import GameSceneMng from './GameSceneMng'
import {Backpack} from './GoodsManager'

cc.Class({
    extends: cc.Component,

    properties: {
      Btn_back: cc.Button,
      title: cc.Label,
      prefab1: cc.Prefab,
      prefab2: cc.Prefab,
      content: cc.Node,
      btn_food: cc.Button,
      btn_weapon: cc.Button
    },

    onLoad () {
      // this.updateData()
      this.Btn_back.node.on('click', this.back, this)
      this.btn_food.node.on('click', this.callback1, this)
      this.btn_weapon.node.on('click', this.callback2, this)
      //this.btnState()
    },

    back() {
      GameSceneMng.getInstance().setGameScene(GAME_SCENE.GAME)
    },

    callback1() {
      this.content.removeAllChildren()
      let arr  = Backpack.getInstance().propList
      this.content.height = 300*arr.length
      for(let i=0; i<arr.length; i++) {
        let y = -150 - 300*i
        let node = cc.instantiate(this.prefab1)
        node.good = arr[i]
        node.parent = this.content
        node.setPosition(0,y)
      }
    },

    callback2() {
      this.content.removeAllChildren()
      let arr  = Backpack.getInstance().weaponList
      this.content.height = 310*arr.length
      for(let i=0; i<arr.length; i++) {
        let y = -150 - 310*i
        let node = cc.instantiate(this.prefab2)
        node.good = arr[i]
        node.parent = this.content
        node.setPosition(0,y)
      }
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
      this.callback1()
    },

    // update (dt) {},
});
