import React, { useEffect, useState } from 'react'
import style from 'Assets/css/style.css'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import SimpleTable from '../material-kit/tables/SimpleTable'
import PaginationTable from '../material-kit/tables/PaginationTable'
import {
    Button,
    Grid,
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
} from '@mui/material'
import {
    postDataFromApi,
    getDataFromApi,
    putDataFromApi,
    orderStatuses,
} from '../../services/CommonService'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip'
import useAuth from 'app/hooks/useAuth'

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const AppTable = () => {
    const userdetails = useAuth()
    console.log('userdetails', userdetails)
    const navigate = useNavigate()
    const [orderListing, setorderListing] = useState([])
    const [pendingorder, setpendingorder] = useState([])

    const LoginId = userdetails.user.id
    const [orderCreaditTeamApprovalList, setorderCreaditTeamApprovalList] =
        useState([])
    const [orderReadyForLoadingForYard, setorderReadyForLoadingForYard] =
        useState([])
    const [orderForLogistic, setorderForLogistic] = useState([])
    const [batchcloseList, setbatchcloseList] = useState([])
    const [dumStockList, setdumStockList] = useState([])
    const [pendingcustomer, setpendingcustomer] = useState([]) //new
    const [readyForBillingData, setReadyForBillingData] = useState([]) //new
    const [raiseDiscrepancyList, setRaiseDiscrepancyList] = useState([]) //new
    const [pendingIntergodownTransferList, setpendingIntergodownTransferList] =
        useState([]) //new
    // const [pendingCustList, setpendingCustList] = useState([])//new

    const getorderListing = async () => {
        var query = ''
        const response = await postDataFromApi('order/orderListing', query)
        if (response && response.data.code && response.data.data != null) {
            setorderListing(response.data.data)
            console.log('orderListing', response)
        }
    }

    const getpendingorder = async () => {
        var query = ''
        const response = await getDataFromApi(
            'dashboard/allDashboard/pendingOrderFromBM/' + LoginId,
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setpendingorder(response.data.data)
            console.log('pendingorder', response)
        }
    }
    const getorderCreaditTeamApprovalList = async () => {
        var query = ''
        const response = await getDataFromApi(
            'dashboard/allDashboard/orderCreaditTeamApprovalList/' + LoginId,
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setorderCreaditTeamApprovalList(response.data.data)
            console.log('CreaditTeamApprovalList', response)
        }
    }
    const getorderReadyForLoadingForYard = async () => {
        var query = ''
        const response = await getDataFromApi(
            'dashboard/allDashboard/orderReadyForLoadingForYard/' + LoginId,
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setorderReadyForLoadingForYard(response.data.data)
            console.log('orderReadyForLoadingForYard', response)
        }
    }

    const getdatatable = async () => {
        $(document).ready(function () {
            setTimeout(function () {
                $('#customdatatable').DataTable()
            }, 1000)
        })
    }
    const getLogisticOrders = async () => {
        var query = ''
        const response = await getDataFromApi(
            'dashboard/allDashboard/getPendingDispatchOrderList/' + LoginId,
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setorderForLogistic(response.data.data)
            console.log('getPendingDispatchOrderList', response)
        }
    }

    const getPendingCustomerOrders = async () => {
        var query = ''
        const response = await getDataFromApi(
            'dashboard/allDashboard/getPendingCustomerList/',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setpendingcustomer(response.data.data)
            console.log('getPendingCustomerList', response)
        }
    } //new

    const getBatchCloseList = async () => {
        var query = ''
        const response = await getDataFromApi(
            '/dashboard/batchClosing/getBatchClosingApprovalList/' + LoginId,
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setbatchcloseList(response.data.data)
            console.log('getBatchClosingApprovalList', response)
        }
    }
    const getDumpStockList = async () => {
        var query = ''
        const response = await getDataFromApi(
            '/dashboard/dumpStock/dumpStockApprovalList/' + LoginId,
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setdumStockList(response.data.data)
            console.log('dumpStockApprovalList', response)
        }
    }

    const getReadyForBillingData = async () => {
        const response = await postDataFromApi(
            '/dashboard/allDashboard/OrderLoadedForBilling/' + LoginId
        )
        if (response && response.data.code && response.data.data != null) {
            setReadyForBillingData(response.data.data)
            console.log('dumpStockApprovalList', response)
        }
    }
    const getraiseDiscrepancyList = async () => {
        const response = await postDataFromApi(
            '/dashboard/allDashboard/getRaiseConcernForYard/' + LoginId
        )
        if (response && response.data.code && response.data.data != null) {
            setRaiseDiscrepancyList(response.data.data)
        }
    }
    const getpendingIntergodownTransferList = async () => {
        const response = await postDataFromApi(
            '/dashboard/allDashboard/getPendingIntergodownTransferList/' +
                LoginId
        )
        if (response && response.data.code && response.data.data != null) {
            setpendingIntergodownTransferList(response.data.data)
        }
    }
    useEffect(() => {
        getorderListing()
        getpendingorder()
        getorderCreaditTeamApprovalList()
        getorderReadyForLoadingForYard()
        getLogisticOrders()
        getPendingCustomerOrders() //new
        getBatchCloseList()
        getDumpStockList()
        getReadyForBillingData()
        getraiseDiscrepancyList()
        getpendingIntergodownTransferList() //new
    }, [])

    return (
        <Container className="dashboard-content">
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Dashboard' }]} />
            </div>
            <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">
                            Pending Order List
                        </div>
                        <div className="table_scroll">
                            <table className="table table-hover table-bordered nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>ASO Name</th>
                                        <th>Firm Name</th>
                                        <th>Yard</th>
                                        <th>Product Group</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingorder.map((pendingorder, index) => (
                                        <tr key={index}>
                                            <td align="left">{index + 1}</td>
                                            <td align="left">
                                                {pendingorder.fullName}
                                            </td>
                                            <td align="left">
                                                {pendingorder.firmName}
                                            </td>
                                            <td align="left">
                                                {pendingorder.nameOfYard}
                                            </td>
                                            <td align="left">
                                                {pendingorder.skuTypeName}
                                            </td>
                                            <td align="left">
                                                {moment(
                                                    pendingorder.createdAt
                                                ).format('DD-MM-Y')}
                                            </td>

                                            <td align="left">
                                                {' '}
                                                {pendingorder.statusForSystem !=
                                                ''
                                                    ? orderStatuses[
                                                          pendingorder
                                                              .statusForSystem
                                                      ]
                                                    : ''}
                                            </td>
                                            <td>
                                                <Tooltip title="Status">
                                                    <IconButton
                                                        onClick={() =>
                                                            navigate(
                                                                '/order/bmApproval/' +
                                                                    pendingorder.id
                                                            )
                                                        }
                                                    >
                                                        <Icon color="primary">
                                                            check
                                                        </Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box width="100%" overflow="auto" className="box_shadow">
                        <div className="dash_title">
                            Pending Order Credit Approval List
                        </div>
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Firm Name</th>
                                    <th>Yard</th>
                                    <th>Product Group</th>
                                    <th>Createddate</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderCreaditTeamApprovalList.map(
                                    (ApprovalList, index) => (
                                        <tr key={index}>
                                            <td align="left">{index + 1}</td>
                                            <td align="left">
                                                {ApprovalList.firmName}
                                            </td>
                                            <td align="left">
                                                {ApprovalList.nameOfYard}
                                            </td>
                                            <td align="left">
                                                {ApprovalList.skuTypeName}
                                            </td>
                                            <td align="left">
                                                {moment(
                                                    ApprovalList.createdAt
                                                ).format('DD-MM-Y')}
                                            </td>

                                            {/* <td align="left"> {ApprovalList.statusForSystem != "" ? orderStatuses[ApprovalList.statusForSystem] : ''}</td> */}
                                            <td align="left">
                                                Credit Approval Pending
                                            </td>
                                            <td>
                                                {/* <Tooltip title="Edit">
	    	                                <IconButton onClick={() => navigate('/order/edit/'+order.id)}>
	    	                                    <Icon color="primary">edit</Icon>
	    	                                </IconButton>
	                                    </Tooltip> */}

                                                <Tooltip title="Status">
                                                    <IconButton
                                                        onClick={() =>
                                                            navigate(
                                                                '/order/creditApproval/' +
                                                                    ApprovalList.id
                                                            )
                                                        }
                                                    >
                                                        <Icon color="primary">
                                                            check
                                                        </Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">Ready For Loading List</div>
                        <div className="table_scroll">
                            <table className="table table-hover table-bordered nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Firm Name</th>
                                        <th>Yard</th>
                                        <th>Product Group</th>
                                        <th>Createddate</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderReadyForLoadingForYard.map(
                                        (LoadingForYard, index) => (
                                            <tr key={index}>
                                                <td align="left">
                                                    {index + 1}
                                                </td>
                                                <td align="left">
                                                    {LoadingForYard.firmName}
                                                </td>
                                                <td align="left">
                                                    {LoadingForYard.nameOfYard}
                                                </td>
                                                <td align="left">
                                                    {LoadingForYard.skuTypeName}
                                                </td>
                                                <td align="left">
                                                    {moment(
                                                        LoadingForYard.createdAt
                                                    ).format('DD-MM-Y')}
                                                </td>
                                                <td align="left">
                                                    {' '}
                                                    {LoadingForYard.statusForSystem !=
                                                    ''
                                                        ? orderStatuses[
                                                              LoadingForYard
                                                                  .statusForSystem
                                                          ]
                                                        : ''}
                                                </td>
                                                {/* <td align="left">
                                                    Waiting for Loading
                                                </td> */}
                                                <td>
                                                    <Tooltip title="Status">
                                                        <IconButton
                                                            onClick={() =>
                                                                navigate(
                                                                    '/yard/yardview/' +
                                                                        LoadingForYard.id
                                                                )
                                                            }
                                                        >
                                                            <Icon color="primary">
                                                                check
                                                            </Icon>
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">
                            Raise Discrepancy List From Yard/Accounting
                        </div>
                        <div className="table_scroll">
                            <table className="table table-hover table-bordered nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Firm Name</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Delivery Address</th>
                                        <th>Yard</th>
                                        <th>Product Group</th>
                                        <th>Createddate</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {raiseDiscrepancyList.map(
                                        (order, index) => (
                                            <tr key={index}>
                                                <td align="left">
                                                    {index + 1}
                                                </td>
                                                <td align="left">
                                                    {order.firmName}
                                                </td>
                                                <td align="left">
                                                    {order.cityName}
                                                </td>
                                                <td align="left">
                                                    {order.stateName}
                                                </td>
                                                <td
                                                    align="left"
                                                    className="address"
                                                >
                                                    {order.address}
                                                </td>
                                                <td align="left">
                                                    {order.nameOfYard}
                                                </td>
                                                <td align="left">
                                                    {order.skuTypeName}
                                                </td>
                                                <td align="left">
                                                    {moment(
                                                        order.createdAt
                                                    ).format('DD-MM-Y')}
                                                </td>
                                                <td align="left">
                                                    {' '}
                                                    {order.statusForSystem != ''
                                                        ? orderStatuses[
                                                              order
                                                                  .statusForSystem
                                                          ]
                                                        : ''}
                                                </td>
                                                {/* <td align="left">order loaded</td> */}
                                                <td>
                                                    <Tooltip title="Status">
                                                        <IconButton
                                                            onClick={() =>
                                                                navigate(
                                                                    '/order/bmApproval/' +
                                                                        order.id
                                                                )
                                                            }
                                                        >
                                                            <Icon color="primary">
                                                                check
                                                            </Icon>
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">
                            Pending Batch closing List
                        </div>
                        <div className="table_scroll">
                            <table className="table table-hover table-bordered nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Product Group</th>
                                        <th>Created By</th>
                                        <th>Batch Name</th>
                                        <th>Zone</th>
                                        <th>Careted At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {batchcloseList.map(
                                        (pendingorder, index) => (
                                            <tr key={index}>
                                                <td align="left">
                                                    {index + 1}
                                                </td>
                                                <td align="left">
                                                    {pendingorder.SKUName}
                                                </td>
                                                <td align="left">
                                                    {pendingorder.fullName}
                                                </td>
                                                <td align="left">
                                                    {pendingorder.batchName}
                                                </td>
                                                <td align="left">
                                                    {pendingorder.nameOfZone}
                                                </td>
                                                <td align="left">
                                                    {moment(
                                                        pendingorder.createdAt
                                                    ).format('DD-MM-Y')}
                                                </td>
                                                <td>
                                                    {pendingorder.statusForSystem ==
                                                        1 ||
                                                    pendingorder.statusForSystem ==
                                                        2 ? (
                                                        ''
                                                    ) : (
                                                        <Tooltip title="Status">
                                                            <IconButton
                                                                onClick={() =>
                                                                    navigate(
                                                                        '/batch-closing/1/' +
                                                                            pendingorder.id
                                                                    )
                                                                }
                                                            >
                                                                <Icon color="primary">
                                                                    check
                                                                </Icon>
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">
                            Pending Dump Stock List
                        </div>
                        <div className="table_scroll">
                            <table className="table table-hover table-bordered nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Product Group</th>
                                        <th>Created By</th>
                                        <th>Batch Name</th>
                                        <th>Zone</th>
                                        <th>Careted At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dumStockList.map((pendingorder, index) => (
                                        <tr key={index}>
                                            <td align="left">{index + 1}</td>
                                            <td align="left">
                                                {pendingorder.SKUName}
                                            </td>
                                            <td align="left">
                                                {pendingorder.fullName}
                                            </td>
                                            <td align="left">
                                                {pendingorder.batchName}
                                            </td>
                                            <td align="left">
                                                {pendingorder.nameOfZone}
                                            </td>
                                            <td align="left">
                                                {moment(
                                                    pendingorder.createdAt
                                                ).format('DD-MM-Y')}
                                            </td>
                                            <td>
                                                {pendingorder.statusForSystem ==
                                                    1 ||
                                                pendingorder.statusForSystem ==
                                                    2 ? (
                                                    ''
                                                ) : (
                                                    <Tooltip title="Status">
                                                        <IconButton
                                                            onClick={() =>
                                                                navigate(
                                                                    '/dump-stock/1/' +
                                                                        pendingorder.id
                                                                )
                                                            }
                                                        >
                                                            <Icon color="primary">
                                                                check
                                                            </Icon>
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Grid>
                {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">
                            Pending Return Order List
                        </div>
                    </Box>
                </Grid> */}

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">
                            Yard Pending Outward List
                        </div>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">
                            Logistic Pending order List
                        </div>
                        <div className="table_scroll">
                            <table className="table table-hover table-bordered nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Firm Name</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Delivery Address</th>
                                        <th>Yard</th>
                                        <th>Product Group</th>
                                        <th>Total MT</th>
                                        <th>Createddate</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderForLogistic.map((order, index) => (
                                        <tr key={index}>
                                            <td align="left">{index + 1}</td>
                                            <td align="left">
                                                {order.firmName}
                                            </td>
                                            <td align="left">
                                                {order.cityName}
                                            </td>
                                            <td align="left">
                                                {order.stateName}
                                            </td>
                                            <td
                                                align="left"
                                                className="address"
                                            >
                                                {order.address}
                                            </td>
                                            <td align="left">
                                                {order.nameOfYard}
                                            </td>
                                            <td align="left">
                                                {order.skuTypeName}
                                            </td>
                                            <td align="left">
                                                {order.quantity_mt ? order.quantity_mt:"0.00"}
                                            </td>
                                            <td align="left">
                                                {moment(order.createdAt).format(
                                                    'DD-MM-Y'
                                                )}
                                            </td>
                                            <td align="left">
                                                {' '}
                                                {order.statusForSystem != ''
                                                    ? orderStatuses[
                                                          order.statusForSystem
                                                      ]
                                                    : ''}
                                            </td>
                                            {/* <td align="left">order loaded</td> */}
                                            <td>
                                                <Tooltip title="Status">
                                                    <IconButton
                                                        onClick={() =>
                                                            navigate(
                                                                '/logistics/add/' +
                                                                    order.id
                                                            )
                                                        }
                                                    >
                                                        <Icon color="primary">
                                                            check
                                                        </Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">
                            Pending Customer Approval List
                        </div>
                        <div className="table_scroll">
                            <table className="table table-hover table-bordered nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Customer Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingcustomer.map((customer, index) => (
                                        <tr key={index}>
                                            <td align="left">{index + 1}</td>
                                            <td align="left">
                                                {customer.ContactPersonName}
                                            </td>

                                            <td align="left">Pending</td>
                                            <td>
                                                <Tooltip title="Status">
                                                    <IconButton
                                                        onClick={() =>
                                                            navigate(
                                                                '/customer/view/1/' +
                                                                    customer.id
                                                            )
                                                        }
                                                    >
                                                        <Icon color="primary">
                                                            check
                                                        </Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">Ready for billing</div>
                        <div className="table_scroll">
                            <table className="table table-hover table-bordered nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Firm Name</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Delivery Address</th>
                                        <th>Yard</th>
                                        <th>Product Group</th>
                                        <th>Createddate</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {readyForBillingData.map((order, index) => (
                                        <tr key={index}>
                                            <td align="left">{index + 1}</td>
                                            <td align="left">
                                                {order.firmName}
                                            </td>
                                            <td align="left">
                                                {order.cityName}
                                            </td>
                                            <td align="left">
                                                {order.stateName}
                                            </td>
                                            <td
                                                align="left"
                                                className="address"
                                            >
                                                {order.address}
                                            </td>
                                            <td align="left">
                                                {order.nameOfYard}
                                            </td>
                                            <td align="left">
                                                {order.skuTypeName}
                                            </td>
                                            <td align="left">
                                                {moment(order.createdAt).format(
                                                    'DD-MM-Y'
                                                )}
                                            </td>
                                            {/* <td align="left"> {order.statusForSystem != "" ? orderStatuses[order.statusForSystem] : ''}</td> */}
                                            <td align="left">order loaded</td>
                                            <td>
                                                <Tooltip title="Status">
                                                    <IconButton
                                                        onClick={() =>
                                                            navigate(
                                                                '/invoice/add/' +
                                                                    order.id
                                                            )
                                                        }
                                                    >
                                                        <Icon color="primary">
                                                            check
                                                        </Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box className="box_shadow">
                        <div className="dash_title">
                            Pending Intergodown Transfer List
                        </div>
                        <div className="table_scroll">
                            <table className="table table-hover table-bordered nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Form Yard</th>
                                        <th>To yard</th>
                                        <th>Product Group</th>
                                        <th>Remark</th>
                                        <th>Expected Delivery Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingIntergodownTransferList.map(
                                        (intergodown, index) => (
                                            <tr key={index}>
                                                <td align="left">
                                                    {index + 1}
                                                </td>
                                                <td align="left">
                                                    {intergodown.fromYards}
                                                </td>
                                                <td align="left">
                                                    {intergodown.toYards}
                                                </td>
                                                <td align="left">
                                                    {intergodown.toYards}
                                                </td>
                                                <td align="left">
                                                    {intergodown.remark}
                                                </td>
                                                <td align="left">
                                                    {intergodown.delivaryDate}
                                                </td>
                                                <td align="left">
                                                    <Tooltip title="Status">
                                                        <IconButton
                                                            onClick={() =>
                                                                navigate(
                                                                    '/IntergodownTransferadd/bm-approve/' +
                                                                    intergodown.id
                                                                )
                                                            }
                                                        >
                                                            <Icon color="primary">
                                                                check
                                                            </Icon>
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
export default AppTable
