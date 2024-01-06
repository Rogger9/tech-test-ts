export type Player = 'P1' | 'P2'

const GAME_POINTS = ['Love', '15', '30', '40']
const MIN_GAME_POINTS = GAME_POINTS.length - 1
const MIN_DIFF = 2
const MAX_DIFF = MIN_GAME_POINTS + MIN_DIFF

export function tennisMatch(record: Player[]): string {
  if (!record.length) return 'Love - Love'
  const points: Record<Player, number> = {
    P1: 0,
    P2: 0,
  }

  const getResult = () => `${GAME_POINTS[points.P1]} - ${GAME_POINTS[points.P2]}`

  const res = record.map(player => {
    points[player]++
    if (points[player] < MIN_GAME_POINTS) return getResult()
    const diff = Math.abs(points.P1 - points.P2)
    return handleEndGame(diff, player)
  })

  return res.join('\n')
}

function handleEndGame(diff: number, player: Player) {
  switch (true) {
    case diff === 0:
      return 'Deuce'
    case diff < MIN_DIFF:
      return `Ad ${player}`
    case diff >= MAX_DIFF:
      throw new Error('Invalid record')
    default:
      return `Win ${player}`
  }
}
