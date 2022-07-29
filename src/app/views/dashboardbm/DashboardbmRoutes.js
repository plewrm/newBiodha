import React, { lazy } from 'react'
import style from 'Assets/css/style.css'
import Loadable from 'app/components/Loadable/Loadable';
const DashboardBM = Loadable(lazy(() => import("./DashboardBM")));


const dashboardbmRoutes = [
    {
        // path: '/dashboard/BM',
        path: '/dashboard/default',
        element: <DashboardBM />,
    },
]

export default dashboardbmRoutes
