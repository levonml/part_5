import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials, error) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    console.log('response.data', response.data)
    return response.data
  } catch (err) {
    error('incorrect login or password')
    setTimeout(() => error(null), 3000)
    console.log('error from login', err)
  }
}
const loginService = { login }
export default loginService
