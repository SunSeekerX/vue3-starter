import { isNil, isPlainObject } from 'lodash'

/**
 * 去除对象中有key为undefined或者null的情况
 * @param { Object } obj
 * @returns { Object } 处理完成之后的对象
 */
export function removeEmptyKey(obj = {}, remove = true) {
  for (const [key, value] of Object.entries(obj)) {
    if (isNil(value) || value === '') {
      remove ? delete obj[key] : (obj[key] = undefined)
    }
    if (isPlainObject(value)) {
      removeEmptyKey(value)
    }
  }
  return obj
}

export const isValidUrl = (urlString) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ) // validate fragment locator
  return !!urlPattern.test(urlString)
}
