import { createFileRoute } from '@tanstack/react-router'
import WindyGenerator from '@/features/windy/WindyGenerator'

export const Route = createFileRoute('/windy')({
    component: WindyGenerator,
})
