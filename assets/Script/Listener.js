// const et = new cc.EventTarget()
// 监听者类
class Listener {
  constructor() {
    this.watcher = watcher
    this.event = ''
    this.func = {} 
  }

  on(event,func) {
    this.watcher.addListener(this)
    this.event = event
    this.func = func
  }
  off(event) {
    this.watcher.removeListener(event)
  }
  execute() {
    this.func()
  }
}

// 观察者类
class Watcher {
  constructor() {
    this.listeners = []
  }
  addListener(obj) {
    this.listeners.push(obj)
  }
  removeListener(event) {
    for(let i=0; i<this.listeners.length; i++){
      if(this.listeners[i].event == event) {
        this.listeners = this.listeners.splice(i+1,1)
      }
    }
  }
  dispatch(event) {
    for(let i=0; i<this.listeners.length; i++){
      if(this.listeners[i].event == event) {
        this.listeners[i].execute()
      }
    }
  }
}

var watcher = new Watcher()

module.exports = {watcher,Listener}