/**
 * Fisher-Yates shuffle algorithm to randomize the array.
 * This ensures fair and random distribution of the list.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets a random subset of names for animation effects
 */
export function getRandomSubset<T>(source: T[], count: number): T[] {
  const subset: T[] = [];
  const sourceCopy = [...source];

  // If source is smaller than count, return shuffled source
  if (source.length <= count) {
    return shuffleArray(source);
  }

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * sourceCopy.length);
    subset.push(sourceCopy[randomIndex]);
    sourceCopy.splice(randomIndex, 1);
  }
  return subset;
}
