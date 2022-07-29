import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Skuproperties = Loadable(lazy(() => import("./Skuproperties")));


const SkupropertiesRoutes = [
    {
        path: '/skuproperties',
        element: <Skuproperties />,
    },
]

export default SkupropertiesRoutes
