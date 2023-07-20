import { req } from '@/utils/request'

export const testApi = () => req({ url: '/', method: 'GET' })
