// 简单的命令模式
class Command {
  constructor() {
    this.a = 1
  }
  execute() {
    console.log('I am base class')
  }
}

class Up extends Command{
  execute() {
    console.log('up')
  }
}

class Down extends Command{
  execute() {
    console.log('down')
  }
}

class Input{
  constructor() {
    this._buttonUp = {}
    this._buttonDown = {}
  }

  handleInputUp(obj) {
    this._buttonUp = obj
  }
  handleInputDown(obj) {
    this._buttonDown = obj
  }
}

var up = new Up()
var down = new Down()
var input = new Input()
module.exports = {input,up,down}