import { Palette, PaletteOptions, TypeBackground } from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {

  interface TypeBackground {
    level1: string;
  }
}

declare module '@material-ui/core/styles/createPalette' {

    export interface PaletteProgress {
        positive: string;
        negative: string;
    }

    interface Palette {
        progress: PaletteProgress;
    }

    interface PaletteOptions {
      progress: PaletteProgress;
    }
}
