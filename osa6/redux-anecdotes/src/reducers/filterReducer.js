const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.data
    default:
      return state
  }
}

export const changeFilterAction = (filter) => {
  return {
    type: 'CHANGE_FILTER',
    data: filter
  }
}

export default reducer
