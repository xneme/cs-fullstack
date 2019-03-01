const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const showNotificationAction = (notification, time = 3000) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: notification
    })
    setTimeout(
      () =>
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        }),
      time
    )
  }
}

export default reducer
