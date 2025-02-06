export interface Chord {
  name: string,
  distribution: Array<number>,
  abbr: (root: string) => {str: string, isRoot: boolean}[],
}