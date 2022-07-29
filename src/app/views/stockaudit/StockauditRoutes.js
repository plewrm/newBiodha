import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Stockaudit = Loadable(lazy(() => import("./Stockaudit")));


const StockauditRoutes = [
    {
        path: '/stockaudit',
        element: <Stockaudit />,
    },
]

export default StockauditRoutes
