import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const DumpStock = Loadable(lazy(() => import("./DumpStock")));
const CreateEdit = Loadable(lazy(() => import("./CreateEdit")));
const DumpStockRoutes = [
    {
        path: '/dump-stock',
        element: <DumpStock />,
    },
    {
        path: '/dump-stock/add',
        element: <CreateEdit />,
    },
    {
        path: '/dump-stock/:id',
        element: <CreateEdit />,
    },
    {
        path: '/dump-stock/:status/:id',
        element: <CreateEdit />,
    }
]

export default DumpStockRoutes
