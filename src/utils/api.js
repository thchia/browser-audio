const baseURL = 'https://jsonplaceholder.typicode.com'

export default {
  getPosts: () => fetch(`${baseURL}/posts`),
  getUsers: () => fetch(`${baseURL}/users`)
}
