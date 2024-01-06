export function twoSum(numbers: number[], target: number) {
  const store: Record<number, number> = {}

  for (let i = 0; i < numbers.length; i++) {
    const el = numbers[i]
    const diff = target - el
    if (diff in store) return [store[diff], i]
    store[el] = i
  }

  return []
}
