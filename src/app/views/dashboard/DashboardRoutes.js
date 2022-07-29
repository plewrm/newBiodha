import React, { lazy } from 'react'
import style from 'Assets/css/style.css'
import Loadable from 'app/components/Loadable/Loadable';

const Analytics = Loadable(lazy(() => import("./Analytics")));

const dashboardRoutes = [
    {
       path: '/dashboard/BM',
        element: <Analytics />,
    },
]

export default dashboardRoutes
