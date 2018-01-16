import { connect } from 'react-redux'

import { toggleAddTrack } from '../../actions/tracks'
import {
  singleTrackAttributeSelector,
  tracksSelector
} from '../../reducers/tracks'

const mapStateToProps = state => ({
  ...tracksSelector(state),
  isTrackAdded: singleTrackAttributeSelector(state)
})

const mapDispatchToProps = dispatch => ({
  toggleAddTrack: id => dispatch(toggleAddTrack(id))
})

export default connect(mapStateToProps, mapDispatchToProps)
