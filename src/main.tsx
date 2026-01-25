import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import App from './App';
// Import the generated route tree
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// import {ThemeProvider} from '@mui/material';
// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';
// import theme from './theme';
// import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    // <App/>
    // <React.StrictMode>
      <App />
    // </React.StrictMode>,

    // <StrictMode>
    //     <RouterProvider router={router} />
    // </StrictMode>,
)
