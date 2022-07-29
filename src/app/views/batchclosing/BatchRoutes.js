import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const BatchClosing = Loadable(lazy(() => import("./BatchClosing")));
const CreateEdit = Loadable(lazy(() => import("./CreateEdit")));
const BatchRoutes = [
    {
        path: '/batch-closing',
        element: <BatchClosing />,
    },
    {
        path: '/batch-closing/add',
        element: <CreateEdit />,
    },
    {
        path: '/batch-closing/:id',
        element: <CreateEdit />,
    },
    {
        path: '/batch-closing/:status/:id',
        element: <CreateEdit />,
    }
]

export default BatchRoutes
