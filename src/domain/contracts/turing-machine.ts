export interface TuringMachine {
  resolve(input: TuringMachine.Input): Promise<string>
}

export namespace TuringMachine {
  export type Input = {
    initial: string
    final: string
    inputMachine: string
    turingMachines: TuringMachine[]
  }

  export type TuringMachine = {
    current: string
    next: string
    read: string
    write: string
    direction: 'R' | 'L' | 'S' | ''
  }
}
