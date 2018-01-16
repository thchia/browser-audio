import { connect } from 'react-redux'

import {
  requestPosts,
  toggleGroupByUserId,
  toggleSortOrder,
  updateSortBy
} from '../../actions/posts'
import { requestUsers } from '../../actions/users'
import { postsSelector } from '../../reducers/posts'
import { usersSelector } from '../../reducers/users'

const mapStateToProps = state => ({
  ...postsSelector(state),
  fetchingUsers: usersSelector(state).fetching
})

const mapDispatchToProps = dispatch => ({
  handleChangeSortBy: e => dispatch(updateSortBy(e.target.value)),
  handleChangeSortOrder: () => dispatch(toggleSortOrder()),
  toggleGroupByUserId: () => dispatch(toggleGroupByUserId()),
  requestFetchPosts: () => {
    dispatch(requestPosts())
    dispatch(requestUsers())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
