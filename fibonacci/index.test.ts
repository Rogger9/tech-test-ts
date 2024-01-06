import { describe, expect, it } from 'bun:test'
import { fibonacci } from '.'

describe('fibonacci', () => {
  it('simple case', () => {
    expect(1).toBe(fibonacci(1))
    expect(1).toBe(fibonacci(2))
  })

  it('random number', () => {
    expect(21).toBe(fibonacci(8))
    expect(55).toBe(fibonacci(10))
  })
})
