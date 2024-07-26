import React from 'react'
import { GlobalState, LiftingState, RegistrationState } from '../../types/stateTypes'
import { Entry, Language, LoadedPlate, Plate } from '../../types/dataTypes'
import { connect } from 'react-redux'
import styles from './Platform.module.scss'
import { displayWeightOnePlace, kg2lbs } from '../../logic/units'
import { makeLoadingRelative, selectPlates } from '../../logic/barLoad'
import { liftToAttemptFieldName } from '../../logic/entry'
import { getLiftingOrder } from '../../logic/liftingOrder'
import { getString } from '../../logic/strings'
import BarLoadLg from '../lifting/BarLoadLg'
import Button from 'react-bootstrap/Button'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface StateProps {
  inKg: boolean
  showAlternateUnits: boolean
  squatBarAndCollarsWeightKg: number
  benchBarAndCollarsWeightKg: number
  deadliftBarAndCollarsWeightKg: number
  plates: ReadonlyArray<Plate>
  registration: RegistrationState
  lifting: LiftingState
  entriesInFlight: Array<Entry>
  language: Language
}

type Props = StateProps

interface BarLoadOptions {
  name: string
  weightKg: number
  weightLbs: number
  rackInfo: string
}

class PlatformView extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  getBarLoadProps = (entryId: number | null, attemptOneIndexed: number | null): BarLoadOptions => {
    const lift = this.props.lifting.lift
    const fieldKg = liftToAttemptFieldName(lift)

    // Defaults, in case of no lifter.
    if (
      entryId === null ||
      entryId === undefined ||
      attemptOneIndexed === null ||
      attemptOneIndexed === undefined
    ) {
      return { name: '', weightKg: 0, weightLbs: 0, rackInfo: '' }
    }

    const idx = this.props.registration.lookup[entryId]
    const entry = this.props.registration.entries[idx]

    const weightKg = entry[fieldKg][attemptOneIndexed - 1]
    const weightLbs = kg2lbs(weightKg)

    let rackInfo = ''
    if (lift === 'S') rackInfo = entry.squatRackInfo
    if (lift === 'B') rackInfo = entry.benchRackInfo

    const name = entry.name

