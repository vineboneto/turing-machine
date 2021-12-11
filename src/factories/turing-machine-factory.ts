import { TuringMachineUseCase } from '../use-cases'

export const makeTuringMachine = (state): TuringMachineUseCase => {
  const turingMachine = new TuringMachineUseCase(
    state.inputMachine,
    state.turingMachines,
    state.initialState,
    state.finalState.split(',').map((e) => e.trim()),
    state.Q.split(',').map((e) => e.trim()),
    state.alphaInput.split(',').map((e) => e.trim()),
    state.blank
  )
  return turingMachine
}
