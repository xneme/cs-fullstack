import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts'

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 1000,
    name: 'Oskari Olematon',
    number: '000-000000'
  }
  return request.then((response) => response.data.concat(nonExisting))
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(() => id)
}

export default { getAll, create, update, remove }
