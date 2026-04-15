import {ThemeProvider} from "@/components/theme-provider"
// import './App.css'
import './styles/globals.css'
import Page from "./Page";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Page/>
        </ThemeProvider>
    )
}

export default App
