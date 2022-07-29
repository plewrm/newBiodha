import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Uommaster = Loadable(lazy(() => import("./Uommaster")));


const UommasterRoutes = [
    {
        path: '/uommaster',
        element: <Uommaster />,
    },
]

export default UommasterRoutes
