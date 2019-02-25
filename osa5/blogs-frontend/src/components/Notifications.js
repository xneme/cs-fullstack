import React from 'react'

const Notifications = ({ errorMessage, successMessage }) => {
  return (
    <div>
      {errorMessage ? <div className="error">{errorMessage}</div> : ''}
      {successMessage ? <div className="success">{successMessage}</div> : ''}
    </div>
  )
}

export default Notifications
