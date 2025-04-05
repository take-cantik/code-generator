declare module "vexchords" {
  export class ChordBox {
    constructor(
      element: HTMLElement,
      config?: {
        width?: number;
        height?: number;
        numStrings?: number;
        numFrets?: number;
        showTuning?: boolean;
        position?: number;
      }
    );

    draw(options: {
      chord: [number, number | "x"][];
      barres?: {
        fromString: number;
        toString: number;
        fret: number;
      }[];
    }): void;
  }
}
