import { useState, ChangeEvent, FormEvent } from 'react'
import { TuringMachine, TuringMachineProps } from './components'
import { Wrapper, GlobalStyle } from './styles'

const defaultState = {
  m: '',
  Q: '',
  turingMachines: [
    {
      current: '',
      next: '',
      read: '',
      write: '',
      direction: '',
    },
  ] as TuringMachineProps[],
  alphaInput: '',
  inputMachine: '',
  finalState: '',
  initialState: '',
  output: '',
}

export default function App() {
  const [state, setState] = useState(defaultState)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(state.turingMachines)
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
            <input type="text" placeholder="M" name="m" title="M" value={state.m} onChange={textChange} />
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
            <button type="submit" style={{ marginLeft: 10 }} onClick={resetState}>
              Limpar
            </button>
          </div>
          <div className="right-form">
            <h2 className="title">Máquina de Turing</h2>
            {state.turingMachines.map((e, index, array) => (
              <>
                <TuringMachine key={index} turingMachine={e} textChange={textChangeTuringMachine(index)} />
                {index !== array.length - 1 && (
                  <button type="button" onClick={() => removeTuringMachine(index)}>
                    x
                  </button>
                )}
              </>
            ))}
            <button type="button" onClick={addTuringMachine}>
              +
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
