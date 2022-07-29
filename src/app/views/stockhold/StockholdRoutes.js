import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Stockhold = Loadable(lazy(() => import("./Stockhold")));


const StockholdRoutes = [
    {
        path: '/stockhold',
        element: <Stockhold />,
    },
]

export default StockholdRoutes
