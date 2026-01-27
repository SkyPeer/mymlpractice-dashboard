import {ChangeEvent, useEffect, useState, memo, useContext} from "react";
import InputLabel from '@mui/material/InputLabel';

import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {LoadingContext, TrainingsContext} from "@/context.ts";

const Models = (props) => {
    const {onTrainingDone, trainingPeriod, onReset} = props;
    const {setTrainings} = useContext(TrainingsContext);
    const {setLoading} = useContext(LoadingContext);

    const initModel = {
        id: '',
        model_name: '',
        description: '',
        epochs: '',
        batchSize: '',
    }

    const [models, setModels] = useState(new Map())
    const [selectedModel, setSelectedModel] = useState(initModel)

    const getModels = async () => {
        const res = await fetch('http://localhost:3000/forecast/models')
        const models = await res.json()
        console.log('data', models)
        const modelsMap = new Map()
        models.forEach((model: any) => {
            modelsMap.set(model.id, model)
        })
        setModels(modelsMap)
    }

    useEffect(() => {
        getModels()
    }, [])

    const getTrainings = async (modelId: number) => {
        const res = await fetch('http://localhost:3000/forecast/trainings?modelId=' + modelId)
        const data = await res.json()
        // console.log('trainings', trainings)
        setTrainings(data)
    }

    const onSelectModelHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        const modelId = event.target.value;
        console.log('onChangeModel: ', event.target);
        setSelectedModel({...models.get(modelId)});
        // onChangeModel(modelId)
        // console.log('ttt', onChangeModel)
        await getTrainings(Number(modelId));
    }

    const trainModel = async () => {
        setLoading({status: true, text: 'Model training in progress...'})
        const res = await fetch('http://localhost:3000/forecast/model', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({modelParams: {...selectedModel, trainingPeriod}}),
        });
        const response = await res.json();
        const {model, trainingLog} = response;
        await getModels()
        setSelectedModel(model)
        setTrainings(trainingLog)
        onTrainingDone()
        setLoading({status: false, case: ''})

    }

    const reTrainModel = async () => {
        setLoading({status: true, text: 'Model retraining in progress...'})
        const res = await fetch('http://localhost:3000/forecast/model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: selectedModel.id,
                modelParams: {...selectedModel, trainingPeriod}
            }),
        });
        const data = await res.json();
        const {model, trainingLog} = data;
        await getModels();
        setSelectedModel(model)
        setTrainings(trainingLog)
        onTrainingDone()
        setLoading({status: false, text: ''})

    }


    const getModelsList = () => {
        return [...models.keys()].map((key: number) => ({...models.get(key)}))
    }

    const onChangeValue = (value, key) => {
        const model = selectedModel
        setSelectedModel({...model, [key]: value})
    }

    const resetModel = () => {
        setSelectedModel(initModel)
        onReset()
        setTrainings([])
    }

    const predictHanlder = async () => {
        const data = {
            // TODO Need flow to select city and period
            cityId: 1,
            nextYearMonths: [
                37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56
            ],
            // -------------------------------
            modelId: selectedModel.id,
        }
        await fetch('http://localhost:3000/forecast/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        onTrainingDone()
    }

    return (
        <Box sx={{display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)'}} style={{marginTop: 25}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Model</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    value={selectedModel.id || ''}
                    name={selectedModel.model_name || ''}
                    label="Select Model"
                    onChange={(event) => onSelectModelHandler(event)}
                    // onChange={handleChange}
                >
                    {getModelsList().map(model => (
                        <MenuItem value={model.id} key={model.id} name={model.model_name}>{model.model_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                required
                type={'number'}
                value={selectedModel.epochs || ''}
                onChange={(event) =>
                    onChangeValue(Number(event.target.value), 'epochs')}
                id="outlined-required"
                label="Epochs"
                defaultValue="200"
                size="small"
            />
            <TextField
                required
                value={selectedModel.batchSize || ''}
                type={'number'}
                onChange={(event) =>
                    onChangeValue(Number(event.target.value), 'batchSize')}
                id="outlined-required"
                label="BatchSize"
                defaultValue="12"
                size="small"
            />
            <TextField
                required
                value={selectedModel.model_name || ''}
                onChange={(event) =>
                    onChangeValue(event.target.value, 'model_name')}
                id="outlined-required"
                label="Model Name"
                defaultValue="Hello World"
                size="small"
            />
            <TextField
                required
                value={selectedModel.description || ''}
                onChange={(event) =>
                    onChangeValue(event.target.value, 'description')}
                id="outlined-required"
                label="Description"
                defaultValue="Hello World"
                size="small"
            />

            {/*<button onClick={()=>console.log(getModelslist())}>12312</button>*/}


            <Stack spacing={1} direction="row">
                {
                    !selectedModel.id && <Button size={'small'} fullWidth variant="contained" color="success"
                                                 onClick={() => trainModel()}>{'Train'}</Button>
                }
                {
                    selectedModel.id && <Button size={'small'} fullWidth variant="contained" color="success"
                                                onClick={() => reTrainModel()}>{'Retrain'}</Button>
                }
                <Button size={'small'} fullWidth variant="contained" onClick={() => predictHanlder()}>Predict</Button>
                <Button size={'small'} fullWidth variant="outlined" onClick={() => resetModel()}>Reset</Button>
            </Stack>
            {/*<Button variant="contained" color="success" onClick={() => {*/}
            {/*    // console.log('selectedModel: ', selectedModel)*/}
            {/*    // console.log('models:', models)*/}
            {/*    console.log('trainingPeriod:', trainingPeriod)*/}
            {/*}}>Test</Button>*/}

        </Box>
    );
}

const MemoizedModels = memo(Models);
export {MemoizedModels}