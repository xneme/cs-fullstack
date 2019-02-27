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

export const showNotificationAction = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: notification
  }
}

export const clearNotificationAction = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer
