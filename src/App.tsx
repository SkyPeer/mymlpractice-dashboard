import ReCharts from "./ReCharts.tsx";
import {useState} from "react";
import {TrainingsContext} from "./context.ts";
import {LoadingContext} from "./context.ts";

function App() {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState({
        status: false, text: ''
    });

    return (
        <TrainingsContext.Provider value={{trainings, setTrainings}}>
            <LoadingContext.Provider value={{loading, setLoading}}>
                <ReCharts/>
            </LoadingContext.Provider>
        </TrainingsContext.Provider>
    )
}

export default App
