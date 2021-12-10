import { TuringMachine as Contract } from '../contracts'

export class TuringMachineUseCase implements Contract {
  private inputMachine: string
  private currentState: string
  private final: string[]
  private turingMachines: Contract.TuringMachine[]
  private incrementI = 1
  private i = 0
  private Q: string[]
  private alphaInput: string[]
  private blank: string

  async resolve(input: Contract.Input): Promise<string> {
    this.setting(input)
    this.validation()
    for (this.i; this.i < this.inputMachine.length; this.i += this.incrementI) {
      const currentMachine = this.getMachineByLetter(this.inputMachine[this.i])
      if (!currentMachine) {
        throw new Error('Entrada inválida para está máquina')
      }
      this.changeToNextMachine(currentMachine)
      this.resolveDirection(currentMachine.direction)
      console.log(this.isFinalState())
      if (this.isFinalState()) {
        return this.inputMachine
      }
    }
  }

  private validation() {
    if (!this.Q?.length || !this.alphaInput?.length || !this.final || !this.currentState || !this.inputMachine) {
      throw new Error('Preencha todos os campos')
    }
    const existQInCurrent = this.Q.filter((q) => this.checkExistMachineCurrentInQ(q))
    const existQInNext = this.Q.filter((q) => this.checkExistMachineNextInQ(q))
    if (!existQInNext?.length || !existQInCurrent?.length) {
      throw new Error(`Estado não foi declarado`)
    }

    const existAlpha = this.alphaInput.filter((e) => this.checkExistInputMachineInAlphaInput(e))
    if (!existAlpha?.length) {
      throw new Error('Alfabeto de entrada incompleto')
    }

    const existFinalStateNext = this.final.filter((e) => this.checkExistFinalStateInMachinesNext(e))
    const existFinalStateCurrent = this.final.filter((e) => this.checkExistFinalStateInMachinesCurrent(e))
    if (!existFinalStateCurrent.length && !existFinalStateNext.length) {
      throw new Error('Estado final não esta presente')
    }
  }

  private checkExistInputMachineInAlphaInput(alpha: string): boolean {
    const exist = this.inputMachine.includes(alpha)
    return exist
  }

  private checkExistMachineCurrentInQ(q: string): boolean {
    const exist = this.turingMachines.filter((e) => e.current === q)
    return exist?.length > 0
  }

  private checkExistMachineNextInQ(q: string): boolean {
    const exist = this.turingMachines.filter((e) => e.next === q)
    return exist?.length > 0
  }

  private checkExistFinalStateInMachinesCurrent(finalState: string): boolean {
    const exist = this.turingMachines.filter((e) => e.current === finalState)
    return exist?.length > 0
  }

  private checkExistFinalStateInMachinesNext(finalState: string): boolean {
    const exist = this.turingMachines.filter((e) => e.next === finalState)
    return exist?.length > 0
  }

  private setting(input: Contract.Input) {
    this.currentState = input.initial
    this.final = input.final
    this.turingMachines = input.turingMachines
    this.inputMachine = input.inputMachine
    this.Q = input.Q
    this.alphaInput = input.alphaInput
    this.blank = input.blank
    this.i = 0
    this.incrementI = 1
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
        throw new Error('Direção Inválida, digite "L", "R", "S"')
    }
  }

  private changeToNextMachine(currentMachine: Contract.TuringMachine) {
    this.inputMachine = this.replaceAt(this.inputMachine, currentMachine.write, this.i)
    this.currentState = currentMachine.next
  }

  private replaceAt(string: string, replacement: string, index: number) {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length)
  }

  private changeValueToRight() {
    if (!this.inputMachine[this.i + 1]) {
      this.inputMachine = this.inputMachine + this.blank
    }
    this.incrementI = 1
  }

  private changeValueToLeft() {
    if (!this.inputMachine[this.i - 1]) {
      this.incrementI = 0
    } else {
      this.incrementI = -1
    }
    this.inputMachine = this.blank + this.inputMachine
  }

  private getMachineByLetter(letter: string): Contract.TuringMachine {
    for (const machine of this.turingMachines) {
      if (letter === machine.read && this.currentState === machine.current) {
        return machine
      }
    }
  }

  private isFinalState() {
    const isFinal = this.final.filter((e) => e === this.currentState)
    if (isFinal?.length > 0) {
      return true
    }
  }
}
