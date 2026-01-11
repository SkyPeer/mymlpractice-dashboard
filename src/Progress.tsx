import {useContext} from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import {Typography} from '@mui/material';
import {LoadingContext} from "./context.ts";
import Stack from '@mui/material/Stack';


export default function Progress() {
    const {loading} = useContext(LoadingContext);
    const {status, text} = loading;

    return (<Box sx={{width: '100%', height: 15, marginTop: 2, marginBottom: 5}}>
        {status && <>
            <Stack direction="row" spacing={0.5}>
                <ModelTrainingIcon fontSize="large" color="primary"/>
                <Typography variant="h6" component="h6" color="primary">
                    {text}
                </Typography>
            </Stack>
            <LinearProgress/>
        </>}
    </Box>);
}
