import { TuringMachine as Contract } from '../contracts'

export class TuringMachineUseCase implements Contract {
  private inputMachine: string
  private currentState: string
  private final: string
  private turingMachines: Contract.TuringMachine[]
  private incrementI = 1
  private i = 0

  async resolve(input: Contract.Input): Promise<string> {
    this.setting(input)
    for (this.i; this.i < this.inputMachine.length; this.i += this.incrementI) {
      const currentMachine = this.getMachineByLetter(this.inputMachine[this.i])
      this.changeToNextMachine(currentMachine)
      this.resolveDirection(currentMachine.direction)
      if (this.isFinalState()) {
        return this.inputMachine
      }
    }
  }

  private setting(input: Contract.Input) {
    this.currentState = input.initial
    this.final = input.final
    this.turingMachines = input.turingMachines
    this.inputMachine = input.inputMachine
  }

  private resolveDirection(nextDirection: string) {
    switch (nextDirection) {
      case 'R':
        this.changeValueToRight()
        break
      case 'L':
        this.changeValueToLeft()
        break
      case 'S':
        this.incrementI = 0
        break
      default:
        throw new Error('Invalid Direction')
    }
  }

  private changeToNextMachine(currentMachine: Contract.TuringMachine) {
    const currentLetter = this.inputMachine.charAt(this.i)
    this.inputMachine = this.inputMachine.replace(currentLetter, currentMachine.write)
    this.currentState = currentMachine.next
  }

  private changeValueToRight() {
    if (!this.inputMachine[this.i + 1]) {
      this.inputMachine = this.inputMachine + '∅'
    }
    this.incrementI = 1
  }

  private changeValueToLeft() {
    if (![this.i - 1]) {
      this.incrementI = 0
    } else {
      this.incrementI = -1
    }
    this.inputMachine = '∅' + this.inputMachine
  }

  private getMachineByLetter(letter: string): Contract.TuringMachine {
    for (const machine of this.turingMachines) {
      if (letter === machine.read && this.currentState === machine.current) {
        return machine
      }
    }
  }

  private isFinalState() {
    if (this.currentState === this.final) {
      return true
    }
  }
}
