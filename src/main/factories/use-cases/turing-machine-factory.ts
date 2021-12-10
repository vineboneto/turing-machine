import { TuringMachineUseCase } from '../../../domain/use-cases'

export const makeTuringMachine = () => {
  return new TuringMachineUseCase()
}
