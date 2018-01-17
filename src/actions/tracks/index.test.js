import * as actions from './'
import * as types from './types'

describe('tracks action creators', () => {
  it('creates action to register track', () => {
    const expectedResult = {
      type: types.REGISTER_TRACK,
      payload: { node: 'node', id: 'id' }
    }
    expect(actions.registerTrack('node', 'id')).toEqual(expectedResult)
  })

  it('creates action to unregister track', () => {
    const expectedResult = {
      type: types.UNREGISTER_TRACK,
      payload: { id: 'id' }
    }
    expect(actions.unregisterTrack('id')).toEqual(expectedResult)
  })

  it('creates action to toggle master play', () => {
    const expectedResult = {
      type: types.TOGGLE_MASTER_PLAY,
      payload: {}
    }
    expect(actions.toggleMasterPlay()).toEqual(expectedResult)
  })

  it('creates action to toggle master mute', () => {
    const expectedResult = {
      type: types.TOGGLE_MASTER_MUTE,
      payload: {}
    }
    expect(actions.toggleMasterMute()).toEqual(expectedResult)
  })

  it('creates action to toggle single track mute', () => {
    const expectedResult = {
      type: types.TOGGLE_MUTE_SINGLE_TRACK,
      payload: { id: 'id' }
    }
    expect(actions.toggleMuteSingleTrack('id')).toEqual(expectedResult)
  })

  it('creates action to update master current time', () => {
    const expectedResult = {
      type: types.UPDATE_MASTER_CURRENT_TIME,
      payload: { time: 88 }
    }
    expect(actions.updateMasterCurrentTime(88)).toEqual(expectedResult)
  })

  it('creates action to seek time', () => {
    const expectedResult = {
      type: types.SEEK_TIME,
      payload: { time: 108 }
    }
    expect(actions.seekTime(108)).toEqual(expectedResult)
  })

  it('creates action to stop master track', () => {
    const expectedResult = {
      type: types.STOP_MASTER_TRACK,
      payload: {}
    }
    expect(actions.stopMasterTrack()).toEqual(expectedResult)
  })

  it('creates action to add track to the workspace', () => {
    const expectedResult = {
      type: types.TOGGLE_ADD_TRACK,
      payload: { id: 888 }
    }
    expect(actions.toggleAddTrack(888)).toEqual(expectedResult)
  })
})
