export type ChordData = {
  positions: [number, number | "x"][];
  barres?: {
    fromString: number;
    toString: number;
    fret: number;
  }[];
  position?: number;
};

export const GUITAR_CHORDS: { [key: string]: ChordData } = {
  // メジャーコード
  C: {
    positions: [
      [1, "x"],
      [2, 3],
      [3, 2],
      [4, 0],
      [5, 1],
      [6, 0],
    ],
  },
  D: {
    positions: [
      [1, 2],
      [2, 3],
      [3, 2],
      [4, 0],
      [5, "x"],
      [6, "x"],
    ],
  },
  E: {
    positions: [
      [1, 0],
      [2, 0],
      [3, 1],
      [4, 2],
      [5, 2],
      [6, 0],
    ],
  },
  F: {
    positions: [
      [1, 1],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 3],
      [6, 1],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  G: {
    positions: [
      [1, 3],
      [2, 3],
      [3, 0],
      [4, 0],
      [5, 2],
      [6, 3],
    ],
  },
  A: {
    positions: [
      [1, 0],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 0],
      [6, "x"],
    ],
  },
  B: {
    positions: [
      [1, 2],
      [2, 4],
      [3, 4],
      [4, 4],
      [5, 2],
      [6, "x"],
    ],
  },

  // マイナーコード
  Cm: {
    positions: [
      [1, "x"],
      [2, 3],
      [3, 1],
      [4, 0],
      [5, 1],
      [6, "x"],
    ],
  },
  Dm: {
    positions: [
      [1, 1],
      [2, 3],
      [3, 2],
      [4, 0],
      [5, "x"],
      [6, "x"],
    ],
  },
  Em: {
    positions: [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 2],
      [5, 2],
      [6, 0],
    ],
  },
  Fm: {
    positions: [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 3],
      [5, 3],
      [6, 1],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  Gm: {
    positions: [
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 5],
      [5, 5],
      [6, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 3 }],
  },
  Am: {
    positions: [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 2],
      [5, 0],
      [6, "x"],
    ],
  },
  Bm: {
    positions: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 4],
      [5, 2],
      [6, "x"],
    ],
  },
};
