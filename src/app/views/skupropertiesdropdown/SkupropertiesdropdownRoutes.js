import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Skupropertiesdropdown = Loadable(lazy(() => import("./Skupropertiesdropdown")));


const SkupropertiesdropdownRoutes = [
    {
        path: '/skupropertiesdropdown',
        element: <Skupropertiesdropdown />,
    },
]

export default SkupropertiesdropdownRoutes
