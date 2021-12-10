import App from '../../../application/_app'
import { makeTuringMachine } from '../use-cases'

export function makeApp() {
  return <App turingMachine={makeTuringMachine()} />
}
