import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Zonemaster = Loadable(lazy(() => import("./Zonemaster")));


const ZonemasterRoutes = [
    {
        path: '/Zonemaster',
        element: <Zonemaster/>,
    },
]

export default ZonemasterRoutes
