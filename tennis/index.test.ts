import { describe, expect, it } from 'bun:test'
import { tennisMatch, type Player } from '.'
const P1: Player = 'P1'
const P2: Player = 'P2'

describe('tennisMatch', () => {
  it('start', () => {
    expect(tennisMatch([])).toBe('Love - Love')
  })

  it('15 - 0', () => {
    const game = '15 - Love'
    const res = tennisMatch([P1])
    expect(res).toBe(game)
  })

  it('15 - 15', () => {
    const res = tennisMatch([P1, P2])
    expect(res).toEndWith('15 - 15')
  })

  it('Deuce', () => {
    const record = [P1, P1, P2, P1, P2, P2]
    expect(tennisMatch(record)).toEndWith('Deuce')

    const record2 = [P1, P1, P2, P1, P2, P2, P1, P2]
    expect(tennisMatch(record2)).toEndWith('Deuce')
  })

  it('Ad', () => {
    const record = [P1, P1, P2, P1, P2, P2, P1]
    expect(tennisMatch(record)).toEndWith(`Ad ${P1}`)

    const record2 = [P1, P1, P2, P1, P2, P2, P1, P2, P2]
    expect(tennisMatch(record2)).toEndWith(`Ad ${P2}`)
  })

  it('Win', () => {
    const record = [P1, P1, P1, P1]
    expect(tennisMatch(record)).toEndWith(`Win ${P1}`)

    const record2 = [P1, P2, P2, P2, P2]
    expect(tennisMatch(record2)).toEndWith(`Win ${P2}`)
  })

  it('Invalid record', () => {
    const record = new Array(7).fill(P1)
    const fn = () => tennisMatch(record)
    expect(fn).toThrow()
  })
})
