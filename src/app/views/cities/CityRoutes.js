import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const City = Loadable(lazy(() => import("./City")));


const cityRoutes = [
    {
        path: '/cities',
        element: <City />,
    },
]

export default cityRoutes
