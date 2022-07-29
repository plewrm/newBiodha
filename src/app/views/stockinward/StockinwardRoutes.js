import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Stockinward = Loadable(lazy(() => import("./Stockinward")));
const Stockinwardadd = Loadable(lazy(() => import("./Stockinwardadd")));
const StockinwardView= Loadable(lazy(() => import("./StockinwardView")));
const StockinwardRoutes = [
    {
        path: '/stockinward',
        element: <Stockinward />,
    },
    {
        path: '/stockinward/add',
        element: <Stockinwardadd />,
    },
    {
        path: '/stockinward/view/:id',
        element: <StockinwardView />,
    },
    
]

export default StockinwardRoutes
