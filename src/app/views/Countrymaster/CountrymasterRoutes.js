import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Countrymaster = Loadable(lazy(() => import("./Countrymaster")));


const CountrymasterRoutes = [
    {
        path: '/Countrymaster',
        element: <Countrymaster/>,
    },
]

export default CountrymasterRoutes

