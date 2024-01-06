/**
 * Complete the method to format words into a single value separated by commas. The last word should be separated by the word 'and' instead of a comma. The method takes an array of strings and returns a single string.
 * Empty string values should be ignored.
 * Empty arrays should result in an empty string.
 */

export function listFormat(list: string[]): string {
  if (list.length === 0) return ''
  const newList = list.filter(val => val)
  return new Intl.ListFormat('en').format(newList)
}
