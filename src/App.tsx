import {createContext, useContext} from 'react';

export const TrainingsContext = createContext([]);
export const DataContext = createContext([]);

import ReCharts from "./ReCharts.tsx";

function App() {
    return (
        <ReCharts/>
    )
}

export default App
