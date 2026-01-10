import { createContext } from 'react';
export const TrainingsContext = createContext({trainings:null, setTrainings: null});
export const DataContext = createContext(null);
export const LoadingContext = createContext({loading: {status: false, text: ''}, setLoading: null});