import React from 'react'

import styles from '../components/common/ContentArea.module.scss'
import PlatformView from '../components/platform/PlatformView'

class PlatformContainer extends React.Component {
  render() {
    return (
      <div className={styles.contentAreaFull}>
        <PlatformView />
      </div>
    )
  }
}

export default PlatformContainer
