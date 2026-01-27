import ReCharts from "./ReCharts.tsx";
import {TrainingsContext, LoadingContext} from "../../context.ts";
import {useState} from "react";

export const ML = () => {
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