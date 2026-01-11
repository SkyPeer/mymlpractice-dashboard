import { createTheme } from '@mui/material/styles';
import { purple, red, yellow, deepOrange } from '@mui/material/colors';

const primary = red[500]; // #f44336
//const accent = purple['A200']; // #e040fb
const accent = purple.A200; // #e040fb (alternative method)

const theme = createTheme({
    palette: {
        // primary: '#ffb422',
        secondary: yellow,

        primary: {
            main: '#f9a825',
        },
        // secondary: {
        //     main: yellow,
        // },
        mode: 'dark',

    },
    typography: {
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
    },
});

export default theme;