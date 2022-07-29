import React, { lazy } from 'react'
import style from 'Assets/css/style.css'
import Loadable from 'app/components/Loadable/Loadable';
const DashboardCredit = Loadable(lazy(() => import("./DashboardCredit")));
const DashboardCreditstatus = Loadable(lazy(() => import("./DashboardCreditstatus")));

const dashboardcreditRoutes = [
    {
        path: '/dashboard/credit',
        element: <DashboardCredit />,
    },
    {
        path: '/order/creditApproval/:orderid',
        element: <DashboardCreditstatus />,
    },
]

export default dashboardcreditRoutes
