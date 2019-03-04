const reducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_SUCCESS':
    return state.concat({
      id: action.data.id,
      message: action.data.message,
      class: 'success'
    })

  case 'ADD_ERROR':
    return state.concat({
      id: action.data.id,
      message: action.data.message,
      class: 'error'
    })

  case 'CLEAR_NOTIFICATION':
    return state.filter((notification) => notification.id !== action.data)

  default:
    return state
  }
}

export const successNotificationAction = (message, time = 5000) => {
  return async (dispatch) => {
    const id = Math.floor(Math.random() * 1000)
    dispatch({
      type: 'ADD_SUCCESS',
      data: {
        message,
        id
      }
    })
    setTimeout(
      () =>
        dispatch({
          type: 'CLEAR_NOTIFICATION',
          data: id
        }),
      time
    )
  }
}

export const errorNotificationAction = (message, time = 5000) => {
  return async (dispatch) => {
    const id = Math.floor(Math.random() * 1000)
    dispatch({
      type: 'ADD_SUCCESS',
      data: {
        message,
        id
      }
    })
    setTimeout(
      () =>
        dispatch({
          type: 'CLEAR_NOTIFICATION',
          data: id
        }),
      time
    )
  }
}

export default reducer
