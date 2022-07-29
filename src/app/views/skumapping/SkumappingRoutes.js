import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Skumapping = Loadable(lazy(() => import("./Skumapping")));


const SkumappingRoutes = [
    {
        path: '/skumapping',
        element: <Skumapping />,
    },
]

export default SkumappingRoutes
