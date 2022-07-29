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
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Popup from 'reactjs-popup'
import {
    postDataFromApi,
    getDataFromApi,
    putDataFromApi,
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
import { batch } from 'react-redux'

const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

// const TextField = styled(TextValidator)(() => ({
//     width: '100%',
//     marginBottom: '16px',
// }))

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
    let { id } = useParams()
    const navigate = useNavigate()

    const switchStyles = useN01SwitchStyles()
    const [viewOrder, setviewOrder] = useState([])
    const [StockView, setStockView] = useState([])
    const [orderDetails, setorderDetails] = useState([])
    const [propertyLabels, setpropertyLabels] = useState([])
    const [open, setOpen] = useState(false)
    const [openmember, setOpenmember] = useState(false)
    const [rows, setrows] = useState([])
    const [propertyoptions, setpropertyoptions] = useState([])
    const [skuproperties, setskuproperties] = useState([])
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
    })

    const [batchFormData, setBatchFormData] = useState({
        inwardId: id,
        InwardQuantity: [],
        InwardWeight: [],
        scanOCR: [],
        batchNo: [],
        zoneId: [],
        yardId: '',
        skuCode: '',
        totalInwardQuantity: '',
        totalInwardWeight: '',
        inwardSkuDetailId: '',
        skuId: '',
    })
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')
    const [zoneoptions, setzoneoptions] = useState([])
    useEffect(() => {
        if (id) {
            getStockInwardDetails()
        }
    }, [])
    const getzone_masters = async (id = '') => {
        var query = 'model=zone_masters'
        const response = await getDataFromApi(
            'masters/zoneMaster/getZoneByYardId/' + id
        )
        if (response && response.data.code && response.data.data != null) {
            var zoneopts = []
            response.data.data.map((zone, i) => {
                var zn = []
                zn['id'] = zone.id
                zn['label'] = zone.nameOfZone
                zoneopts.push(zn)
            })
            setzoneoptions(zoneopts)
            console.log('zone data', response)
        }
    }

    function addrow() {
        getrows()
    }
    const getrows = (type = '') => {
        if (type) {
            setrows([{ InwardQuantity: 1, formula: 2, InwardWeight: 5 }])
        } else {
            setrows([
                ...rows,
                { InwardQuantity: 1, formula: 2, InwardWeight: 5 },
            ])
        }
    }
    const closeModal = () => {
        setOpen(false)
    }

    const closeModalMember = () => {
        setOpenmember(false)
    }

    const openModal = (index = '') => {
        var property = orderDetails[index]
        var weight = property.inward_weight
        var qty = property.inward_qty
        setBatchFormData((formData) => ({
            ...formData,
            totalInwardQuantity: qty,
            totalInwardWeight: weight,
            skuCode: property.SKUCode,
            inwardSkuDetailId: property.id,
            skuId: property.sku_id,
            InwardQuantity: [],
            InwardWeight: [],
            scanOCR: [],
            batchNo: [],
            zoneId: [],
        }))
        setrows([])
        setOpen(true)
    }

    const getStockInwardDetails = async () => {
        var query = 'id=' + id
        const response = await postDataFromApi(
            'order/materialStockInwardDetails',
            query
        )
        console.log('order detail', response)
        if (response && response.data.code && response.data.data != null) {
            setviewOrder(response.data.data)

            console.log('orderDetails', response.data.data[0].orderDetails)
            setorderDetails(response.data.data[0].orderDetails)
            setpropertyLabels(response.data.data[0].propertyLabels)
            getzone_masters(response.data.data[0].yardId)
            setBatchFormData((formData) => ({
                ...formData,
                yardId: response.data.data[0].yardId,
            }))
            if (id) {
                var ord = response.data.data
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('sbmited', 'submited')
        var stockDetails = []
        var weight = 0
        var qty = 0
        
        var isEmpty=false;
        rows.map((single, i) => {
            if(
                (batchFormData.batchNo['batchNo_' + i]==undefined || batchFormData.batchNo['batchNo_' + i]=="") 
                || 
                (batchFormData.zoneId['zoneId_' + i]==undefined || batchFormData.zoneId['zoneId_' + i]=="") 
                ||  
                (batchFormData.InwardQuantity['InwardQuantity_' + i]==undefined || batchFormData.InwardQuantity['InwardQuantity_' + i]=="") 
                || 
                (batchFormData.InwardWeight['InwardWeight_' + i]==undefined || batchFormData.InwardWeight['InwardWeight_' + i]=="")) 
            {
                isEmpty=true
            }
            var singlestock = {
                batchNo: batchFormData.batchNo['batchNo_' + i],
                zoneId: batchFormData.zoneId['zoneId_' + i],
                inwardQuantity:
                    batchFormData.InwardQuantity['InwardQuantity_' + i],
                inwardWeight: batchFormData.InwardWeight['InwardWeight_' + i],
            }
            weight = batchFormData.InwardWeight['InwardWeight_' + i]
                ? parseFloat(weight) +
                  parseFloat(batchFormData.InwardWeight['InwardWeight_' + i])
                : weight
                qty = batchFormData.InwardQuantity['InwardQuantity_' + i]
                ? parseFloat(qty) +
                  parseFloat(batchFormData.InwardQuantity['InwardQuantity_' + i])
                : qty
            stockDetails.push(singlestock)
        })

        var newformdata = {
            id: batchFormData.inwardId,
            yardId: batchFormData.yardId,
            skuCode: batchFormData.skuCode,
            totalInwardQuantity: batchFormData.totalInwardQuantity,
            totalInwardWeight: batchFormData.totalInwardWeight,
            inwardSkuDetailId: batchFormData.inwardSkuDetailId,
            skuId: batchFormData.skuId,
            stockDetails: stockDetails,
        }
        if(rows.length==0){
            setalermessage('Please Atleast add 1 item')
            setalert(true)
            setalerttype('error')
            return false
        }
        if(isEmpty){
            setalermessage('All Fields are Mandatory')
            setalert(true)
            setalerttype('error')
            return false
        }
        if (weight > batchFormData.totalInwardWeight) {
            setalermessage('Can not Enter weight grater then Totalweight')
            setalert(true)
            setalerttype('error')
            return false
        }
        if (qty > batchFormData.totalInwardQuantity) {
            setalermessage('Can not Enter qty grater then Total Inward Qunatity')
            setalert(true)
            setalerttype('error')
            return false
        }
        console.log('newformdata', newformdata)
        const response = await postDataFromApi(
            'order/mainStockInwardDetailsEntry',
            newformdata
        )
        if (response.data.code) {
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            getStockInwardDetails()
        } else {
            // setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }
    function handleClose() {
        setOpen(false)
    }
    const stockchange = (e, index, type) => {
        var values = batchFormData[type]
        values[e.target.name] = e.target.value
        setBatchFormData((formData) => ({
            ...formData,
            values,
        }))
    }
    const changeafterdropdownvalue = (e, val, name, type) => {
        if (val) {
            var values = batchFormData[type]
            values[name] = val.id
        } else {
            var values = batchFormData[type]
            values[name] = ''
        }

        setBatchFormData((formData) => ({
            ...formData,
            values,
        }))
    }
    function handleClickDelete(index, e) {
        setrows(rows.filter((v, i) => i !== index))
    }
    function confirm() {
        setalert(false)
    }
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Stock Inward Details' }]}
                />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/stockinward')}
            >
                Back to StockInward
            </Button>
            <ValidatorForm>
                {viewOrder.map((viewOrder, index) => (
                    <>
                        <Grid container spacing={3} className="orderview">
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <table className="table table-hover table-bordered viewtable">
                                    <tbody>
                                        {/* <tr>
                               <td><Typography> <span>Product Code:</span></Typography></td>
                               <td><Typography> {viewOrder.scanOCR}</Typography></td>
                            </tr>
                            <tr>
                               <td><Typography> <span>Batch No:</span></Typography></td>
                               <td><Typography> {viewOrder.batchNo}</Typography></td>
                            </tr> */}
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>Yard:</span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {viewOrder.nameOfYard}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>Remark:</span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {viewOrder.remark}
                                                </Typography>
                                            </td>
                                        </tr>
                                        {/* <tr>
                                        <td><Typography> <span>Zone:</span></Typography></td>
                                        <td><Typography> {viewOrder.nameOfZone}</Typography></td>
                                    </tr> */}
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>SKU Group:</span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {viewOrder.skuTypeName}
                                                </Typography>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <table className="table table-hover table-bordered viewtable">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>Invoice Number:</span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {viewOrder.invoice_number}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>Vehical Number:</span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {viewOrder.vehical_number}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>Invoice Date:</span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {moment(
                                                        viewOrder.invoice_date
                                                    ).format('DD-MM-Y')}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>
                                                        Truck Arrived From:
                                                    </span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {viewOrder.truckArrivedFrom}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>Truck Name:</span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {viewOrder.truckNo}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>Truck Weight:</span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {viewOrder.truckWeight}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    <span>Inward Date:</span>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {' '}
                                                    {moment(
                                                        viewOrder.inward_date
                                                    ).format('DD-MM-Y')}
                                                </Typography>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>
                        <table
                            id="customdatatable"
                            className="table table-hover table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>SKU Code</th>
                                    {/* <th>Batch No</th> */}
                                    {orderDetails &&
                                    orderDetails[0] &&
                                    orderDetails[0].properties
                                        ? orderDetails[0].properties.map(
                                              (label, i) => {
                                                  return <th>{label.label}</th>
                                              }
                                          )
                                        : ''}

                                    <th>Inward Quantity</th>
                                    <th>Inward Weight</th>
                                    <th>Action</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails
                                    ? orderDetails.map(
                                          (singleorderDetails, index) => (
                                              <>
                                                  <tr>
                                                      <td align="left">
                                                          {index + 1}
                                                      </td>
                                                      <td align="left">
                                                          {
                                                              singleorderDetails.SKUCode
                                                          }
                                                      </td>
                                                      {/* <td align="left">{orderDetails.batchNo}</td> */}
                                                      {singleorderDetails.properties ? (
                                                          singleorderDetails.properties.map(
                                                              (prop, i) => {
                                                                  return (
                                                                      <td>
                                                                          {
                                                                              prop.value
                                                                          }
                                                                      </td>
                                                                  )
                                                              }
                                                          )
                                                      ) : (
                                                          <td
                                                              colSpan={
                                                                  orderDetails[0]
                                                                      .properties
                                                                      .length
                                                              }
                                                          ></td>
                                                      )}
                                                      <td align="left">
                                                          {
                                                              singleorderDetails.inward_qty
                                                          }
                                                      </td>
                                                      <td align="left">
                                                          {
                                                              singleorderDetails.inward_weight
                                                          }
                                                      </td>

                                                      <td align="left">
                                                          {!singleorderDetails.inwardDetails ? (
                                                              <Button
                                                                  className="rightalign_btn"
                                                                  variant="outlined"
                                                                  color="primary"
                                                                  onClick={() =>
                                                                      openModal(
                                                                          index
                                                                      )
                                                                  }
                                                              >
                                                                  Add Batches
                                                              </Button>
                                                          ) : (
                                                              ''
                                                          )}
                                                      </td>
                                                  </tr>
                                                  {singleorderDetails.inwardDetails ? (
                                                      <tr>
                                                          <th colSpan={3}></th>
                                                          <th>Batch No</th>
                                                          <th>Zone</th>
                                                          <th>
                                                              InwardQuantity
                                                          </th>
                                                          <th>InwardWeight</th>
                                                      </tr>
                                                  ) : (
                                                      ''
                                                  )}
                                                  {singleorderDetails.inwardDetails
                                                      ? singleorderDetails.inwardDetails.map(
                                                            (batch, i) => {
                                                                return (
                                                                    <tr>
                                                                        <td
                                                                            colSpan={
                                                                                3
                                                                            }
                                                                        ></td>
                                                                        <td>
                                                                            {
                                                                                batch.batchName
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                batch.nameOfZone
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                batch.stockQuantity
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                batch.stockWeight
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )
                                                      : ''}
                                              </>
                                          )
                                      )
                                    : ''}
                            </tbody>
                        </table>
                    </>
                ))}
            </ValidatorForm>
            <AlertMessage
                alert={alert}
                alermessage={alermessage}
                confirm={confirm}
                alerttype={alerttype}
            />

            {/* <Popup variant="outlined" color="primary"
                className="my-popup" 


                modal
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
            > */}
            <Dialog
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <DialogContent>
                        <Button
                            className="orderadd"
                            variant="outlined"
                            color="primary"
                            onClick={addrow}
                        >
                            Add Item
                        </Button>

                        <div className="table_scroll">
                            <table className="table table-hover table-bordered display nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Production Code</th>
                                        <th>Batch No</th>
                                        <th>Zone</th>
                                        {/* {skuproperties.map((skuproperties, index) => (
                                     <th>{skuproperties.label}</th>
                                     ))}   */}
                                        <th>Inward Quantity</th>
                                        <th>Inward Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((rows, index) => (
                                        <tr key={index}>
                                            {' '}
                                            <td>{index + 1}</td>
                                            <td>
                                                <TextField
                                                    className="required view-disabled"
                                                    id="scanOCR"
                                                    label="Production Code"
                                                    type="text"
                                                    fullWidth
                                                    name={'scanOCR_' + index}
                                                    value={batchFormData.skuCode ? batchFormData.skuCode : ''}
                                                    onChange={(e) =>
                                                        stockchange(
                                                            e,
                                                            index,
                                                            'scanOCR'
                                                        )
                                                    }
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            </td>
                                            <td>
                                                <TextField
                                                    className="required"
                                                    id="batchNo"
                                                    label="Batch No"
                                                    type="text"
                                                    fullWidth
                                                    name={'batchNo_' + index}
                                                    value={
                                                        batchFormData.batchNo[
                                                            'batchNo_' + index
                                                        ] !== undefined
                                                            ? batchFormData
                                                                  .batchNo[
                                                                  'batchNo_' +
                                                                      index
                                                              ]
                                                            : ''
                                                    }
                                                    onChange={(e) =>
                                                        stockchange(
                                                            e,
                                                            index,
                                                            'batchNo'
                                                        )
                                                    }
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            </td>
                                            <td>
                                                <AutoComplete
                                                    fullWidth
                                                    options={zoneoptions}
                                                    getOptionLabel={(option) =>
                                                        option.label
                                                    }
                                                    onChange={(e, value) =>
                                                        changeafterdropdownvalue(
                                                            e,
                                                            value,
                                                            'zoneId_' + index,
                                                            'zoneId'
                                                        )
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            className="required"
                                                            label="Zone"
                                                            variant="outlined"
                                                            fullWidth
                                                            validators={[
                                                                'required',
                                                            ]}
                                                            errorMessages={[
                                                                'this field is required',
                                                            ]}
                                                            value={
                                                                batchFormData
                                                                    .zoneId[
                                                                    'zoneId_' +
                                                                        index
                                                                ] !== undefined
                                                                    ? batchFormData
                                                                          .zoneId[
                                                                          'zoneId_' +
                                                                              index
                                                                      ]
                                                                    : ''
                                                            }
                                                            name={
                                                                'zoneId_' +
                                                                index
                                                            }
                                                        />
                                                    )}
                                                />
                                            </td>
                                            <td>
                                                <TextField
                                                    className="required"
                                                    id="InwardQuantity"
                                                    label="Inward Quantity"
                                                    type="text"
                                                    fullWidth
                                                    name={
                                                        'InwardQuantity_' +
                                                        index
                                                    }
                                                    value={
                                                        batchFormData
                                                            .InwardQuantity[
                                                            'InwardQuantity_' +
                                                                index
                                                        ] !== undefined
                                                            ? batchFormData
                                                                  .InwardQuantity[
                                                                  'InwardQuantity_' +
                                                                      index
                                                              ]
                                                            : ''
                                                    }
                                                    onChange={(e) =>
                                                        stockchange(
                                                            e,
                                                            index,
                                                            'InwardQuantity'
                                                        )
                                                    }
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            </td>
                                            <td>
                                                <TextField
                                                    className="required"
                                                    id="InwardWeight"
                                                    label="Inward Weight"
                                                    type="text"
                                                    fullWidth
                                                    name={
                                                        'InwardWeight_' + index
                                                    }
                                                    value={
                                                        batchFormData
                                                            .InwardWeight[
                                                            'InwardWeight_' +
                                                                index
                                                        ] !== undefined
                                                            ? batchFormData
                                                                  .InwardWeight[
                                                                  'InwardWeight_' +
                                                                      index
                                                              ]
                                                            : ''
                                                    }
                                                    onChange={(e) =>
                                                        stockchange(
                                                            e,
                                                            index,
                                                            'InwardWeight'
                                                        )
                                                    }
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            </td>
                                            <td>
                                                <IconButton
                                                    onClick={(e) =>
                                                        handleClickDelete(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                >
                                                    <Icon color="error">
                                                        delete
                                                    </Icon>
                                                </IconButton>
                                            </td>{' '}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
            {/* </Popup> */}
        </Container>
    )
}

export default AppTable
