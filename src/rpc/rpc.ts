import { JSONRPCClient, JSONRPCServer, JSONRPCServerAndClient } from 'json-rpc-2.0'
import { store } from '../store'
import { overwriteStore } from '../actions/globalActions'
import { GlobalState } from '../types/stateTypes'

const GET_STATE = 'GET_STATE'
const STATE_UPDATE = 'STATE_UPDATE'

export class RPC {
  private static instance: RPC | undefined

  // @ts-expect-error Will always be set by connectSocket() call in constructor
  private rpc: JSONRPCServerAndClient
  private socketConnected: boolean = false
  public reconnectTimeoutSeconds: number = 2

  private onDisconnectFunctions: Array<() => void> = []
  private onConnectFunctions: Array<() => void> = []

  public constructor() {
    if (RPC.instance) {
      return RPC.instance
    }
    this.connectSocket()
    RPC.instance = this
  }

  private connectSocket() {
    const socket = new WebSocket('ws://localhost:8080/socket')
    const rpc = new JSONRPCServerAndClient(
      new JSONRPCServer(),
      new JSONRPCClient((request) => {
        socket.send(JSON.stringify(request))
      })
    )

    socket.onclose = () => {
      this.socketConnected = false
      this.executeOnDisconnectFunctions()
      console.log('Socket was closed, attempting reconnect in 1 second...')
      setTimeout(() => {
        this.connectSocket()
      }, this.reconnectTimeoutSeconds * 1000)
    }

    socket.onerror = (err: Event) => {
      const error = err as ErrorEvent
      console.log(`Socket encountered an error: ${error.message} Closing Socket`)
      socket.close()
    }

    socket.addEventListener('open', () => {
      this.socketConnected = true
      this.executeOnConnectFunctions()
      rpc.client.request(GET_STATE, {}).then((props) => {
        const update: Partial<GlobalState> = props.state
        RPC.overwriteStore(update)
      })
    })

    socket.onmessage = (event: MessageEvent) => {
      rpc.receiveAndSend(JSON.parse(event.data))
    }

    rpc.addMethod(STATE_UPDATE, (props) => {
      const update: Partial<GlobalState> = props.state
      RPC.overwriteStore(update)
    })

    this.rpc = rpc
  }

  private static overwriteStore(update: Partial<GlobalState>) {
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
  }

  public client() {
    return this.rpc.client
  }

  public onConnect(callback: () => void) {
    this.onConnectFunctions.push(callback)
  }

  public onDisconnect(callback: () => void) {
    this.onDisconnectFunctions.push(callback)
  }

  private executeOnConnectFunctions() {
    this.onConnectFunctions.forEach((func) => func())
  }

  private executeOnDisconnectFunctions() {
    this.onDisconnectFunctions.forEach((func) => func())
  }
}
