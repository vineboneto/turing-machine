import { useState, ChangeEvent, FormEvent } from 'react'
import { TuringMachine, TuringMachineProps } from './components'
import { Wrapper, GlobalStyle } from '../styles'

const defaultState = {
  m: '',
  q: '',
  turingMachines: [
    {
      current: '',
      next: '',
      read: '',
      write: '',
      direction: '',
    },
  ] as TuringMachineProps[],
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
              name="q"
              title="Conjunto de estados internos"
              value={state.q}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="Γ"
              name="entrada"
              title="Alfabeto de entrada"
              value={state.q}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="Σ"
              name="fita"
              title="Alfabeto da fita"
              value={state.q}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="δ"
              name="delta"
              title="Função de Transição"
              value={state.q}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="q0"
              name="q0"
              title="Estado inicial"
              value={state.q}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="F"
              name="F"
              title="Conjunto de estados finais"
              value={state.q}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="Entrada"
              name="entrada"
              title="Entrada"
              value={state.q}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="Saída"
              name="saida"
              title="Saída"
              value={state.q}
              onChange={textChange}
              disabled
            />
            <button type="submit">Processar</button>
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
