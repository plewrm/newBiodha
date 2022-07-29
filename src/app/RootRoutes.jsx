import React from 'react'
import { Redirect } from 'react-router-dom'
import chartsRoute from './views/charts/ChartsRoute'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import dashboardbmRoutes from './views/dashboardbm/DashboardbmRoutes'
import dashboardcreditRoutes from './views/dashboardcredit/DashboardcreditRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import StateRoutes from './views/states/StateRoutes'
import CityRoutes from './views/cities/CityRoutes'
import EmployeeRoutes from './views/employee/EmployeeRoutes'
import CustomerRoutes from "app/views/customer/CustomerRoutes";
import YardRoutes from './views/yard/YardRoutes'
import rolemasterRoutes from './views/rolemaster/RolemasterRoutes'
import menumasterRoutes from './views/menumaster/MenumasterRoutes'
import menuaccessmasterRoutes from './views/menuaccessmaster/MenuaccessmasterRoutes'
import skutypeRoutes from './views/skutype/SkutypeRoutes'
import skupropertiesRoutes from './views/skuproperties/SkupropertiesRoutes'
import skupropertiesdropdownRoutes from './views/skupropertiesdropdown/SkupropertiesdropdownRoutes'
import skumappingRoutes from './views/skumapping/SkumappingRoutes'
import vehiclemasterRoutes from './views/vehiclemaster/VehiclemasterRoutes'
import uommasterRoutes from './views/uommaster/UommasterRoutes'
import trucktypemasterRoutes from './views/trucktypemaster/TrucktypemasterRoutes'
import formulamasterRoutes from './views/formulamaster/FormulamasterRoutes'
import triggermasterRoutes from './views/triggermaster/TriggermasterRoutes'
import stockauditRoutes from './views/stockaudit/StockauditRoutes'
import timeconfiguratorRoutes from './views/timeconfigurator/TimeconfiguratorRoutes'
import paymenttermsRoutes from './views/paymentterms/PaymenttermsRoutes'
import stockholdRoutes from "app/views/stockhold/StockholdRoutes";
import orderRoutes from "app/views/order/OrderRoutes";
import stockinwardRoutes from "app/views/stockinward/StockinwardRoutes";
import SkutypenewRoutes from 'app/views/skuTypeNew/SkutypenewRoutes';
import SkuMastersRoutes from 'app/views/SkuMasters/SkuMastersRoutes';
import AccessManagementRoute from 'app/views/AccessManagement/AccessManagementRoute';
import ViewStockRoutes from 'app/views/ViewStock/ViewStockRoutes';
import BatchRoutes from 'app/views/batchclosing/BatchRoutes';
import DumpStockRoutes from 'app/views/dumpstock/DumpStockRoutes';
import LogisticRoutes from 'app/views/logisticOrder/LogisticRoutes';
import IntergodownTransferRoutes from 'app/views/IntergodownTransfer/IntergodownTransferRoutes';
import InvoiceRoutes from 'app/views/InvoiceOrder/InvoiceRoutes'
const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...dashboardbmRoutes,
    ...dashboardcreditRoutes,
    ...materialRoutes,
    ...chartsRoute,
    ...redirectRoute,
    ...errorRoute,
    ...StateRoutes,
    ...CityRoutes,
    ...EmployeeRoutes,
    ...CustomerRoutes,
    ...YardRoutes,
    ...RolemasterRoutes,
    ...MenumasterRoutes,
    ...MenuaccessmasterRoutes,
    ...SkutypeRoutes,
    ...SkupropertiesRoutes,
    ...SkupropertiesdropdownRoutes,
    ...SkumappingRoutes,
    ...UommasterRoutes,
    ...VehiclemasterRoutes,
    ...TrucktypemasterRoutes,
    ...FormulamasterRoutes,
    ...TriggermasterRoutes,
    ...StockauditRoutes,
    ...TimeconfiguratorRoutes,
    ...PaymenttermsRoutes,
    ...StockholdRoutes,
    ...OrderRoutes,
    ...StockinwardRoutes,
    ...SkutypenewRoutes,
    ...SkuMastersRoutes,
    ...AccessManagementRoute,
    ...ViewStockRoutes,
    ...BatchRoutes,
    ...DumpStockRoutes,
    ...LogisticRoutes,
    ...IntergodownTransferRoutes,
    ...InvoiceRoutes,
]

export default routes
