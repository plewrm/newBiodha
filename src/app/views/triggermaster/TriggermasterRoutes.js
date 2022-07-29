import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Triggermaster = Loadable(lazy(() => import("./Triggermaster")));


const TriggermasterRoutes = [
    {
        path: '/triggermaster',
        element: <Triggermaster />,
    },
]

export default TriggermasterRoutes
