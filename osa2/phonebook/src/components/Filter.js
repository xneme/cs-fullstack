import React from 'react'

const Filter = ({ filter, filterChangeHandler }) => {
  return (
    <div>
      rajaa näytettäviä <input value={filter} onChange={filterChangeHandler} />
    </div>
  )
}

export default Filter
