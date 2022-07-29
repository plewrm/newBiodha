import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Formulamaster = Loadable(lazy(() => import("./Formulamaster")));


const FormulamasterRoutes = [
    {
        path: '/formulamaster',
        element: <Formulamaster />,
    },
]

export default FormulamasterRoutes
