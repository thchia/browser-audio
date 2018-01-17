export default {
  getPosts: jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1 }, { id: 2 }])
    })
  ),
  getUsers: jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ username: 'Adam' }, { username: 'Zoey' }])
    })
  )
}
