import {ChangeEvent, useEffect, useState, memo, useContext} from "react";
import InputLabel from '@mui/material/InputLabel';
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import FormControl from "@mui/material/FormControl";
import {Button} from '@/components/ui/button'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"
// import Select, {SelectChangeEvent} from '@mui/material/Select';
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

    const onSelectModelHandler = async (modelId: string) => {
        setSelectedModel({...models.get(modelId)});
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

    type TOnChangeValue = 'epochs' | 'batchSize' | 'description' | 'model_name'
    const onChangeValue = (value: number | string, key: TOnChangeValue) => {
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
        <Box sx={{display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)'}}>

            <Select onValueChange={(value) => onSelectModelHandler(value)}>
                <SelectTrigger value={selectedModel.id || ''} className="w-full">
                    <SelectValue placeholder="Model"/>
                </SelectTrigger>
                <SelectContent>
                    {getModelsList().map(model => (
                        <SelectItem value={model.id} key={model.id}>{model.model_name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input placeholder="Epochs"
                   value={selectedModel.epochs || ''}
                   onChange={(event) =>
                       onChangeValue(Number(event.target.value), 'epochs')}
            />
            <Input placeholder="Batch Size"
                   value={selectedModel.batchSize || ''}
                   onChange={(event) =>
                       onChangeValue(Number(event.target.value), 'batchSize')}
            />
            <Input placeholder="Model Name"
                   value={selectedModel.model_name || ''}
                   onChange={(event) =>
                       onChangeValue(Number(event.target.value), 'model_name')}
            />
            <Input placeholder="Description"
                   value={selectedModel.description || ''}
                   onChange={(event) =>
                       onChangeValue(Number(event.target.value), 'description')}
            />
            <div className="flex flex-row justify-between gap-2">


                {
                    !selectedModel.id && <Button className="w-1/3" variant="default" onClick={trainModel}>Train</Button>
                }
                {
                    selectedModel.id && <Button className="w-1/3" variant="default" onClick={reTrainModel}>Re Train</Button>
                }
                <Button variant="outline" className="w-1/3" onClick={predictHanlder}>Predict</Button>
                <Button variant="outline" className="w-1/3" onClick={resetModel}>Reset</Button>

            </div>


        </Box>
    );
}

const MemoizedModels = memo(Models);
export {MemoizedModels}