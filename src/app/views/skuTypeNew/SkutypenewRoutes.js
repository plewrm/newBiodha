import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Skutypenew = Loadable(lazy(() => import("./Skutypenew")));


const SkutypenewRoutes = [
    {
        path: '/skutypenew',
        element: <Skutypenew />,
    },
]

export default SkutypenewRoutes
