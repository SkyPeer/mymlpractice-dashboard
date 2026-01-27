import {createFileRoute} from '@tanstack/react-router';
import {ML} from '@/features/ml';

export const Route = createFileRoute('/ml')({
    component: ML,
})

