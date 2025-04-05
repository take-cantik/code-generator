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
      [1, 0],
      [2, 1],
      [3, 0],
      [4, 2],
      [5, 3],
      [6, "x"],
    ],
  },
  "C#": {
    positions: [
      [2, 3],
      [3, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 4,
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
  "D#": {
    positions: [
      [2, 3],
      [3, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 6,
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
      [3, 2],
      [4, 3],
      [5, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  "F#": {
    positions: [
      [3, 3],
      [4, 4],
      [5, 4],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 2 }],
  },
  G: {
    positions: [
      [1, 3],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 2],
      [6, 3],
    ],
  },
  "G#": {
    positions: [
      [3, 2],
      [4, 3],
      [5, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
    position: 4,
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
  "A#": {
    positions: [
      [2, 3],
      [3, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
  },
  B: {
    positions: [
      [2, 4],
      [3, 4],
      [4, 4],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 2 }],
  },

  // マイナーコード
  Cm: {
    positions: [
      [2, 4],
      [3, 5],
      [4, 5],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 3 }],
  },
  "C#m": {
    positions: [
      [2, 2],
      [3, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 4,
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
  "D#m": {
    positions: [
      [2, 2],
      [3, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 6,
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
      [4, 3],
      [5, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  "F#m": {
    positions: [
      [4, 4],
      [5, 4],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 2 }],
  },
  Gm: {
    positions: [
      [4, 5],
      [5, 5],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 3 }],
  },
  "G#m": {
    positions: [
      [4, 4],
      [5, 4],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 2 }],
    position: 4,
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
  "A#m": {
    positions: [
      [2, 2],
      [3, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
  },
  Bm: {
    positions: [
      [2, 3],
      [3, 4],
      [4, 4],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 2 }],
  },

  // メジャーセブンス
  Cmaj7: {
    positions: [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 2],
      [5, 3],
      [6, "x"],
    ],
  },
  Dmaj7: {
    positions: [
      [4, 0],
      [5, "x"],
      [6, "x"],
    ],
    barres: [{ fromString: 3, toString: 1, fret: 2 }],
  },
  Emaj7: {
    positions: [
      [1, 0],
      [2, 0],
      [3, 1],
      [4, 1],
      [5, 2],
      [6, 0],
    ],
  },
  Fmaj7: {
    positions: [
      [3, 2],
      [4, 2],
      [5, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  Gmaj7: {
    positions: [
      [1, 2],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 2],
      [6, 3],
    ],
  },
  Amaj7: {
    positions: [
      [1, 0],
      [2, 2],
      [3, 1],
      [4, 2],
      [5, 0],
      [6, "x"],
    ],
  },
  Bmaj7: {
    positions: [
      [2, 4],
      [3, 3],
      [4, 4],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 2 }],
  },

  // マイナーセブンス
  C7: {
    positions: [
      [1, 0],
      [2, 1],
      [3, 3],
      [4, 2],
      [5, 3],
      [6, "x"],
    ],
  },
  "C#7": {
    positions: [
      [2, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 4,
  },
  D7: {
    positions: [
      [1, 2],
      [2, 1],
      [3, 2],
      [4, 0],
      [5, "x"],
      [6, "x"],
    ],
  },
  "D#7": {
    positions: [
      [2, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 6,
  },
  E7: {
    positions: [
      [1, 0],
      [2, 0],
      [3, 1],
      [4, 0],
      [5, 2],
      [6, 0],
    ],
  },
  F7: {
    positions: [
      [3, 2],
      [5, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  "F#7": {
    positions: [
      [3, 3],
      [5, 4],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 2 }],
  },
  G7: {
    positions: [
      [1, 1],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 2],
      [6, 3],
    ],
  },
  "G#7": {
    positions: [
      [3, 2],
      [5, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
    position: 4,
  },
  A7: {
    positions: [
      [1, 0],
      [2, 1],
      [3, 0],
      [4, 2],
      [5, 0],
      [6, "x"],
    ],
  },
  "A#7": {
    positions: [
      [2, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
  },
  B7: {
    positions: [
      [1, 2],
      [2, 0],
      [3, 2],
      [4, 1],
      [5, 2],
      [6, "x"],
    ],
  },

  // マイナーセブンス
  Cm7: {
    positions: [
      [1, 0],
      [2, 4],
      [4, 5],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 3 }],
  },
  "C#m7": {
    positions: [
      [2, 2],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 4,
  },
  Dm7: {
    positions: [
      [1, 1],
      [2, 1],
      [3, 2],
      [4, 0],
      [5, "x"],
      [6, "x"],
    ],
  },
  "D#m7": {
    positions: [
      [2, 2],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 6,
  },
  Em7: {
    positions: [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 2],
      [6, 0],
    ],
  },
  Fm7: {
    positions: [[5, 3]],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  "F#m7": {
    positions: [[5, 4]],
    barres: [{ fromString: 6, toString: 1, fret: 2 }],
  },
  Gm7: {
    positions: [[5, 5]],
    barres: [{ fromString: 6, toString: 1, fret: 3 }],
  },
  "G#m7": {
    positions: [[5, 3]],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
    position: 4,
  },
  Am7: {
    positions: [
      [1, 0],
      [2, 1],
      [3, 0],
      [4, 2],
      [5, 0],
      [6, "x"],
    ],
  },
  "A#m7": {
    positions: [
      [2, 2],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
  },
  Bm7: {
    positions: [
      [2, 3],
      [4, 4],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 2 }],
  },

  // マイナーメジャーセブンス
  CmM7: {
    positions: [
      [1, 3],
      [2, 0],
      [3, 0],
      [4, 1],
      [5, 3],
      [6, "x"],
    ],
  },
  DmM7: {
    positions: [
      [1, 1],
      [2, 2],
      [3, 2],
      [4, 0],
      [5, "x"],
      [6, "x"],
    ],
  },
  EmM7: {
    positions: [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 1],
      [5, 2],
      [6, 0],
    ],
  },
  FmM7: {
    positions: [
      [4, 2],
      [5, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  GmM7: {
    positions: [
      [4, 4],
      [5, 5],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 3 }],
  },
  AmM7: {
    positions: [
      [1, 0],
      [2, 1],
      [3, 1],
      [4, 2],
      [5, 0],
      [6, "x"],
    ],
  },
  BmM7: {
    positions: [
      [2, 3],
      [3, 3],
      [4, 4],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 2 }],
  },

  // sus4
  Csus4: {
    positions: [
      [2, 4],
      [3, 3],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 3,
  },
  Dsus4: {
    positions: [
      [1, 3],
      [2, 3],
      [3, 2],
      [4, 0],
      [5, "x"],
      [6, "x"],
    ],
  },
  Esus4: {
    positions: [
      [1, 0],
      [2, 0],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 0],
    ],
  },
  Fsus4: {
    positions: [
      [3, 3],
      [4, 3],
      [5, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  Gsus4: {
    positions: [
      [1, 3],
      [2, 1],
      [3, 0],
      [4, 0],
      [5, 3],
      [6, 3],
    ],
  },
  Asus4: {
    positions: [
      [1, 0],
      [2, 3],
      [3, 2],
      [4, 2],
      [5, 0],
      [6, "x"],
    ],
  },
  Bsus4: {
    positions: [
      [2, 5],
      [3, 4],
      [4, 4],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 2 }],
  },
  C7sus4: {
    positions: [
      [2, 4],
      [4, 3],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 1 }],
    position: 3,
  },
  D7sus4: {
    positions: [
      [1, 3],
      [2, 1],
      [3, 2],
      [4, 0],
      [5, "x"],
      [6, "x"],
    ],
  },
  E7sus4: {
    positions: [
      [1, 0],
      [2, 0],
      [3, 2],
      [4, 0],
      [5, 2],
      [6, 0],
    ],
  },
  F7sus4: {
    positions: [
      [3, 3],
      [5, 3],
    ],
    barres: [{ fromString: 6, toString: 1, fret: 1 }],
  },
  G7sus4: {
    positions: [
      [3, 0],
      [4, 0],
      [5, 3],
      [6, 3],
    ],
    barres: [{ fromString: 2, toString: 1, fret: 1 }],
  },
  A7sus4: {
    positions: [
      [1, 0],
      [2, 3],
      [3, 0],
      [4, 2],
      [5, 0],
      [6, "x"],
    ],
  },
  B7sus4: {
    positions: [
      [2, 5],
      [4, 4],
      [6, "x"],
    ],
    barres: [{ fromString: 5, toString: 1, fret: 2 }],
  },
};
