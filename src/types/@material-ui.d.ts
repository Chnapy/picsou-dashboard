import { Palette, PaletteOptions, TypeBackground } from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {

  interface TypeBackground {
    level1: string;
  }
}

declare module '@material-ui/core/styles/createPalette' {

  export interface PaletteInvestment {
    cash: string;
    gold: string;
    market: string;
    immo: string;
  }

  export interface PaletteProgress {
    positive: string;
    negative: string;
  }

  interface Palette {
    investment: PaletteInvestment;
    progress: PaletteProgress;
  }

  interface PaletteOptions {
    investment: PaletteInvestment;
    progress: PaletteProgress;
  }
}
