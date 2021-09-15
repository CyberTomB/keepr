import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const github = Axios.create({
  baseURL: 'https://api.github.com',
  timeout: 8000
})
