
cc.Class({
    extends: cc.Component,

    properties: {
      goodName: cc.Label,
      btn: cc.Button,
      btn_label: cc.Label,
      label1: cc.Label,
      label2: cc.Label,
    },

    onLoad() {
      this.updateData()
      this.btn_label.node.color = cc.color(105,105,105)
      this.btn.node.on('click', this.equip ,this)
      if(this.node.good.num > 0) {
        this.btn.enabled = true
        this.btn_label.node.color = cc.color(20,240,36)
      }
    },

    equip() {
      this.btn_label.node.color = cc.color(105,105,105)
      this.btn_label.string = '穿戴中'
    },
 
    // label数据更新
    updateData() {
      let good = this.node.good
      this.goodName.string = good.name
      this.label1.string = '#描述：' + good.about
      this.label2.string = '#效果：攻击+' + good.attack + ' 防御+' + good.defence + ' 生命+' + good.life
    },

    // 判断按钮是否为可用状态
    btnState() {
      if(this.node.good.num > 0) {
        this.btn.enabled = true
        this.btn_label.node.color = cc.color(20,240,36)
      } else {
        this.btn.enabled = false
        this.btn_label.node.color = cc.color(105,105,105)
      }     
    },

    update (dt) {
      //this.btnState()
    },
});
