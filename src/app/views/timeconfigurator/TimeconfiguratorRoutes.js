import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Timeconfigurator = Loadable(lazy(() => import("./Timeconfigurator")));


const TimeconfiguratorRoutes = [
    {
        path: '/timeconfigurator',
        element: <Timeconfigurator />,
    },
]

export default TimeconfiguratorRoutes
