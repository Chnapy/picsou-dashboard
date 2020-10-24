import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';

const white = '#FFFFFF';
const primary = '#EBDE66';

const bgDark = '#181818';
const bgPanel = '#333333';
const bgMain = '#424242';

export const appTheme: Theme = createMuiTheme({
    palette: {
        type: 'dark',
        common: {
            black: bgDark,
            white
        },
        primary: {
            main: primary,
            contrastText: bgDark
        },
        secondary: {
            main: white
        },
        action: {
            disabled: '#888',
            // disabledBackground: '#888'
        },
        text: {
            primary: white
        },
        background: {
            default: bgDark,
            paper: bgPanel,
            level1: bgMain
        },
        investment: {
            cash: '#E0E0E0',
            gold: '#EBDE66',
            market: '#EB5757'
        },
        progress: {
            positive: '#6FCF97',
            negative: '#EB5757',
            zero: '#888',
        }
    },
    shape: {
        borderRadius: 0
    },
    typography: {
        htmlFontSize: 10,
        fontSize: 12,

        fontFamily: '"Montserrat", sans-serif',

        h1: {
            fontSize: '3.4rem',
            color: primary,
            textTransform: 'uppercase',
            fontWeight: 300
        },
        h2: {
            fontSize: '2.4rem',
            color: primary,
            textTransform: 'uppercase'
        },
        h3: {
            fontSize: '1.6rem',
            color: primary,
            textTransform: 'uppercase'
        },
        h4: {
            fontSize: '1.4rem',
            textTransform: 'uppercase',
            fontWeight: 500
        },
        body1: {
            fontSize: '1.4rem',
            fontWeight: 500
        },
        body2: {
            fontSize: '1.2rem',
            fontWeight: 500
        },
        button: {
            fontSize: '1.2rem',
            fontWeight: 600
        }
    },
    props: {
        MuiButtonBase: {
            centerRipple: true
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    fontSize: '62.5%'
                }
            },
        },

        MuiInput: {
            underline: {
                '&::before': {
                    borderWidth: 2
                }
            }
        },

        MuiFilledInput: {
            underline: {
                '&::before': {
                    borderWidth: '2px !important'
                }
            }
        },

        MuiOutlinedInput: {
            notchedOutline: {
                borderWidth: 2
            }
        },

        MuiTooltip: {
            tooltip: {
                backgroundColor: bgDark,
                fontSize: '1rem'
            }
        }
    }
});
