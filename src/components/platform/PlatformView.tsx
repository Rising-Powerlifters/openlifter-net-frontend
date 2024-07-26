import React from 'react'
import { GlobalState, LiftingState, MeetState } from '../../types/stateTypes'
import { Entry, Language } from '../../types/dataTypes'
import { connect } from 'react-redux'

interface StateProps {
  meet: MeetState
  lifting: LiftingState
  entriesInFlight: Array<Entry>
  language: Language
}

type Props = StateProps

class PlatformView extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return <div></div>
  }
}

const mapStateToProps = (state: GlobalState): StateProps => {
  const day = state.lifting.day
  const platform = state.lifting.platform
  const flight = state.lifting.flight

  const entriesOnPlatform = state.registration.entries.filter(
    (entry) => entry.day === day && entry.platform === platform
  )

  // Only receive entries that are in the currently-lifting group.
  const entriesInFlight = entriesOnPlatform.filter((entry) => entry.flight === flight)

  return {
    meet: state.meet,
    lifting: state.lifting,
    entriesInFlight: entriesInFlight,
    language: state.language
  }
}

export default connect(mapStateToProps)(PlatformView)
