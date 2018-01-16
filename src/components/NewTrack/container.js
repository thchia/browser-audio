import { connect } from 'react-redux'

import { registerTrack, unregisterTrack } from '../../actions/tracks'
import { tracksSelector } from '../../reducers/tracks'

const mapStateToProps = state => ({
  lastSeeked: tracksSelector(state).lastSeekedTime,
  masterMuted: tracksSelector(state).muted
})

const mapDispatchToProps = dispatch => ({
  registerTrack: (id, node) => dispatch(registerTrack(node, id)),
  unregisterTrack: id => dispatch(unregisterTrack(id))
})

export default connect(mapStateToProps, mapDispatchToProps)
