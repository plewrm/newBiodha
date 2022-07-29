import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Employee = Loadable(lazy(() => import("./Employee")));
const Employeeadd = Loadable(lazy(() => import("./Employeeadd")));
const EmployeeView = Loadable(lazy(() => import("./EmployeeView")));

const employeeRoutes = [
    {
        path: '/employee',
        element: <Employee />,
    },
    {
        path: '/employee/add',
        element: <Employeeadd />,
    },
    {
        path: '/employee/edit/:empid',
        element: <Employeeadd />,
    },
    {
        path: '/employee/view/:empid',
        element: <EmployeeView />,
    },
]

export default employeeRoutes
