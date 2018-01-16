import { connect } from 'react-redux'

import {
  addedTracksSelector,
  tracksSelector,
  singleTrackAttributeSelector
} from '../../reducers/tracks'
import {
  toggleMasterMute,
  stopMasterTrack,
  seekTime,
  toggleMasterPlay,
  toggleMuteSingleTrack,
  updateMasterCurrentTime
} from '../../actions/tracks'

const mapStateToProps = state => ({
  ...tracksSelector(state),
  addedTracks: addedTracksSelector(state) || [],
  trackMuted: id => singleTrackAttributeSelector(state)(id)('muted')
})

const mapDispatchToProps = dispatch => ({
  handleMasterPlay: () => dispatch(toggleMasterPlay()),
  handleMasterStop: () => dispatch(stopMasterTrack()),
  handleMasterMute: () => dispatch(toggleMasterMute()),
  handleUpdateMasterTime: time => dispatch(updateMasterCurrentTime(time)),
  handleSeekTime: e => dispatch(seekTime(parseFloat(e.target.value))),
  muteSingleTrack: id => dispatch(toggleMuteSingleTrack(id))
})

export default connect(mapStateToProps, mapDispatchToProps)
