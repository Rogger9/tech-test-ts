import { describe, expect, it } from 'bun:test'
import { twoSum } from '.'

describe('twoSum', () => {
  it('empty list', () => {
    const res = twoSum([], 1)
    expect(res).toStrictEqual([])
  })

  it('positive', () => {
    const res = twoSum([1, 2], 3)
    expect(res).toStrictEqual([0, 1])
    expect(twoSum([1, 2, 3, 3], 4)).toStrictEqual([0, 2])
  })

  it('negative', () => {
    const res = twoSum([-1, 1, 4], 3)
    expect(res).toStrictEqual([0, 2])
  })

  it('no target match', () => {
    const res = twoSum([1, 2], 10)
    expect(res).toStrictEqual([])
  })
})
