import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
const IntergodownTransferadd = Loadable(
    lazy(() => import('./IntergodownTransferadd'))
)
const IntergodownTransfer = Loadable(
    lazy(() => import('./IntergodownTransfer'))
)

const Intergodownview = Loadable(lazy(() => import('./Intergodownview')))
// const Orderadd = Loadable(lazy(() => import("./Orderadd")));
// const Orderview = Loadable(lazy(() => import("./Orderview")));
// const Orderstatus = Loadable(lazy(() => import("./Orderstatus")));
// const Orderdelivery = Loadable(lazy(() => import("./Orderdelivery")));
// const Yardview = Loadable(lazy(() => import("./Yardview")));
// const LogisticTeamOrder = Loadable(lazy(() => import("./LogisticTeamOrder")));
const IntergodownTransferRoutes = [
    {
        path: '/IntergodownTransfer',
        element: <IntergodownTransfer />,
    },
    {
        path: '/IntergodownTransferadd',
        element: <IntergodownTransferadd />,
    },
    {
        path: '/IntergodownTransferadd/edit/:orderid',
        element: <IntergodownTransferadd />,
    },
    {
        path: '/Intergodownview/view/:orderid',
        element: <Intergodownview />,
    },
    {
        path: '/IntergodownTransferadd/bm-approve/:orderid',
        element: <IntergodownTransferadd />,
    },
    // {
    //     path: '/CreateIntergodownTransfer',
    //     element: <CreateIntergodownTransfer/>,
    // },
    // {
    //     path: '/order/add',
    //     element: <Orderadd />,
    // },
    // {
    //     path: '/order/edit/:orderid',
    //     element: <Orderadd />,
    // },
    // {
    //     path: '/order/view/:orderid',
    //     element: <Orderview />,
    // },
    // {
    //     path: '/order/changestatus/:orderid',
    //     element: <Orderstatus />,
    // },
    // {
    //     path: '/order/bmApproval/:orderid',
    //     element: <Orderstatus />,
    // },
    // {
    //     path: '/yard/yardview/:orderid',
    //     element: <Yardview />,
    // },
    // {
    //     path: '/order/delivery/:orderid',
    //     element: <Orderdelivery />,
    // },
    // {
    //     path: '/order/logistic-delivery/:orderid',
    //     element: <LogisticTeamOrder />,
    // }
]

export default IntergodownTransferRoutes
