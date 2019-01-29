import React from 'react'

const Filter = ({ value, filterChangeHandler }) => {
  return (
    <div>
      find countries <input value={value} onChange={filterChangeHandler} />
    </div>
  )
}

export default Filter
