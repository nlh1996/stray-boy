import player from '../PlayerManager'
cc.Class({
    extends: cc.Component,

    properties: {
      goodName: cc.Label,
      btn: cc.Button,
      btn_label: cc.Label,
      label1: cc.Label,
      label2: cc.Label,
      label3: cc.Label,
    },

    onLoad() {
      this.updateData()
      this.btn_label.node.color = cc.color(105,105,105)
      this.btn.node.on('click', this.equip, this)
    },

    start() {
      if(this.node.good.type == '特殊') {
        this.btn.enabled = false
        if(this.node.good.num > 0) {
          this.btn_label.node.color = cc.color(20,240,36)
          this.btn_label.string = '已生效'
        }else {
          this.btn_label.node.color = cc.color(105,105,105)
          this.btn_label.string = '未获得'
        }
      }

      if(this.node.good.type == '武器') {
        if(this.node.good.num > 0) {
          if(player.weapon.id == this.node.good.id) {
            this.btn.enabled = false
            this.btn_label.node.color = cc.color(105,105,105)
            this.btn_label.string = '穿戴中'
          }else {
            this.btn.enabled = true
            this.btn_label.node.color = cc.color(20,240,36)
            this.btn_label.string = '穿戴'
          }           
        }else {
          this.btn.enabled = false
          this.btn_label.node.color = cc.color(105,105,105)
          this.btn_label.string = '未获得'
        }
      }

      if(this.node.good.type == '盔甲') {
        if(this.node.good.num > 0) {
          if(player.armor.id == this.node.good.id) {
            this.btn.enabled = false
            this.btn_label.node.color = cc.color(105,105,105)
            this.btn_label.string = '穿戴中'
          }else {
            this.btn.enabled = true
            this.btn_label.node.color = cc.color(20,240,36)
            this.btn_label.string = '穿戴'
          }           
        }else {
          this.btn.enabled = false
          this.btn_label.node.color = cc.color(105,105,105)
          this.btn_label.string = '未获得'
        }
      }
    },

    // 装备
    equip() {
      player.equip(this.node.good)
      this.btn.enabled = false
      this.btn_label.node.color = cc.color(105,105,105)
      this.btn_label.string = '穿戴中'
    },
 
    // label数据更新
    updateData() {
      let good = this.node.good
      this.goodName.string = good.name
      this.label1.string = '#描述：' + good.about
      this.label2.string = '#效果：攻击+' + good.attack + ' 防御+' + good.defence + ' 生命+' + good.life
      if(good.type == '特殊') {
        this.label3.string = '#持续时间：' + good.time
      }
    },

    // 判断按钮是否为可用状态
    btnState() {
      if(this.node.good.type == '武器') {
        if(this.node.good.num > 0 && player.weapon.id != this.node.good.id) {
          this.btn.enabled = true
          this.btn_label.node.color = cc.color(20,240,36)
          this.btn_label.string = '穿戴'
        } 
      }      
      if(this.node.good.type == '盔甲') {
        if(this.node.good.num > 0 && player.armor.id != this.node.good.id) {
          this.btn.enabled = true
          this.btn_label.node.color = cc.color(20,240,36)
          this.btn_label.string = '穿戴'
        } 
      }
    },

    update() {
      this.btnState()
    }
});
