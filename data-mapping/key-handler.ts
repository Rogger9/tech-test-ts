import { Data } from '.'

type KeyHandler = (data: Data, key: string) => { k: string; value: any }

const handleDefault: KeyHandler = (data, key) => {
  return { k: key, value: data[key] }
}

const handleReplace: KeyHandler = (data, key) => {
  const [first, second] = key.split(':')
  return { k: second, value: data[first] }
}

const handleUnion: KeyHandler = (data, key) => {
  const [first, second] = key.split('&')
  const value = data[first] + ' ' + data[second]
  return { k: `${first}_${second}`, value }
}

const handleObject: KeyHandler = (data, key) => {
  const [, char] = key.match(/\W/g) ?? []

  if (char) {
    const [first, ...rest] = key.match(/\w+/g) ?? ['']
    return keyHandlerMap[char](data[first], rest.join(char))
  }

  const [first, second] = key.split('.')
  return { k: first, value: data[first][second] }
}

export const keyHandlerMap: Record<string, KeyHandler> = {
  ':': handleReplace,
  '&': handleUnion,
  '.': handleObject,
  default: handleDefault,
}
