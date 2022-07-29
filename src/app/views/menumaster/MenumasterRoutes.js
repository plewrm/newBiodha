import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Menumaster = Loadable(lazy(() => import("./Menumaster")));


const MenumasterRoutes = [
    {
        path: '/menumaster',
        element: <Menumaster />,
    },
]

export default MenumasterRoutes
