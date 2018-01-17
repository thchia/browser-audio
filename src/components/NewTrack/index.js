import React from 'react'

import connector from './container'

export class Track extends React.Component {
  constructor() {
    super()
    this.state = {
      duration: 0
    }
    this.handleDurationChange = this.handleDurationChange.bind(this)
  }
  componentDidMount() {
    this.props.registerTrack(this.props.id, this.audioNode)
  }
  componentWillUnmount() {
    this.props.unregisterTrack(this.props.id)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.lastSeeked !== nextProps.lastSeeked) {
      this.audioNode.currentTime = nextProps.lastSeeked
    }
  }
  handleDurationChange(e) {
    this.setState({ duration: this.audioNode.duration })
  }
  render() {
    return (
      <div
        style={styles.addedTrack(
          this.state.duration / this.props.maxDuration * 100
        )}
      >
        <div style={styles.trackName}>{this.props.name}</div>
        <audio
          onDurationChange={this.handleDurationChange}
          muted={this.props.muted || this.props.masterMuted}
          ref={node => (this.audioNode = node)}
          src={this.props.src}
        >
          Audio not supported in this browser
        </audio>
      </div>
    )
  }
}

export default connector(Track)

export const styles = {
  trackName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 10,
    padding: 4
  },
  addedTrack: width => ({
    backgroundColor: 'lightgreen',
    height: 'calc(100% - 2px)',
    width: `${width}%`,
    borderRadius: 10,
    border: 'solid 1px green'
  })
}
