import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Districtmaster= Loadable(lazy(() => import("./Districtmaster")));
;

const DistrictmasterRoutes = [
    {
        path: '/Districtmaster',
        element: <Districtmaster/>,
    }
]


export default DistrictmasterRoutes
