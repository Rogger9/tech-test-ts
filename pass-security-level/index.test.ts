import { describe, expect, test } from 'bun:test'
import { securityLevel } from '.'

describe('securtestyLevel', () => {
  test('not safe', () => {
    expect(securityLevel('a1/')).toBe(0)
    expect(securityLevel('aaaaaa')).toBe(0)
  })

  test('weak', () => {
    expect(securityLevel('acb123')).toBe(1)
    expect(securityLevel('aaaaaaaaaa123')).toBe(1)
    expect(securityLevel('Aaaaaaaaaa123')).toBe(1)
  })

  test('medium', () => {
    const res = securityLevel('abCD123/#')
    expect(res).toBe(2)
  })

  test('safe', () => {
    expect(securityLevel('abCDEF123/#')).toBe(3)
    expect(securityLevel('abcDEF0123zpxmqs')).toBe(3)
  })

  test('strong', () => {
    const res = securityLevel('abCD/123#zrpmxgi')
    expect(res).toBe(4)
  })
})
