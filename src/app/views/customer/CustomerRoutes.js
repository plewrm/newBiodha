import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Customer = Loadable(lazy(() => import("./Customer")));
const Customeradd = Loadable(lazy(() => import("./Customeradd")));
const CustomerView = Loadable(lazy(() => import("./CustomerView")));

const CustomerRoutes = [
    {
        path: '/customer',
        element: <Customer />,
    },
    {
        path: '/customer/add',
        element: <Customeradd />,
    },
    {
        path: '/customer/edit/:customerid',
        element: <Customeradd />,
    },
    {
        path: '/customer/view/:customerid',
        element: <CustomerView />,
    },
    {
        path: '/customer/view/:status/:customerid',
        element: <CustomerView />,
    },
]

export default CustomerRoutes
