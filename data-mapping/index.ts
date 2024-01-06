import { keyHandlerMap } from './key-handler'

export type Data = Record<string, any>

export function dataMapping<T extends Data>(list: T[], keys: string[]) {
  if (!keys.length) throw new Error('Empty keys')

  return list.map(data => {
    const obj: Data = {}

    keys.forEach(key => {
      const [exc = 'default'] = key.match(/\W/g) ?? []
      const { k, value } = keyHandlerMap[exc](data, key)
      obj[k] = isIsoDate(value) ? formatDate(value) : value
    })

    return obj
  })
}

function isIsoDate(date: string) {
  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)
}

export function formatDate(date: string, locales = 'es') {
  return new Intl.DateTimeFormat(locales).format(new Date(date))
}
