export function sanitizeAndCapitalizeSentences(input: string): string {
  // Replace unwanted characters with spaces
  const sanitizedInput = input.replace(/[\n\f\u000c]/g, ' ')
  // Split the sanitized input into sentences based on period, question mark, and exclamation mark
  const sentences = sanitizedInput.split(/(?<=[.!?])\s+/)
  // Capitalize the first letter of each sentence and make the rest lowercase
  const capitalizedSentences = sentences.map((sentence) => {
    // Trim any leading or trailing whitespace
    sentence = sentence.trim()
    // Capitalize the first letter and make the rest lowercase
    return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
  })
  // Join the sentences back together
  return capitalizedSentences.join(' ')
}
export function convertMetersToFeetAndInches(meters: number): string {
  const inchesPerFoot = 12
  const inchesTotal = meters * 39.37 // 1 meter is approximately 39.37 inches
  const feet = Math.floor(inchesTotal / inchesPerFoot)
  const remainingInches = Math.round(inchesTotal % inchesPerFoot)
  return `${feet}' ${remainingInches}"`
}
export function convertKgToPounds(kg: number): string {
  const poundsPerKg = 2.20462; // 1 kilogram is approximately 2.20462 pounds
  const pounds = kg * poundsPerKg
  return `${pounds.toFixed(1)} lbs`;
}
export function transformStatName(originalName: string): string {
  switch (originalName.toLowerCase()) {
    case 'hp': return 'HP'
    case 'special-attack': return 'Sp. Atk'
    case 'special-defense': return 'Sp. Def'
    default: return originalName
  }
}
export function formatGeneration(generation: string): string {
  const index = generation.search('-')
  const generationNumber = generation.substring(index+1, generation.length).toUpperCase()
  return `Generation ${generationNumber}`
}
export function extractNumberFromUrl(url: string): number {
  // Using regular expression to find the number inside the / /
  const match = url.match(/\/(\d+)\//)
  // Check if a match is found
  if (match) return parseInt(match[1], 10) // Convert the matched string to an integer
  else return 1; // Return null if no match is found
}