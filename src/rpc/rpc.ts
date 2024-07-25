import { JSONRPCClient, JSONRPCServer, JSONRPCServerAndClient } from 'json-rpc-2.0'
import { store } from '../store'
import { overwriteStore } from '../actions/globalActions'
import { GlobalState } from '../types/stateTypes'

let socket: WebSocket

function connectSocket() {
  socket = new WebSocket('ws://localhost:8080/socket')

  socket.onclose = () => {
    console.log('Socket was closed, attempting reconnect in 1 second...')
    setTimeout(() => {
      connectSocket()
    })
  }

  socket.onerror = (err: Event) => {
    const error = err as ErrorEvent
    console.log(`Socket encountered an error: ${error.message} Closing Socket`)
    socket.close()
  }

  socket.onmessage = (event: MessageEvent) => {
    rpc.receiveAndSend(JSON.parse(event.data))
  }
}

connectSocket()

const rpc = new JSONRPCServerAndClient(
  new JSONRPCServer(),
  new JSONRPCClient((request) => {
    console.log(request)
    socket.send(JSON.stringify(request))
  })
)

rpc.addMethod('STATE_UPDATE', (props) => {
  console.log(props)
  const update: Partial<GlobalState> = props.state
  const state = store.getState()
  if (update.meet && update.lifting && update.registration) {
    const newState: GlobalState = {
      ...state,
      registration: update.registration,
      lifting: update.lifting,
      meet: update.meet
    }
    store.dispatch(overwriteStore(newState))
  }
})

export default rpc
