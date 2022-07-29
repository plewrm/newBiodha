import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Yard = Loadable(lazy(() => import("./Yard")));
const DumpStock = Loadable(lazy(() => import("./DumpStock")));
const Batchclosing = Loadable(lazy(() => import("./Batchclosing")));

const yardRoutes = [
    {
        path: '/yard',
        element: <Yard />,
    },
    {
        path: '/dumpstock',
        element: <DumpStock />,
    },
    {
        path: '/batchclosing',
        element: <Batchclosing />,
    },
]

export default yardRoutes
