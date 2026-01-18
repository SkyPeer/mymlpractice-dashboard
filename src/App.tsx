import ReCharts from "./ReCharts.tsx";
import {useState} from "react";
import {TrainingsContext} from "./context.ts";
import {LoadingContext} from "./context.ts";
import {Button} from './components/ui/button.tsx'

function App() {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState({
        status: false, text: ''
    });

    return (
        <TrainingsContext.Provider value={{trainings, setTrainings}}>
            <LoadingContext.Provider value={{loading, setLoading}}>
                <Button>123</Button>
                <ReCharts/>
            </LoadingContext.Provider>
        </TrainingsContext.Provider>
    )
}

export default App
