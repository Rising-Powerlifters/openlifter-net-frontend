import {
  LiftingAction,
  MeetSetupAction,
  OverwriteStoreAction,
  RegistrationAction
} from '../types/actionTypes'
import { RPC } from './rpc'

type Action = MeetSetupAction | OverwriteStoreAction | RegistrationAction | LiftingAction

interface RpcCall {
  method: string
  params: object
}

function actionToRpcCall(action: Action): RpcCall {
  const { type, ...params } = action
  return {
    method: type,
    params: { ...params }
  }
}

const rpc = new RPC()

export default function (action: Action) {
  const rpcCall = actionToRpcCall(action)
  rpc
    .client()
    .request(rpcCall.method, rpcCall.params)
    .then((result) => console.log(result))
}
