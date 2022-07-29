import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Paymentterms = Loadable(lazy(() => import("./Paymentterms")));


const PaymenttermsRoutes = [
    {
        path: '/paymentterms',
        element: <Paymentterms />,
    },
]

export default PaymenttermsRoutes
