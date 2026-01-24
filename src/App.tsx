import ReCharts from "./ReCharts.tsx";
import {useState} from "react";
import {TrainingsContext} from "./context.ts";
import {LoadingContext} from "./context.ts";
import {ThemeProvider} from "@/components/theme-provider"
import {Button} from "@/components/ui/button"
import './App.css'
import {ModeToggle} from "@/components/mode-toggle.tsx";

function App() {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState({
        status: false, text: ''
    });

    return (
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <ModeToggle />
                <div className="flex flex-wrap items-center gap-2 md:flex-row">
                    <Button variant='outline'>Button</Button>
                    {/*<Button variant="outline" size="icon" aria-label="Submit">*/}
                    {/*    <ArrowUpIcon />*/}
                    {/*</Button>*/}
                    <TrainingsContext.Provider value={{trainings, setTrainings}}>
                        <LoadingContext.Provider value={{loading, setLoading}}>
                            <ReCharts/>
                        </LoadingContext.Provider>
                    </TrainingsContext.Provider>
                </div>
            </ThemeProvider>
    )
}

export default App
