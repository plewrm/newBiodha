import AuthGuard from "app/auth/AuthGuard";
import NotFound from "app/views/sessions/NotFound";
import chartsRoute from "app/views/charts/ChartsRoute";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import dashboardRoutes from "app/views/dashboard/DashboardRoutes";
import dashboardbmRoutes from "app/views/dashboardbm/DashboardbmRoutes";
import dashboardcreditRoutes from "app/views/dashboardcredit/DashboardcreditRoutes";
import sessionRoutes from "app/views/sessions/SessionRoutes";
import stateRoutes from "app/views/states/StateRoutes";
import cityRoutes from "app/views/cities/CityRoutes";
import employeeRoutes from "app/views/employee/EmployeeRoutes";
import customerRoutes from "app/views/customer/CustomerRoutes";
import yardRoutes from "app/views/yard/YardRoutes";
import rolemasterRoutes from "app/views/rolemaster/RolemasterRoutes";
import menumasterRoutes from "app/views/menumaster/MenumasterRoutes";
import menuaccessmasterRoutes from "app/views/menuaccessmaster/MenuaccessmasterRoutes";
import skutypeRoutes from "app/views/skutype/SkutypeRoutes";
import skupropertiesRoutes from "app/views/skuproperties/SkupropertiesRoutes";
import skupropertiesdropdownRoutes from "app/views/skupropertiesdropdown/SkupropertiesdropdownRoutes";
import skumappingRoutes from "app/views/skumapping/SkumappingRoutes";
import uommasterRoutes from "app/views/uommaster/UommasterRoutes";
import vehiclemasterRoutes from "app/views/vehiclemaster/VehiclemasterRoutes";
import trucktypemasterRoutes from "app/views/trucktypemaster/TrucktypemasterRoutes";
import formulamasterRoutes from "app/views/formulamaster/FormulamasterRoutes";
import triggermasterRoutes from "app/views/triggermaster/TriggermasterRoutes";
import stockauditRoutes from "app/views/stockaudit/StockauditRoutes";
import timeconfiguratorRoutes from "app/views/timeconfigurator/TimeconfiguratorRoutes";
import paymenttermsRoutes from "app/views/paymentterms/PaymenttermsRoutes";
import stockholdRoutes from "app/views/stockhold/StockholdRoutes";
import orderRoutes from "app/views/order/OrderRoutes";
import stockinwardRoutes from "app/views/stockinward/StockinwardRoutes";
import MatxLayout from '../components/MatxLayout/MatxLayout'
import skutypenewRoutes from "app/views/skuTypeNew/SkutypenewRoutes";
import SkuMastersRoutes from 'app/views/SkuMasters/SkuMastersRoutes'
import AccessManagementRoute from 'app/views/AccessManagement/AccessManagementRoute'
import ViewStockRoutes from 'app/views/ViewStock/ViewStockRoutes';
import BatchRoutes from 'app/views/batchclosing/BatchRoutes';
import DumpStockRoutes from 'app/views/dumpstock/DumpStockRoutes';
import LogisticRoutes from 'app/views/logisticOrder/LogisticRoutes';
import DistrictmasterRoutes from 'app/views/Districtmaster/DistrictmasterRoutes';
import ZonemasterRoutes from 'app/views/Zonemaster/ZonemasterRoutes';
import InvoiceRoutes from 'app/views/InvoiceOrder/InvoiceRoutes';
import CountrymasterRoutes from 'app/views/Countrymaster/CountrymasterRoutes';
import IntergodownTransferRoutes from 'app/views/IntergodownTransfer/IntergodownTransferRoutes';
export const AllPages = () => {
  const all_routes = [
    {
      path: "/",
      element: (
        <AuthGuard>
          <MatxLayout />
        </AuthGuard>
      ),
      children: [
        ...dashboardRoutes,
        ...dashboardbmRoutes,
        ...dashboardcreditRoutes,
        ...chartsRoute,
        ...materialRoutes,
        ...stateRoutes,
        ...cityRoutes,
        ...employeeRoutes,
        ...customerRoutes,
        ...yardRoutes,
        ...rolemasterRoutes,
        ...menumasterRoutes,
        ...menuaccessmasterRoutes,
        ...skutypeRoutes,
        ...skupropertiesRoutes,
        ...skupropertiesdropdownRoutes,
        ...skumappingRoutes,
        ...uommasterRoutes,
        ...vehiclemasterRoutes,
        ...trucktypemasterRoutes,
        ...formulamasterRoutes,
        ...triggermasterRoutes,
        ...stockauditRoutes,
        ...timeconfiguratorRoutes,
        ...paymenttermsRoutes,
        ...stockholdRoutes,
        ...orderRoutes,
        ...stockinwardRoutes,
        ...skutypenewRoutes,
        ...SkuMastersRoutes,
        ...AccessManagementRoute,
        ...ViewStockRoutes,
        ...BatchRoutes,
        ...DumpStockRoutes,
        ...LogisticRoutes,
        ...DistrictmasterRoutes,
        ...ZonemasterRoutes,
        ...InvoiceRoutes,
        ...CountrymasterRoutes,
        ...IntergodownTransferRoutes,
        ...InvoiceRoutes,
      ],
    },
    ...sessionRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
    
    
  ];

  return all_routes;
}