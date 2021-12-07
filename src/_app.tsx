import { useState, ChangeEvent, FormEvent } from 'react'
import { Wrapper, GlobalStyle } from './styles'

export default function App() {
  const [state, setState] = useState({
    m: '',
    q: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  const textChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }))
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
            <input
              type="text"
              placeholder="Atual"
              name="atualEstado"
              title="Atual Estado"
              value={state.q}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="Próximo"
              name="proximoEstado"
              title="Próximo estado"
              value={state.q}
              onChange={textChange}
            />
            <input type="text" placeholder="Lê" name="ler" title="Lê" value={state.q} onChange={textChange} />
            <input
              type="text"
              placeholder="Escreve"
              name="escreve"
              title="Escreve"
              value={state.q}
              onChange={textChange}
            />
            <input
              type="text"
              placeholder="Direção"
              name="direction"
              title="Direção"
              value={state.q}
              onChange={textChange}
            />
            <button>+</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
