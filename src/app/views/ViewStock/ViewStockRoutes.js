import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const ViewStock = Loadable(lazy(() => import("./ViewStock")));


const ViewStockRoutes = [
    {
        path: '/ViewStock',
        element: <ViewStock />,
    },
]

export default ViewStockRoutes
