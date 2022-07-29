import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const List = Loadable(lazy(() => import("./List")));
const CreateEdit = Loadable(lazy(() => import("./CreateEdit")));
const ViewLogistics = Loadable(lazy(() => import("./ViewLogistics")));
const OrderRoutes = [
    {
        path: '/logistics',
        element: <List />,
    },
    {
        path: '/logistics/add/:orderid',
        element: <CreateEdit />,
    },
    {
        path: '/logistics/view/:orderid',
        element: <ViewLogistics />,
    }
]

export default OrderRoutes
