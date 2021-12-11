import { ChangeEvent } from 'react'
import { TuringMachine } from '@/use-cases'

type Props = {
  turingMachine: TuringMachine
  textChange(e: ChangeEvent<HTMLInputElement>): void
}

export default function TuringMachineTodo({ turingMachine, textChange }: Props) {
  return (
    <span>
      <input
        type="text"
        placeholder="Atual"
        name="current"
        title="Atual Estado"
        value={turingMachine.current}
        onChange={textChange}
      />
      <input
        type="text"
        placeholder="Próximo"
        name="next"
        title="Próximo estado"
        value={turingMachine.next}
        onChange={textChange}
      />
      <input type="text" placeholder="Lê" name="read" title="Lê" value={turingMachine.read} onChange={textChange} />
      <input
        type="text"
        placeholder="Escreve"
        name="write"
        title="Escreve"
        value={turingMachine.write}
        onChange={textChange}
      />
      <input
        type="text"
        placeholder="Direção"
        name="direction"
        title="Direção"
        value={turingMachine.direction}
        onChange={textChange}
      />
    </span>
  )
}
