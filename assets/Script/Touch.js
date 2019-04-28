
cc.Class({
  extends: cc.Component,

  properties: {

  },

  start () {
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.callback, this)
  },

  callback(et) {
    // 获取触点上一次触发事件时的位置对象
    let lastPosition = et.getPreviousLocation()
    // 触摸移动点当前坐标
    let position = et.getLocation()
    // 触摸位移距离
    let durX = position.x - lastPosition.x
    let durY = position.y - lastPosition.y
    // 设置节点移动
    if(this.node.x>=-125&&this.node.x<=125) {
      this.node.x += durX
    }
    if(this.node.x<-125) {
      this.node.x = -125
    }
    if(this.node.x>125) {
      this.node.x = 125
    }
    if(this.node.y>=-85&&this.node.y<=85) {
      this.node.y += durY
    }
    if(this.node.y<-85) {
      this.node.y = -85
    }
    if(this.node.y>85) {
      this.node.y = 85
    }
  }
});
