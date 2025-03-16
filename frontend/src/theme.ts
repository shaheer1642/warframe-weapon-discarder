import { createTheme } from '@mui/material/styles';
import { blueGrey, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blueGrey[200],
            light: blueGrey[100],
            dark: blueGrey[300],
        },
        secondary: {
            main: blueGrey[700],
            light: blueGrey[600],
            dark: blueGrey[800],
        },
        background: {
            default: blueGrey[900],
            paper: blueGrey[800],
        },
        text: {
            primary: grey[100],
            secondary: grey[300],
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: blueGrey[800],
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: blueGrey[700],
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: blueGrey[600],
                },
            },
        },
    },
});

export default theme; 