// 该脚本负责制造场景的逻辑
import {GAME_SCENE} from './Enum'
import GameSceneMng from './GameSceneMng'
import {Duanzao,Backpack} from './GoodsManager'

cc.Class({
    extends: cc.Component,
    properties: {
      pageView: cc.PageView,
      Btn_back: cc.Button,
      title: {
        default: null,
        type: cc.Label
      },
      prefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      this.node.pages = this.pageView.getPages()
      this.Btn_back.node.on('click',this.back,this)
      // this.btnState()
    },

    callback(pageView) {
      // let index = pageView.getCurrentPageIndex()
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
      for(let index = 0; index<this.node.pages.length; index++) {
        for(let i=0; i<4; i++) {
          let y = 380 - 210*i
          let node = cc.instantiate(this.prefab)
          let goodsList = Backpack.getInstance().goodsList
          // 制造物品存在直接赋值，不存在就创建物品列表
          if(goodsList[i+index*4]) {
            var good = goodsList[i+index*4]
          } else {
            var good = new Duanzao(i+index*4)
            if(!good.id) {
              return
            }
            Backpack.getInstance().add(good)
          }
          node.good = good
          node.parent = this.node.pages[index]
          node.setPosition(0,y)
        }
      }
    },
});
