import {GAME_SCENE} from './Enum'
// 单例模式
class GameSceneMng {
  constructor() {
    this._currentScene = GAME_SCENE.START
    this.gameSceneMng = null
  }

  static getInstance() {
    if(this.gameSceneMng == null) {
      this.gameSceneMng = new GameSceneMng()
    }
    return this.gameSceneMng
  }

  setGameScene(scene) {
    // if(this._currentScene == scene) {
    //   return
    // }else {
    //   this._currentScene = scene
    // }
    this._currentScene = scene
    switch(this._currentScene) {
      case GAME_SCENE.START:
        cc.director.loadScene(scene)
        break
      case GAME_SCENE.GAME:
        cc.director.loadScene(scene)
        break
      case GAME_SCENE.MAKE:
        cc.director.loadScene(scene)
        break
      case GAME_SCENE.FOOD_LIST:
        cc.director.loadScene(scene)
        break
      case GAME_SCENE.GAME_OVER:
        cc.director.loadScene(scene)
        break
    }

  }
}

export default GameSceneMng