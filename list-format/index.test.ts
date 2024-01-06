import { describe, expect, it } from 'bun:test'
import { listFormat } from '.'

describe('listFormat', () => {
  it('empty list', () => {
    expect(listFormat([])).toBe('')
  })

  it('empty value', () => {
    expect(listFormat(['one', ''])).toBe('one')
  })

  it('a word', () => {
    expect(listFormat(['hello'])).toBe('hello')
  })

  it('two words', () => {
    expect(listFormat(['one', 'two'])).toBe('one and two')
  })

  it('three or more words', () => {
    expect(listFormat(['one', 'two', 'three'])).toBe('one, two, and three')
  })
})
