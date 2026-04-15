import ReCharts from "./ReCharts.tsx";
import {TrainingsContext, LoadingContext} from "@/context.ts";
import {useState} from "react";

export const ML = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState({
        status: false, text: ''
    });

    {/*<div className="flex flex-1 flex-col gap-4 p-4">*/}
    {/*    <div className="grid auto-rows-min gap-4 md:grid-cols-3">*/}
    {/*        <div className="bg-muted/50 aspect-video rounded-xl" />*/}
    {/*        <div className="bg-muted/50 aspect-video rounded-xl" />*/}
    {/*        <div className="bg-muted/50 aspect-video rounded-xl" />*/}
    {/*    </div>*/}
    {/*    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />*/}
    {/*</div>*/}


    return (
        <TrainingsContext.Provider value={{trainings, setTrainings}}>
            <LoadingContext.Provider value={{loading, setLoading}}>
                <ReCharts/>
            </LoadingContext.Provider>
        </TrainingsContext.Provider>
    )
}