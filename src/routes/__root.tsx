import {Fragment} from 'react'
import {createRootRoute, Link, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'

const RootLayout = () => (
    <Fragment>
        <Outlet/>
        <TanStackRouterDevtools/>
    </Fragment>
)

export const Route = createRootRoute({component: RootLayout})