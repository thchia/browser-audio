import React from 'react'

import Track from '../NewTrack'
import connector from './container'
import './index.css'

export const maxDuration = 60

export class TrackPlayer extends React.Component {
  constructor() {
    super()
    this.state = {
      interval: -1
    }
    this.muteAll = this.muteAll.bind(this)
    this.play = this.play.bind(this)
    this.renderTracks = this.renderTracks.bind(this)
    this.stop = this.stop.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTime >= maxDuration && nextProps.playing) {
      this.stop()
    }
  }
  renderTracks(tracks) {
    return tracks.map(track => {
      return (
        <React.Fragment key={track.id}>
          <div style={styles.trackControls}>
            <button
              style={styles.button(this.props.trackMuted(track.id), 'pink')}
              onClick={() => this.props.muteSingleTrack(track.id)}
            >
              Mute
            </button>
          </div>
          <div style={styles.track}>
            {track.added ? (
              <Track {...track} maxDuration={maxDuration} />
            ) : null}
          </div>
        </React.Fragment>
      )
    })
  }
  play() {
    if (this.state.interval > -1) return
    const interval = setInterval(() => {
      let count = this.props.currentTime
      this.props.handleUpdateMasterTime((count += 0.05))
    }, 50)
    this.props.addedTracks.forEach(track => track.node.play())
    this.props.handleMasterPlay()
    this.setState({ interval })
  }
  stop() {
    this.props.addedTracks.forEach(track => {
      track.node.pause()
      if (!this.props.playing) {
        track.node.currentTime = 0
      }
    })
    this.props.handleMasterStop()
    clearInterval(this.state.interval)
    this.setState({ interval: -1 })
  }
  muteAll() {
    this.props.handleMasterMute()
  }
  render() {
    const { props } = this
    return (
      <div style={styles.container}>
        <div>
          <div>
            <strong>Player</strong>
          </div>
          <div style={styles.masterControls}>
            <button style={styles.button(props.playing)} onClick={this.play}>
              Play
            </button>
            <button style={styles.button()} onClick={this.stop}>
              Stop
            </button>
            <button
              style={styles.button(props.muted, 'pink')}
              onClick={this.muteAll}
            >
              Mute
            </button>
          </div>
        </div>
        <div style={styles.tracks(props.tracks.length)}>
          <div />
          <div className="master-seek-bar">
            <input
              onChange={props.handleSeekTime}
              max={maxDuration}
              step="0.01"
              type="range"
              value={props.currentTime}
            />
          </div>
          {this.renderTracks(props.tracks)}
        </div>
      </div>
    )
  }
}

export default connector(TrackPlayer)

export const styles = {
  container: {
    padding: 20
  },
  masterControls: {
    padding: '20px 0'
  },
  button: (active, color = 'lightblue') => ({
    margin: '0 10px',
    backgroundColor: active ? color : 'lightgrey',
    padding: '5px 10px',
    border: 'none',
    borderRadius: 4
  }),
  tracks: numberOfTracks => ({
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gridTemplateRows: `10px repeat(${numberOfTracks}, 80px)`
  }),
  track: {
    backgroundColor: 'lightgrey',
    border: 'solid 1px darkgrey'
  },
  addedTrack: {
    backgroundColor: 'lightgreen',
    height: 'calc(100% - 2px)',
    borderRadius: 10,
    border: 'solid 1px green'
  },
  trackControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px darkgrey'
  }
}
