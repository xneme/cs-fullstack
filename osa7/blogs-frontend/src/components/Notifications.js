import React from 'react'
import { connect } from 'react-redux'

const Notifications = ({ notifications }) => {
  return (
    <div>
      {notifications.map((notification) => {
        return (
          <div className={notification.class} key={notification.id}>
            {notification.message}
          </div>
        )
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
