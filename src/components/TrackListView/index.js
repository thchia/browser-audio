import React from 'react'

import connector from './container'

/**
 * TODO:
 * Test that onChange the input toggles prop function
 */

export const TrackListView = props => {
  function isTrackIdAdded(id) {
    return props.isTrackAdded(id)('added')
  }
  return (
    <div style={styles.container}>
      <div style={styles.header}>Tracks</div>
      <div>
        {props.tracks.map(track => (
          <div key={track.id} style={styles.tracksContainer}>
            {track.name}
            <br />
            <div style={styles.addToContainer}>
              <label htmlFor={`addRemoveTrack_${track.id}`}>
                Add to workspace
              </label>
              <input
                style={styles.addToInput}
                id={`addRemoveTrack_${track.id}`}
                type="checkbox"
                checked={isTrackIdAdded(track.id)}
                onChange={() => props.toggleAddTrack(track.id)}
              />
            </div>
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
  },
  tracksContainer: {
    padding: '10px 10px',
    border: 'solid 1px darkgrey',
    borderRadius: 6,
    margin: '10px 0'
  },
  addToContainer: {
    padding: '10px 0 0 0'
  },
  addToInput: {
    marginLeft: 20
  }
}
