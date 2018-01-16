import React from 'react'

import TrackList from '../TrackListView'
import TrackPlayer from '../TrackPlayer'

export default () => (
  <div style={styles.container}>
    <TrackList />
    <TrackPlayer />
  </div>
)

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    height: '100%'
  }
}
