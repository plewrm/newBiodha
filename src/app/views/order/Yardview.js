import React, { useEffect, useState } from 'react'
import style from 'Assets/css/style.css'
import SimpleTable from '../material-kit/tables/SimpleTable'
import PaginationTable from '../material-kit/tables/PaginationTable'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
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
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import { Alert, Snackbar, SnackbarContent } from '@mui/material'
// import TextField from '@mui/material/TextField'
import TextField2 from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    postDataFromApi,
    getDataFromApi,
    putDataFromApi,
    orderStatuses,
} from '../../services/CommonService'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import SweetAlert from 'react-bootstrap-sweetalert'
import AlertMessage from '../commoncomponent/AlertMessage'
import { Autocomplete } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import moment from 'moment'
import useAuth from 'app/hooks/useAuth'
const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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

const orderList = [
    {
        id: '1',
        stock_check: 'test',
        qtypcs: '34',
        qtymt: '11',
        rcp: '2',
        dp: '2',
    },
    {
        id: '2',
        stock_check: 'test',
        qtypcs: '34',
        qtymt: '11',
        rcp: '3',
        dp: '4',
    },
]

const AppTable = () => {
    let { orderid } = useParams()
    const userdetails = useAuth()
    const LoginId = userdetails.user.id
    const navigate = useNavigate()

    const switchStyles = useN01SwitchStyles()
    const [viewOrder, setviewOrder] = useState([])
    const [orderDetails, setorderDetails] = useState([])
    const [propertyLabels, setpropertyLabels] = useState([])
    const [paymentTerms, setpaymentTerms] = useState([])

    const [formdata, setFormData] = useState({
        dealerId: '',
        skuTypeId: '',
        iscreditRequired: '',
        expectedDeleveryDate: '',
        typeOfDispatch: '',
        yardId: '',
        status: '',
        statusForSystem: '',
        isDependent: '',
        remark: '',
        bm: '',
        updatedAt: '',
        updatedBy: '',
        createdAt: '',
        createdBy: '',
        delear: '',
        nameOfYard: '',
        skuTypeName: '',
        zoneids: [],
        batchids: [],
        avaiableQtys: [],
        outwardQtys: [],
        statusReason: '',
    })
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)
    const [delete_id, setdelete_id] = useState('')
    const [check_status, setcheck_status] = useState('')
    const [statuschange, setstatuschange] = useState(false)
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')
    const [skuProperties, setskuProperties] = useState([])

    useEffect(() => {
        if (orderid) {
            getviewOrder()
            getskupropertiesdetails()
        }
    }, [])

    function confirm() {
        setalert(false)
        if (statuschange) {
            navigate('/dashboard/default')
        }
    }

    const getskupropertiesdetails = async () => {
        const response = await getDataFromApi(
            'dashboard/allDashboard/getOrderDetailsForLoading/' + orderid
        )
        if (response && response.data.code && response.data.data != null) {
            console.log('skuresponse', response.data.data)
            setskuProperties(response.data.data)
            var data = []
            var zoneids = []
            var batchids = []
            var avaiableQtys = []
            var outwardQtys = []
            response.data.data.map((zonedetails, index) => {
                zonedetails.Details.map((zone, i) => {
                    outwardQtys['outward_qty_'+index+'_' + i] = zone.outwardQuantity
                    avaiableQtys['avaiableQty_'+index+'_' + i] = zone.stockQty
                    zoneids['zoneid_'+index+'_' + i] = zone.zoneId
                    batchids['batchid_'+index+'_' + i] = zone.batchId
                })
            })
            setFormData((formData) => ({
                ...formData,
                ['outwardQtys']: outwardQtys,
                ['avaiableQtys']: avaiableQtys,
                ['zoneids']: zoneids,
                ['batchids']: batchids,
            }))
        }
    }

    const getviewOrder = async () => {
        var query = 'orderId=' + orderid
        const response = await postDataFromApi('order/viewOrder', query)
        console.log('order detail', response)
        if (response && response.data.code && response.data.data != null) {
            setviewOrder(response.data.data)

            console.log('orderDetails', response.data.data[0].orderDetails)
            setorderDetails(response.data.data[0].orderDetails)
            setpropertyLabels(response.data.data[0].propertyLabels)

            const paymentTerms = response.data.data[0].paymentTerms
                .map(({ paymentTerms }) => paymentTerms)
                .join(', ')

            setpaymentTerms(paymentTerms)

            if (orderid) {
                var ord = response.data.data
                setFormData((formData) => ({
                    ...formData,
                    ['dealerId']: ord.dealerId,
                    ['skuTypeId']: ord.skuTypeId,
                    ['iscreditRequired']: ord.iscreditRequired,
                    ['expectedDeleveryDate']: ord.expectedDeleveryDate,
                    ['typeOfDispatch']: ord.typeOfDispatch,
                    ['yardId']: ord.yardId,
                    ['status']: ord.status,
                    ['statusForSystem']: ord.statusForSystem,
                    ['isDependent']: ord.isDependent,
                    ['remark']: ord.remark,
                    ['bm']: ord.bm,
                    ['updatedAt']: ord.updatedAt,
                    ['updatedBy']: ord.updatedBy,
                    ['createdAt']: ord.createdAt,
                    ['createdBy']: ord.createdBy,
                    ['delear']: ord.delear,
                    ['nameOfYard']: ord.nameOfYard,
                    ['skuTypeName']: ord.skuTypeName,
                }))
            }
        }
    }

    function handleClose() {
        setOpen(false)
    }

    function handleDeleteOpen() {
        setDeleteOpen(true)
    }

    function handledeleteClose() {
        setDeleteOpen(false)
        setdelete_id('')
        setcheck_status('')
    }

    const handleClickappr_reject = async (id, status) => {
        setDeleteOpen(true)
        setdelete_id(id)
        setcheck_status(status)
        /*console.log('id',id)
        console.log('status',status)
        if(id){
            var formdata={
                "orderId":id,
                "status":status
            }
            var response ="";
            
            response =  await postDataFromApi('order/orderApproveReject', formdata);
            
            console.log('edit response',response)
            if(response.data.code){
                
                setstatuschange(true)
                setOpen(false)
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('success')
            }
            else{
                setOpen(false)
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('error')
            }
        }*/
    }

    const handledeleteConfirm = async () => {
        setDeleteOpen(false)
        if (delete_id) {
            var arid = ''
            var apiurl = ''
            if (check_status == 'Loaded') {
                arid = 4
                apiurl =
                    'dashboard/allDashboard/createOrderOfReadyForLoading/' +
                    orderid
            } else if (check_status == 'Raise Concern') {
                arid = 7
                apiurl =
                    'dashboard/allDashboard/createRaiseConcernForYard/' +
                    orderid
            }
            var data = []
            var quantity_pcs = ''
            console.log(' formdata.zoneids--', formdata.zoneids)
            skuProperties.map((zonedetails,index) => {
                quantity_pcs = zonedetails.quantity_pcs
                zonedetails.Details.map((zone, i) => {
                    // var qtydata=[];
                    // qtydata['zoneId']=formdata.zoneids['zoneid_'+i];
                    // qtydata['batchId']=formdata.batchids['batchid_'+i];
                    // qtydata['avaiableQty']=formdata.avaiableQtys['avaiableQty_'+i];
                    // qtydata['outwardQty']=formdata.outwardQtys['outward_qty_'+i];
                    var qtydata = {
                        zoneId: formdata.zoneids['zoneid_'+index+'_'+ i],
                        batchId: formdata.batchids['batchid_'+index+'_' + i],
                        avaiableQty: formdata.avaiableQtys['avaiableQty_'+index+'_' + i],
                        outwardQty: formdata.outwardQtys['outward_qty_'+index+'_' + i],
                    }
                    data.push(qtydata)
                })
            })
            // data=JSON.stringify(data)
            var newformdata = {
                orderId: orderid,
                yardId: viewOrder[0].yardId,
                qtyPcs: quantity_pcs,
                statusForSystem: arid,
                data: data,
                createdBy: LoginId,
                statusReason: formdata.statusReason,
            }
            // if(check_status != 'Loaded'){
            //     newformdata['statusReason']= formdata.statusReason
            // }
            var response = ''
            console.log('formdatata------', newformdata)
            // return false;
            response = await postDataFromApi(apiurl, newformdata)

            console.log('edit response', response)
            if (response.data.code) {
                setstatuschange(true)
                setOpen(false)
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('success')
            } else {
                setOpen(false)
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('error')
            }
        }
    }
    const quantitychange = (e, type) => {
        var values = formdata[type]
        values[e.target.name] = e.target.value

        setFormData((formData) => ({
            ...formData,
            values,
        }))
    }
    function formdatavaluechange(e, elemnttype = '') {
        var value = e.target.value
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Order Details' }]} />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/dashboard/default')}
            >
                Back to Dashboard BM
            </Button>
            <AlertMessage
                alert={alert}
                alermessage={alermessage}
                confirm={confirm}
                alerttype={alerttype}
            />
            <ValidatorForm>
                {viewOrder.map((viewOrder, index) => (
                    <Grid container spacing={3} className="orderview">
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <table className="table table-hover table-bordered viewtable">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Customer/Dealer</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewOrder.delear}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Product Group</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewOrder.skuTypeName}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Remark</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewOrder.remark
                                                    ? viewOrder.remark
                                                    : ' - '}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>BM</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewOrder.bmName
                                                    ? viewOrder.bmName
                                                    : ' - '}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Status</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {
                                                    orderStatuses[
                                                        viewOrder
                                                            .statusForSystem
                                                    ]
                                                }
                                            </Typography>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td>
                                            <Typography>
                                                <span>Status Reason</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewOrder.statusReason}
                                            </Typography>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <table className="table table-hover table-bordered viewtable">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Yard</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewOrder.nameOfYard}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Payment Terms</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {paymentTerms}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>
                                                    Expected Delevery Date
                                                </span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {moment(
                                                    viewOrder.expectedDeleveryDate
                                                ).format('DD-MM-Y')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Created At:</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {moment(
                                                    viewOrder.createdAt
                                                ).format('DD-MM-Y')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Updated At</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {moment(
                                                    viewOrder.updatedAt
                                                ).format('DD-MM-Y')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Is Credit Required</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                name="iscreditRequired"
                                                label="Is creditRequired"
                                                checked={
                                                    viewOrder.iscreditRequired !==
                                                        '0' &&
                                                    viewOrder.iscreditRequired
                                                        ? true
                                                        : false
                                                }
                                                className="hidecheckbox_label"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                ))}
            </ValidatorForm>
            <table
                id="customdatatable"
                className="table table-hover table-bordered"
            >
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>SKU Name</th>
                        <th>SKU Code</th>
                        {orderDetails &&
                        orderDetails[0] &&
                        orderDetails[0].properties
                            ? orderDetails[0].properties.map((label, i) => {
                                  return <th>{label.label}</th>
                              })
                            : ''}
                        <th>Qty Pcs</th>
                        <th>Qty MT</th>
                        <th>RCP</th>
                        <th>DP</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.map((orderDetails, index) => (
                        <tr key={index}>
                            <td align="left">{index + 1}</td>
                            <td>{orderDetails.SKUName}</td>
                            <td>{orderDetails.SKUCode}</td>
                            {orderDetails.properties
                                ? orderDetails.properties.map((prop, i) => {
                                      return <td>{prop.value}</td>
                                  })
                                : ''}
                            <td align="left">{orderDetails.quantity_pcs}</td>
                            <td align="left">{orderDetails.quantity_mt}</td>
                            <td align="left">{orderDetails.rcp}</td>
                            <td align="left">{orderDetails.dp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {skuProperties.map((zonedetails, index) => (
                <div key={index} className="index_set">
                    <div className="dash_title">{zonedetails.SKUName}</div>
                    <table
                        id="customdatatable"
                        className="table table-hover table-bordered"
                    >
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Zone No</th>
                                <th>Batch No</th>
                                <th>Available Qty</th>
                                <th>Outword Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            { zonedetails.Details.length > 0 ? zonedetails.Details.map((zone, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{zone.nameOfZone}</td>
                                        <td>{zone.batchName}</td>
                                        <td>
                                            <input
                                                onChange={(e) =>
                                                    quantitychange(
                                                        e,
                                                        'avaiableQtys'
                                                    )
                                                }
                                                className="required view-disabled"
                                                id="avail_qty"
                                                label="avail_qty"
                                                type="text"
                                                fullWidth
                                                name={'avaiableQty_'+index+'_'+ i}
                                                value={
                                                    formdata.avaiableQtys[
                                                        'avaiableQty_'+index+'_'+ i
                                                    ]
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                onChange={(e) =>
                                                    quantitychange(
                                                        e,
                                                        'outwardQtys'
                                                    )
                                                }
                                                className="required view-disabled"
                                                id="outward_qty"
                                                label="outward_qty"
                                                type="text"
                                                fullWidth
                                                name={'outward_qt_'+index+'_'+  i}
                                                value={
                                                    formdata.outwardQtys[
                                                        'outward_qty_'+index+'_'+ i
                                                    ]
                                                }
                                            />
                                        </td>
                                    </tr>
                                )
                            }) : <tr><td colSpan={5} style={{textAlign:'center'}}>Not in stock</td></tr>}
                        </tbody>
                    </table>
                </div>
            ))}
            <div className="approve_reject">
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                        handleClickappr_reject(orderid, 'Raise Concern')
                    }
                >
                    Raise Concern
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClickappr_reject(orderid, 'Loaded')}
                >
                    Loaded
                </Button>
            </div>
            <Dialog
                open={deleteopen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <ValidatorForm onSubmit={handledeleteConfirm} onError={() => null}>
                <DialogTitle id="alert-dialog-title">
                    {'Are You Sure You Want to Change Status?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <DialogContent>
                            <TextField
                                onChange={(e) => formdatavaluechange(e)}
                                value={formdata.statusReason}
                                name="statusReason"
                                autoFocus
                                margin="dense"
                                id="statusReason"
                                label="Reason"
                                type="text"
                                fullWidth
                                variant="standard"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </DialogContent>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handledeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Confirm
                    </Button>
                </DialogActions>
                </ValidatorForm> 
            </Dialog>
        </Container>
    )
}

export default AppTable