    return { name, weightKg, weightLbs, rackInfo }
  }

  getBarAndCollarsWeightKg = (): number => {
    switch (this.props.lifting.lift) {
      case 'S':
        return this.props.squatBarAndCollarsWeightKg
      case 'B':
        return this.props.benchBarAndCollarsWeightKg
      case 'D':
        return this.props.deadliftBarAndCollarsWeightKg
      default:
        return 0
    }
  }

  // Check whether "document.fullscreenElement" exists, including prefixes.
  hasFullscreenElement = (): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = document
    if (doc.fullscreenElement) return true
    if (doc.webkitFullscreenElement) return true
    if (doc.mozFullscreenElement) return true
    if (doc.msFullscreenElement) return true
    return false
  }

  // Calls exitFullscreen(), but with prefixes.
  exitFullscreen = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = document
    if (typeof doc.exitFullscreen === 'function') doc.exitFullscreen()
    else if (typeof doc.webkitExitFullscreen === 'function') doc.webkitExitFullscreen()
    else if (typeof doc.mozExitFullscreen === 'function') doc.mozExitFullscreen()
    else if (typeof doc.msExitFullscreen === 'function') doc.msExitFullscreen()
  }

  // Calls requestFullscreen(), but with prefixes.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestFullscreen = (e: any) => {
    if (typeof e.requestFullscreen === 'function') e.requestFullscreen()
    else if (typeof e.webkitRequestFullscreen === 'function') e.webkitRequestFullscreen()
    else if (typeof e.mozRequestFullscreen === 'function') e.mozRequestFullscreen()
    else if (typeof e.msRequestFullscreen === 'function') e.msRequestFullscreen()
  }

  // Called when the "Toggle Fullscreen" button is clicked.
  handleFullscreen = () => {
    // Document must be typecast to "any" because the fullscreen properties
    // used here aren't defined in the Flow Document type definition.
    if (this.hasFullscreenElement()) {
      this.exitFullscreen()
    } else {
      const liftingView = document.getElementById('platformView')
      if (liftingView !== null) {
        this.requestFullscreen(liftingView)
      }
    }
  }

  render() {
    const now = getLiftingOrder(this.props.entriesInFlight, this.props.lifting)

    const current = this.getBarLoadProps(now.currentEntryId, now.attemptOneIndexed)
    const next = this.getBarLoadProps(now.nextEntryId, now.nextAttemptOneIndexed)

    // Show one decimal point, and omit it if possible.
    const language = this.props.language
    const weightKgText = displayWeightOnePlace(current.weightKg, language)
    const weightLbsText = displayWeightOnePlace(current.weightLbs, language)
    const nextWeightKgText = displayWeightOnePlace(next.weightKg, language)
    const nextWeightLbsText = displayWeightOnePlace(next.weightLbs, language)

    const barAndCollarsWeightKg = this.getBarAndCollarsWeightKg()

    // Calculate both loadings.
    const currentLoading: Array<LoadedPlate> = selectPlates(
      current.weightKg,
      barAndCollarsWeightKg,
      this.props.plates,
      this.props.inKg
    )
    const nextLoading: Array<LoadedPlate> = selectPlates(
      next.weightKg,
      barAndCollarsWeightKg,
      this.props.plates,
      this.props.inKg
    )

    // Set the next loading relative to the current loading.
    if (next.weightKg >= current.weightKg) {
      makeLoadingRelative(nextLoading, currentLoading)
    }
    //
    // let nextEntryName = undefined
    // if (typeof now.nextEntryId === 'number') {
    //   const idx = this.props.registration.lookup[now.nextEntryId]
    //   nextEntryName = this.props.registration.entries[idx].name
    // }

    let attemptTemplate = ''
    if (this.props.inKg) {
      if (this.props.showAlternateUnits) {
        attemptTemplate = getString('lifting.current-weight-kg-lbs', language)
      } else {
        attemptTemplate = getString('lifting.current-weight-kg', language)
      }
    } else {
      if (this.props.showAlternateUnits) {
        attemptTemplate = getString('lifting.current-weight-lbs-kg', language)
      } else {
        attemptTemplate = getString('lifting.current-weight-lbs', language)
      }
    }

    const nextBarLoad =
      next.weightKg === 0 ? undefined : (
        <div className={styles.loadingBar}>
          <div className={styles.attemptText}>
            <div className="">{next.name}</div>
            <div className="">
              {attemptTemplate
                .replace('{kg}', nextWeightKgText)
                .replace('{lbs}', nextWeightLbsText)}
            </div>
          </div>
          <div className={styles.barArea}>
            <BarLoadLg
              key={String(next.weightKg) + next.rackInfo}
              loading={nextLoading}
              rackInfo={next.rackInfo}
              inKg={this.props.inKg}
            />
          </div>
        </div>
      )

    return (
      <div className={styles.fullscreenContainer} id="platformView">
        <div className={styles.container}>
          <div className={styles.loadContainer}>
            <div className={styles.loadingBar}>
              <div className={styles.attemptText}>
                <div className="">{current.name}</div>
                <div className="">
                  {attemptTemplate.replace('{kg}', weightKgText).replace('{lbs}', weightLbsText)}
                </div>
              </div>
              <div className={styles.barArea}>
                <BarLoadLg
                  key={String(current.weightKg) + current.rackInfo}
                  loading={currentLoading}
                  rackInfo={current.rackInfo}
                  inKg={this.props.inKg}
                />
              </div>
            </div>
            {nextBarLoad}
          </div>
          <div className={styles.footer}>
            <Button
              variant="outline-secondary"
              onClick={this.handleFullscreen}
              className={styles.fullscreen}
            >
              <FontAwesomeIcon icon={faExpand} />
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState): StateProps => {
  const day = state.lifting.day
  const platform = state.lifting.platform
  const flight = state.lifting.flight

  const entriesOnPlatform = state.registration.entries.filter(
    (entry) => entry.day === day && entry.platform === platform
  )

  const entriesInFlight = entriesOnPlatform.filter((entry) => entry.flight === flight)
  return {
    inKg: state.meet.inKg,
    showAlternateUnits: state.meet.showAlternateUnits,
    squatBarAndCollarsWeightKg: state.meet.squatBarAndCollarsWeightKg,
    benchBarAndCollarsWeightKg: state.meet.benchBarAndCollarsWeightKg,
    deadliftBarAndCollarsWeightKg: state.meet.deadliftBarAndCollarsWeightKg,
    plates: state.meet.plates,
    registration: state.registration,
    lifting: state.lifting,
    entriesInFlight: entriesInFlight,
    language: state.language
  }
}

export default connect(mapStateToProps)(PlatformView)
