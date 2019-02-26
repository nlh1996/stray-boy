// 简单的命令模式
class Command {
  constructor(event) {
    this._event = event
  }
  execute(player) {
    if(this._event.code) {
      player.Score(this._event.code)
    }
  }
  getEvent() {
    return this._event
  }
}

// class GoOut extends Command{
//   constructor(event) {
//     super(event)
//   }
// }

// class Search extends Command{
//   constructor(event) {
//     super(event)
//   }
// }

module.exports = Command