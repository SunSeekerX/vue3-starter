import { createRequest } from './request'

export const req = createRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
})
