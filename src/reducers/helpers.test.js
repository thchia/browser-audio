import * as helpers from './helpers'

describe('updateInArray', () => {
  const originalArray = [1, 2, 4, 4]
  const resultArray = helpers.updateInArray(originalArray, 2, 3)
  it('inserts', () => {
    expect(resultArray).toEqual([1, 2, 3, 4])
  })
  it('does not mutate original array', () => {
    expect(originalArray[2]).toBe(4)
  })
})
