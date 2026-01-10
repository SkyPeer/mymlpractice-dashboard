import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import theme from './theme';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline/> {/* Optional: adds global CSS baseline styles */}
        <Container maxWidth={'lg'}>
            <App/>
        </Container>
    </ThemeProvider>


    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
)
