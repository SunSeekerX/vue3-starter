import axios from 'axios'
import { removeEmptyKey } from '@/utils'

export function createRequest(axiosOptions, createOptions) {
  createOptions = Object.assign(
    {
      packErr: true,
    },
    createOptions
  )
  const { packErr = true } = createOptions

  const instance = axios.create(
    Object.assign(
      {
        withCredentials: false,
        timeout: 15000,
      },
      axiosOptions
    )
  )

  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  )

  return async function request(config) {
    if (config.method.toUpperCase() === 'GET') {
      removeEmptyKey(config.params, false)
    } else {
      removeEmptyKey(config.data, false)
    }
    try {
      const res = await instance.request(config)
      return res
    } catch (error) {
      // console.log(error.toJSON())
      const result = {
        success: false,
      }
      if (error.response) {
        const { data } = error.response
        result['code'] = data.code || 500
        result['message'] = data.message || 'Internal server error'
        result['response'] = error.response
      } else if (error.request) {
        result['code'] = 400
        result['message'] = error.message || 'Network error'
      } else {
        result['code'] = 400
        result['message'] = error.message || 'App error'
      }
      if (packErr) {
        return Promise.resolve(result)
      } else {
        return Promise.reject(result)
      }
    }
  }
}
