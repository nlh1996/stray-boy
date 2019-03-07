const et = new cc.EventTarget()
// 观察者模式
// 监听者类
class Listener {
  constructor() {
    this.watcher = watcher
    this.event = ''
    this.func = {} 
  }
  //注册监听事件
  on(event,func) {
    this.watcher.addListener(this)
    this.event = event
    this.func = func
  }
  //注销监听事件
  off(event) {
    this.watcher.removeListener(event)
  }
  //执行监听事件
  execute() {
    this.func()
  }
}

// 观察者类
class Watcher {
  constructor() {
    this.listeners = []
  }
  //添加监听者
  addListener(obj) {
    this.listeners.push(obj)
  }
  //移除监听者
  removeListener(event) {
    for(let i=0; i<this.listeners.length; i++) {
      if(this.listeners[i].event == event) {
        this.listeners = this.listeners.splice(i+1,1)
      }
    }
  }
  //观察事件分发
  dispatch(event) {
    for(let i=0; i<this.listeners.length; i++) {
      if(this.listeners[i].event == event) {
        this.listeners[i].execute()
      }
    }
  }
}

var watcher = new Watcher()

module.exports = et