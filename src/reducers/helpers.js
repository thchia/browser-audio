export const updateInArray = (arr, atIndex, addition) => [
  ...arr.slice(0, atIndex),
  addition,
  ...arr.slice(atIndex + 1)
]
