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
      [6, "x"],
      [5, 3],
      [4, 2],
      [3, 0],
      [2, 1],
      [1, 0],
    ],
  },
  D: {
    positions: [
      [6, "x"],
      [5, "x"],
      [4, 0],
      [3, 2],
      [2, 3],
      [1, 2],
    ],
  },
  E: {
    positions: [
      [6, 0],
      [5, 2],
      [4, 2],
      [3, 1],
      [2, 0],
      [1, 0],
    ],
  },
  F: {
    positions: [
      [6, 1],
      [5, 3],
      [4, 3],
      [3, 2],
      [2, 1],
      [1, 1],
    ],
    barres: [{ fromString: 1, toString: 6, fret: 1 }],
  },
  G: {
    positions: [
      [6, 3],
      [5, 2],
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 3],
    ],
  },
  A: {
    positions: [
      [6, "x"],
      [5, 0],
      [4, 2],
      [3, 2],
      [2, 2],
      [1, 0],
    ],
  },
  B: {
    positions: [
      [6, "x"],
      [5, 2],
      [4, 4],
      [3, 4],
      [2, 4],
      [1, 2],
    ],
  },

  // マイナーコード
  Cm: {
    positions: [
      [6, 1],
      [5, 2],
      [4, 3],
      [3, 3],
      [2, 1],
      [1, 1],
    ],
    position: 4,
  },
  Dm: {
    positions: [
      [6, "x"],
      [5, "x"],
      [4, 3],
      [3, 2],
      [2, 3],
      [1, 1],
    ],
  },
  Em: {
    positions: [
      [6, 0],
      [5, 2],
      [4, 2],
      [3, 0],
      [2, 0],
      [1, 0],
    ],
  },
  Fm: {
    positions: [
      [6, 1],
      [5, 3],
      [4, 3],
      [3, 1],
      [2, 1],
      [1, 1],
    ],
    barres: [{ fromString: 1, toString: 6, fret: 1 }],
  },
  Gm: {
    positions: [
      [6, 3],
      [5, 5],
      [4, 5],
      [3, 3],
      [2, 3],
      [1, 3],
    ],
    barres: [{ fromString: 1, toString: 6, fret: 3 }],
  },
  Am: {
    positions: [
      [6, "x"],
      [5, 0],
      [4, 2],
      [3, 2],
      [2, 1],
      [1, 0],
    ],
  },
  Bm: {
    positions: [
      [6, "x"],
      [5, 2],
      [4, 4],
      [3, 4],
      [2, 3],
      [1, 2],
    ],
  },
};
