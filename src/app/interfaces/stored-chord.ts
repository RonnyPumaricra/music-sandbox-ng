export interface StoredChord {
  // name: string,
  /* Chords are relative to chosen root */
  distanceFromRoot: number,
  chordIndex: number,
  // abbr: (root: string) => string,
}