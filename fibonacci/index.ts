/**
 * Calculate the nth Fibonacci number. No recursion
 *
 * @param n - The position of the Fibonacci number to calculate.
 * @returns The nth Fibonacci number.
 */
export function fibonacci(n: number): number {
  if (n < 2) return n
  let a = 0
  let b = 1

  for (let i = 2; i <= n; i++) {
    const temp = a + b
    a = b
    b = temp
  }
  return b
}
