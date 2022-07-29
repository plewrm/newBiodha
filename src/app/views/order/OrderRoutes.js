import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Order = Loadable(lazy(() => import("./Order")));
const Orderadd = Loadable(lazy(() => import("./Orderadd")));
const Orderview = Loadable(lazy(() => import("./Orderview")));
const Orderstatus = Loadable(lazy(() => import("./Orderstatus")));
const Orderdelivery = Loadable(lazy(() => import("./Orderdelivery")));
const Yardview = Loadable(lazy(() => import("./Yardview")));
const LogisticTeamOrder = Loadable(lazy(() => import("./LogisticTeamOrder")));
const OrderRoutes = [
    {
        path: '/order',
        element: <Order />,
    },
    {
        path: '/order/add',
        element: <Orderadd />,
    },
    {
        path: '/order/edit/:orderid',
        element: <Orderstatus />,
    },
    {
        path: '/order/view/:orderid',
        element: <Orderview />,
    },
    {
        path: '/order/changestatus/:orderid',
        element: <Orderstatus />,
    },
    {
        path: '/order/bmApproval/:orderid',
        element: <Orderstatus />,
    },
    {
        path: '/yard/yardview/:orderid',
        element: <Yardview />,
    },
    {
        path: '/order/delivery/:orderid',
        element: <Orderdelivery />,
    },
    {
        path: '/order/logistic-delivery/:orderid',
        element: <LogisticTeamOrder />,
    }
]

export default OrderRoutes
