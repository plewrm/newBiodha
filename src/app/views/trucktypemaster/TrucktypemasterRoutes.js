import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Trucktypemaster = Loadable(lazy(() => import("./Trucktypemaster")));


const TrucktypemasterRoutes = [
    {
        path: '/trucktypemaster',
        element: <Trucktypemaster />,
    },
]

export default TrucktypemasterRoutes
