import {BEHAVIOR} from 'Enum'

// 状态模式
class BaseState {
  constructor() {

  }
  handleInput(obj,input) {}
  doSomething(obj) {
    return
  }
}

class Combat extends BaseState {
  constructor() {
    super()
  }
  handleInput(obj,input) {
    if(input == BEHAVIOR.COMBAT) {
      obj._state = combatState
    }
  }
  doSomething(obj) {
    obj.combat()
  }
}

class RunAway extends BaseState {
  constructor() {
    super()
  }
  handleInput(obj,input) {
    if(input == BEHAVIOR.RUNAWAY) {
      obj._state = runawayState
    }
  }
  doSomething(obj) {
    obj.runAway()
  }
}

const combatState = new Combat() 
const runawayState = new RunAway() 
