import { useState, ChangeEvent, FormEvent, Fragment } from 'react'
import { HiPlus } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { TuringMachine } from '@/use-cases'
import { makeTuringMachine } from '@/factories'
import { TuringMachineTodo } from '@/components'
import { Wrapper, GlobalStyle } from './styles'

export const defaultState = {
  Q: '',
  turingMachines: [
    {
      current: '',
      next: '',
      read: '',
      write: '',
      direction: '',
    },
  ] as TuringMachine[],
  alphaInput: '',
  inputMachine: '',
  finalState: '',
  initialState: '',
  blank: '∅',
  output: '',
}

export default function App() {
  const [state, setState] = useState(defaultState)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const turingMachine = makeTuringMachine(state)
      const output = await turingMachine.resolve()
      console.log(output)
      setState((old) => ({ ...old, output }))
    } catch (err: any) {
      setState((old) => ({ ...old, output: err.message }))
    }
  }

  const textChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }))
  }

  const textChangeTuringMachine = (currentIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const updatedTuringMachines = state.turingMachines.map((current, index) => {
      if (index === currentIndex) {
        return {
          ...current,
          [e.target.name]: e.target.value,
        }
      }
      return current
    })

    setState((old) => ({ ...old, turingMachines: updatedTuringMachines }))
  }

  const addTuringMachine = () => {
    setState((old) => ({
      ...old,
      turingMachines: [
        ...old.turingMachines,
        {
          current: '',
          direction: '',
          next: '',
          read: '',
          write: '',
        },
      ],
    }))
  }

  const removeTuringMachine = (currentIndex: number) => {
    const updatedTuringMachines = state.turingMachines.filter((e, index) => index !== currentIndex)
    setState((old) => ({ ...old, turingMachines: updatedTuringMachines }))
  }

  const resetState = () => {
    setState(defaultState)
  }

  return (
    <Wrapper>
      <GlobalStyle />
      <form onSubmit={handleSubmit}>
        <div className="main-form">
          <div className="left-form">
            <h2 className="title">Valores de Entrada</h2>
            <input
              type="text"
              placeholder="Q"
              name="Q"
              title="Conjunto de estados internos"
              value={state.Q}
              onChange={textChange}
            />

            <input
              type="text"
              placeholder="Γ"
              name="alphaInput"
              title="Alfabeto de entrada"
              value={state.alphaInput}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="Γ"
              name="blank"
              title="Carácter Branco"
              value={state.blank}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="q0"
              name="initialState"
              title="Estado inicial"
              value={state.initialState}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="F"
              name="finalState"
              title="Conjunto de estados finais"
              value={state.finalState}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="Σ"
              name="inputMachine"
              title="Alfabeto da fita"
              value={state.inputMachine}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="Saída"
              name="output"
              title="Saída"
              value={state.output}
              onChange={textChange}
              disabled
            />
            <button type="submit">Processar</button>
            <button type="button" style={{ marginLeft: 10 }} onClick={resetState}>
              Limpar
            </button>
          </div>
          <div className="right-form">
            <h2 className="title">Máquina de Turing δ</h2>
            {state.turingMachines.map((e, index, array) => (
              <Fragment key={index}>
                <TuringMachineTodo turingMachine={e} textChange={textChangeTuringMachine(index)} />
                {index !== array.length - 1 && (
                  <button type="button" onClick={() => removeTuringMachine(index)}>
                    <AiOutlineClose />
                  </button>
                )}
              </Fragment>
            ))}
            <button type="button" onClick={addTuringMachine}>
              <HiPlus />
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
