import * as actions from '../../actions/tracks'
import reducer, { initialState, singleTrackAttributeSelector } from './'

describe('tracks reducer', () => {
  it('returns state by default', () => {
    const expectedResult = initialState
    const result = reducer(undefined, { type: undefined })
    expect(result).toEqual(expectedResult)
  })

  it('handles REGISTER_TRACK', () => {
    const expectedResult = {
      ...initialState,
      tracks: [
        initialState.tracks[0],
        { ...initialState.tracks[1], node: 'node', added: true }
      ]
    }
    const result = reducer(initialState, actions.registerTrack('node', 2))
    expect(result).toEqual(expectedResult)
  })

  it('handles UNREGISTER_TRACK', () => {
    const expectedResult = initialState
    const dirtyState = reducer(initialState, actions.registerTrack('node', 2))
    const result = reducer(dirtyState, actions.unregisterTrack(2))
    expect(result).toEqual(expectedResult)
  })

  it('handles TOGGLE_MASTER_PLAY', () => {
    const expectedResult = {
      ...initialState,
      playing: true
    }
    const result = reducer(initialState, actions.toggleMasterPlay())
    expect(result).toEqual(expectedResult)
  })

  it('handles TOGGLE_MASTER_MUTE', () => {
    const expectedResult = {
      ...initialState,
      muted: !initialState.muted
    }
    const result = reducer(initialState, actions.toggleMasterMute())
    expect(result).toEqual(expectedResult)
  })

  it('handles UPDATE_MASTER_CURRENT_TIME', () => {
    const expectedResult = {
      ...initialState,
      currentTime: 88
    }
    const result = reducer(initialState, actions.updateMasterCurrentTime(88))
    expect(result).toEqual(expectedResult)
  })

  it('handles seek time', () => {
    const expectedResult = {
      ...initialState,
      currentTime: 8,
      lastSeekedTime: 8
    }
    const result = reducer(initialState, actions.seekTime(8))
    expect(result).toEqual(expectedResult)
  })

  it('handles STOP_MASTER_TRACK', () => {
    const expectedResult = {
      ...initialState,
      playing: false,
      currentTime: 0
    }
    const dirtyState = { ...initialState, playing: false, currentTime: 100 }
    const result = reducer(dirtyState, actions.stopMasterTrack())
    expect(result).toEqual(expectedResult)
  })

  it('handles TOGGLE_ADD_TRACK', () => {
    const expectedResult = {
      ...initialState,
      tracks: [
        initialState.tracks[0],
        { ...initialState.tracks[1], added: !initialState.tracks[1].added }
      ]
    }
    const result = reducer(initialState, actions.toggleAddTrack(2))
    expect(result).toEqual(expectedResult)
  })

  it('handles TOGGLE_MUTE_SINGLE_TRACK', () => {
    const expectedResult = {
      ...initialState,
      tracks: [
        initialState.tracks[0],
        {
          ...initialState.tracks[1],
          muted: !initialState.tracks[1].muted,
          added: true
        }
      ]
    }
    const dirtyState = reducer(initialState, actions.toggleAddTrack(2))
    const result = reducer(dirtyState, actions.toggleMuteSingleTrack(2))
    expect(result).toEqual(expectedResult)
  })
})

describe('tracks selector', () => {
  it('selects single track attribute', () => {
    const expectedResult = true
    const state = {
      tracks: {
        tracks: [{ id: 1, added: true }]
      }
    }
    const result = singleTrackAttributeSelector(state)(1)('added')
    expect(result).toEqual(expectedResult)
  })
})
