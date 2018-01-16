import React from 'react'

import connector from './container'

export const TrackListView = props => {
  function isTrackIdAdded(id) {
    return props.isTrackAdded(id)('added')
  }
  return (
    <div style={styles.container}>
      <div style={styles.header}>Tracks</div>
      <div>
        {props.tracks.map(track => (
          <div key={track.id}>
            {track.name}
            <br />
            <label htmlFor={`addRemoveTrack_${track.id}`}>
              Add to workspace
            </label>
            <input
              id={`addRemoveTrack_${track.id}`}
              type="checkbox"
              checked={isTrackIdAdded(track.id)}
              onChange={() => props.toggleAddTrack(track.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default connector(TrackListView)

export const styles = {
  container: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  header: {
    fontWeight: 'bold'
  }
}
