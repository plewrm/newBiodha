import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Skutype = Loadable(lazy(() => import("./Skutype")));


const SkutypeRoutes = [
    {
        path: '/skutype',
        element: <Skutype />,
    },
]

export default SkutypeRoutes
