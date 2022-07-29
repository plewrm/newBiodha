import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Rolemaster = Loadable(lazy(() => import("./Rolemaster")));


const RolemasterRoutes = [
    {
        path: '/rolemaster',
        element: <Rolemaster />,
    },
]

export default RolemasterRoutes
