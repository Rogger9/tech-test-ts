const MIN_LENGTH = 6
const MIN_SAFE_LENGTH = 10
const RECOMMENDED_LENGTH = 16
const MAX_LEVEL = 4

const noPenaltyLevel = new Set([0, 1, MAX_LEVEL])

export function securityLevel(pass: string): number {
  if (pass.length < MIN_LENGTH) return 0

  const { uniqueCharactersCount, level } = analyzePassword(pass)

  const hasSafeLength = uniqueCharactersCount >= MIN_SAFE_LENGTH
  const lengthPenalty = hasSafeLength ? 0 : 1

  return noPenaltyLevel.has(level) ? level : level - lengthPenalty
}

function analyzePassword(pass: string) {
  const uniqueCharactersCount = new Set(pass).size

  const criteria = {
    hasNums: /\d/.test(pass),
    hasLowercase: /[a-z]/.test(pass),
    hasUppercase: /[A-Z]/.test(pass),
    hasNonAlphanumeric: /\W/.test(pass),
    hasRecommendedLength: uniqueCharactersCount >= RECOMMENDED_LENGTH,
  }

  const level = Object.values(criteria).filter(Boolean).length - 1

  return { uniqueCharactersCount, level }
}
