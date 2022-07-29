import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const CreateEdit = Loadable(lazy(() => import("./CreateEdit")));
const CreateInvoice = Loadable(lazy(() => import("./CreateInvoice")));
const InvoiceRoutes = [
    {
        path: '/invoice/add',
        element: <CreateEdit />,
       },
    {
        path: '/invoice/add/:orderid',
        element: <CreateEdit />,
    },
   {
       path: 'CreateInvoice',
       element: <CreateInvoice/>,
   },
   {
    path: 'CreateEdit',
    element: <CreateEdit/>,
},
   

]

export default InvoiceRoutes
