// 本脚本负责游戏的开始
const player = require("PlayerManager")
import {TALENT,GAME_SCENE} from 'Enum'
import GameSceneMng from './GameSceneMng'
import talent from '../Conf/talent'
import story from '../Conf/story'

cc.Class({
    extends: cc.Component,

    properties: {
      button1: cc.Button,
      button2: cc.Button,
      button3: cc.Button,
      button4: cc.Button,
      content: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      this.button1.node.on('click', this.colorChange, this)
      this.button2.node.on('click', this.colorChange, this)
      this.button3.node.on('click', this.colorChange, this)
      this.button4.node.on('click', this.gameStart, this)
      this.button4.interactable = false
    },

    colorChange(button) {
      this.button4.interactable = true
      this.button1.normalColor = cc.Color.WHITE
      this.button2.normalColor = cc.Color.WHITE
      this.button3.normalColor = cc.Color.WHITE
      button.normalColor = cc.Color.GREEN
      switch(button.node.name) {
        case 'Button_1':
          player.properties.talent = TALENT.健身达人
          this.labelSchedule(talent[0].about)
          break
        case 'Button_2':
          player.properties.talent = TALENT.情场高手
          this.labelSchedule(talent[1].about)
          break
        case 'Button_3':
          player.properties.talent = TALENT.理工男
          this.labelSchedule(talent[2].about)
          break
      }
    },

    gameStart() {
      if(player.properties.talent != null) {
        //初始化人物属性
        player.init(player.properties.talent)
        //添加开始剧情
        player.setCurrentEvent(story[0])
        //开始游戏
        GameSceneMng.getInstance().setGameScene(GAME_SCENE.STORY)
      }
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
      },0.04,i,0)
    },

    start () {
      
    },

    // update (dt) {},
});
