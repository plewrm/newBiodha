import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const AccessManagement = Loadable(lazy(() => import("./AccessManagement")));


const AccessManagementRoute = [
    {
        path: '/AccessManagement',
        element: <AccessManagement />,
    },
]

export default AccessManagementRoute;