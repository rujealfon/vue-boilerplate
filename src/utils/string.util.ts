/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} input - The input string to be capitalized.
 * @return {string | undefined} - The capitalized string, or undefined if the input is falsy or not a string.
 */
export const capitalize = (input: string): string | undefined => {
  if (!input || typeof input !== 'string') {
    return
  }

  return input.charAt(0).toUpperCase() + input.slice(1)
}
