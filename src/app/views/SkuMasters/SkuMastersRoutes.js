import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const SkuMasters= Loadable(lazy(() => import("./SkuMasters")));
const SkuAdd = Loadable(lazy(() => import("./SkuAdd")));
const SkuView = Loadable(lazy(() => import("./SkuView")));

const SkuMastersRoutes = [
    {
        path: '/SkuMasters',
        element: <SkuMasters/>,
    },
    {
        path: '/Sku/add',
        element: <SkuAdd />,
    },
    {
        path: '/Sku/view/:skuid',
        element: <SkuView />,
    },
]


export default SkuMastersRoutes
