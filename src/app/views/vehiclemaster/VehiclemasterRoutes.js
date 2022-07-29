import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Vehiclemaster = Loadable(lazy(() => import("./Vehiclemaster")));


const VehiclemasterRoutes = [
    {
        path: '/vehiclemaster',
        element: <Vehiclemaster />,
    },
]

export default VehiclemasterRoutes
