import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Menuaccessmaster = Loadable(lazy(() => import("./Menuaccessmaster")));


const MenuaccessmasterRoutes = [
    {
        path: '/menuaccessmaster',
        element: <Menuaccessmaster />,
    },
]

export default MenuaccessmasterRoutes
