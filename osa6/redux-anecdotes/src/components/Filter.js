import React from 'react'
import { connect } from 'react-redux'
import { changeFilterAction } from '../reducers/filterReducer'

const Filter = ({ filter, changeFilter }) => {
  const handleChange = (event) => {
    changeFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { filter: state.filter }
}

const mapDispatchToProps = {
  changeFilter: changeFilterAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
