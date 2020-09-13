import { Palette, PaletteOptions, TypeBackground } from '@material-ui/core/styles/createPalette';
import { BoardKind } from '../main-board/reducer/main-board-reducer';

declare module '@material-ui/core/styles/createPalette' {

  interface TypeBackground {
    level1: string;
  }
}

declare module '@material-ui/core/styles/createPalette' {

  export type PaletteInvestment = {
    [K in BoardKind]: string;
  };

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
