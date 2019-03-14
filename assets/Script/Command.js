// 简单的命令模式
// class Command {
//   constructor(event) {
//     this._event = event
//   }
//   execute(obj) {
//     if(this._event.code) {
//       obj.setProperty(this._event.code)
//     }
//   }
//   getEvent() {
//     return this._event
//   }
// }

// class GoOut extends Command{
//   constructor(event) {
//     super(event)
//   }
//   execute(obj) {
//     if(this._event.code) {
//       obj.Score(this._event.code)
//     }
//   }
// }

// class Search extends Command{
//   constructor(event) {
//     super(event)
//   }
//   execute(obj) {
//     if(this._event.code) {
//       obj.Score(this._event.code)
//     }
//   }
// }

// module.exports = Command