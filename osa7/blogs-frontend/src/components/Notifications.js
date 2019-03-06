import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notifications = ({ notifications }) => {
  return (
    <div>
      {notifications.map((notification) => {
        switch (notification.class) {
        case 'success':
          return (
            <Message success key={notification.id}>
              {notification.message}
            </Message>
          )
        case 'error':
          return (
            <Message error key={notification.id}>
              {notification.message}
            </Message>
          )
        default:
          return (
            <Message key={notification.id}>{notification.message}</Message>
          )
        }
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(Notifications)
