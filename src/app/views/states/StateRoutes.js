import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const State = Loadable(lazy(() => import("./State")));


const stateRoutes = [
    {
        path: '/states',
        element: <State />,
    },
]

export default stateRoutes
