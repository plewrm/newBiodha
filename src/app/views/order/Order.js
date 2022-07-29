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
} from '@mui/material'
import { Alert, Snackbar, SnackbarContent } from '@mui/material'
// import TextField from '@mui/material/TextField'
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
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip'

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
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

const orderList = [
    {
        id: '1',
        Daeler_customer: 'test',
        Yard: 'test',
        SKU: '11',
    },
    {
        id: '2',
        Daeler_customer: 'test',
        Yard: 'test',
        SKU: '112',
    },
]

const SKUoptions = [
    {
        id: '1',
        label: 'test',
    },
    {
        id: '2',
        label: 'test1',
    },
]

const Daeler_customeroptions = [
    {
        id: '1',
        label: '1111',
    },
    {
        id: '2',
        label: '222',
    },
]

const yardoptions = [
    {
        id: '1',
        label: 'test',
    },
    {
        id: '2',
        label: 'test1',
    },
]

const BMoptions = [
    {
        id: '1',
        label: 'test',
    },
    {
        id: '2',
        label: 'test1',
    },
]

const paymenttermsoptions = [
    {
        id: '1',
        label: 'test',
    },
    {
        id: '2',
        label: 'test1',
    },
]

const SKUdropdownlist = [
    {
        id: '1',
        Thinknees: 'test',
        Width: '112',
        length: '44',
        Stockcheck: '88',
        Qty_pcs: '889',
        Qty_mt: '889',
        RCP: 'tre',
        DP: 'tre',
    },
    {
        id: '2',
        Thinknees: 'test',
        Width: '112',
        length: '44',
        Stockcheck: '88',
        Qty_pcs: '889',
        Qty_mt: '889',
        RCP: 'tre',
        DP: 'tre',
    },
]

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
    const navigate = useNavigate()
    const [sku_masters, setsku_masters] = useState([])
    // const [states,setstates]=useState(subscribarList)
    const model = 'states'
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)

    const [formdata, setFormData] = useState({ stateName: '', isActice: 1 })
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState('')
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')

    const [sku_mastersoptions, setsku_mastersoptions] = useState([])
    const [skuproperties, setskuproperties] = useState([])
    const [orderListing, setorderListing] = useState([])
    //const [statename,setStatename]=useState="";

    // const [state, setState] = React.useState({
    //        active: true,
    //        deactive: true,
    //    })

    const handleStateChange = async (id, isActive) => {
        console.log(id)
        console.log(isActive)
        isActive = isActive ? 0 : 1
        var query = 'tableName=' + model + '&isActive=' + isActive
        const response = await putDataFromApi('masters/isActive/' + id, query)
        if (response.data.code) {
            console.log(response.data.message)
            getsku_masters()
            getorderListing()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
        } else {
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    useEffect(() => {
        getsku_masters()
        getorderListing()
        // getdatatable()
    }, [])

    const getsku_masters = async () => {
        var query = 'model=sku_masters'
        const response = await postDataFromApi('masters/allMasters/', query)
        if (response && response.data.code && response.data.data != null) {
            setsku_masters(response.data.data)
            var sku_mastersopts = []
            response.data.data.map((sku_masters, i) => {
                var um = []
                um['id'] = sku_masters.id
                um['label'] = sku_masters.SKUName
                sku_mastersopts.push(um)
            })
            setsku_mastersoptions(sku_mastersopts)
            console.log('sku_masters data', response)
        }
    }
    var datatable = ''
    const getdatatable = async () => {
        if (datatable) {
            $('#customdatatable').DataTable().destroy()
        }
        $(document).ready(function () {
            setTimeout(function () {
                $('#customdatatable').DataTable()
            }, 500)
        })
    }

    const handleDateChange = (date) => {
        setFormData((formData) => ({
            ...formData,
            date,
        }))
    }

    function setdefaultvalue() {
        setFormData({ stateName: '', isActice: 1 })
    }
    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['stateName']: orderList[id].stateName,
            ['isActive']: orderList[id].isActive,
        }))
        setEditId(orderList[id].id)
        setIsEdit(true)
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }

    function handleDeleteOpen() {
        setDeleteOpen(true)
    }

    function handledeleteClose() {
        setDeleteOpen(false)
    }
    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }
    function confirm() {
        setalert(false)
    }
    function cancelled() {}
    const handleSubmit = async (e) => {
        e.preventDefault()
        var response = ''
        if (is_edit) {
            response = await postDataFromApi(
                'masters/allMasters/updateStateMasters/' + edit_id,
                formdata
            )
        } else {
            response = await postDataFromApi(
                'masters/allMasters/createStateMasters',
                formdata
            )
        }
        console.log('edit response', response)
        if (response.data.code) {
            getsku_masters()
            setIsEdit(false)
            setEditId('')
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
    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.id
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
        if (e) {
            if (type == 'SKU') {
                getskuproperties(e.id)
            }
        } else {
            getskuproperties()
        }
    }

    const getskuproperties = async (id) => {
        var query = 'skuId=' + id
        const response = await postDataFromApi(
            'masters/allMasters/getSkuPropertyList',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setskuproperties(response.data.data)
            console.log('SKU properties', response)
        }
    }
    const getorderListing = async () => {
        var query = ''
        const response = await postDataFromApi('order/orderListing', query)
        if (response && response.data.code && response.data.data != null) {
            setorderListing(response.data.data)
            console.log('orderListing', response)
            setTimeout(function () {
                $('#customdatatable').DataTable()
            }, 1000)
        }
        else{
            $('#customdatatable').DataTable()
        }
    }

    const switchStyles = useN01SwitchStyles()
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Order' }]} />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/order/add')}
            >
                Add New Order
            </Button>
            <AlertMessage
                alert={alert}
                alermessage={alermessage}
                confirm={confirm}
                alerttype={alerttype}
            />

            <Box width="100%" overflow="auto">
                <table
                    id="customdatatable"
                    className="table table-hover table-bordered"
                >
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Dealer/customer</th>
                            <th>ASO</th>
                            <th>Yard</th>

                            <th>Product Group</th>
                            <th>Created Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderListing.map((order, index) => (
                            <tr key={index}>
                                <td align="left">{index + 1}</td>
                                <td align="left">{order.delear}</td>
                                <td align="left">{order.createdByName}</td>
                                <td align="left">{order.nameOfYard}</td>
                                <td align="left">{order.skuTypeName}</td>
                                <td align="left">
                                    {moment(order.createdAt).format('DD-MM-Y')}
                                </td>

                                {/* <td align="left">{order.status}</td> */}
                                <td align="left">
                                    {' '}
                                    {order.statusForSystem != ''
                                        ? orderStatuses[order.statusForSystem]
                                        : ''}
                                </td>
                                <td>
                                    <Tooltip title="View">
                                        <IconButton
                                            onClick={() =>
                                                navigate(
                                                    '/order/view/' + order.id
                                                )
                                            }
                                        >
                                            <Icon color="primary">
                                                remove_red_eye
                                            </Icon>
                                        </IconButton>
                                    </Tooltip>
                                    {order.statusForSystem!=8 ? <>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() =>
                                                navigate(
                                                    '/order/edit/' + order.id
                                                )
                                            }
                                        >
                                            <Icon color="primary">edit</Icon>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delivery">
                                        <IconButton
                                            onClick={() =>
                                                navigate(
                                                    '/order/delivery/' +
                                                        order.id
                                                )
                                            }
                                        >
                                            <Icon color="primary">
                                                local_shipping
                                            </Icon>
                                        </IconButton>
                                    </Tooltip></>
                                     : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
            <Dialog
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <DialogTitle id="form-dialog-title">
                        {is_edit ? 'Update' : 'Add New'} Dealer/Customer
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <AutoComplete
                                    fullWidth
                                    options={Daeler_customeroptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue(
                                            'Daeler_customer',
                                            value
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Customer/Dealer"
                                            variant="outlined"
                                            fullWidth
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                            value={formdata.Daeler_customer}
                                            name="Daeler_customer"
                                        />
                                    )}
                                />
                                <AutoComplete
                                    fullWidth
                                    options={sku_mastersoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('SKU', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="SKU"
                                            variant="outlined"
                                            fullWidth
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                            value={formdata.SKU}
                                            name="SKU"
                                        />
                                    )}
                                />
                                <TextField
                                    className="required"
                                    id="remark"
                                    label="Remark"
                                    type="text"
                                    fullWidth
                                    name="stateName"
                                    value={formdata.remark || ''}
                                    onChange={(e) => formdatavaluechange(e)}
                                    validators={[
                                        'required',
                                        'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$',
                                    ]}
                                    errorMessages={[
                                        'this field is required',
                                        'Only Characters allowed',
                                    ]}
                                    multiline
                                    rows={3}
                                />
                                <AutoComplete
                                    fullWidth
                                    options={BMoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('BM', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="BM"
                                            variant="outlined"
                                            fullWidth
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                            value={formdata.BM}
                                            name="BM"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <AutoComplete
                                    fullWidth
                                    options={yardoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('Yard', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Yard"
                                            variant="outlined"
                                            fullWidth
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                            value={formdata.Yard}
                                            name="Yard"
                                        />
                                    )}
                                />
                                <AutoComplete
                                    fullWidth
                                    options={paymenttermsoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue(
                                            'paymentterms',
                                            value
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Payment terms"
                                            variant="outlined"
                                            fullWidth
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                            value={formdata.Yard}
                                            name="paymentterms"
                                        />
                                    )}
                                />
                                <div className="datediv">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            value={formdata.date}
                                            onChange={(e) =>
                                                handleDateChange(e)
                                            }
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    // variant="Outlined"
                                                    id="mui-pickers-date"
                                                    label="Employee joing date "
                                                    className="required"
                                                    sx={{
                                                        mb: 2,
                                                        width: '100%',
                                                    }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </Grid>
                        </Grid>
                        <table className="table table-hover table-bordered display">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Thinknees</th>
                                    <th>Width</th>
                                    <th>length</th>
                                    <th>Stock check</th>
                                    <th>Qty pcs</th>
                                    <th>Qty mt</th>
                                    <th>RCP</th>
                                    <th>DP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skuproperties.map((skuproperties, index) => (
                                    <tr key={index}>
                                        <td align="left">{skuproperties.id}</td>
                                        <td align="left">
                                            {skuproperties.label}
                                        </td>
                                        <td align="left">{skuproperties.id}</td>
                                        <td align="left">{skuproperties.id}</td>

                                        <td align="left">{skuproperties.id}</td>
                                        <td align="left">{skuproperties.id}</td>
                                        <td align="left">{skuproperties.id}</td>
                                        <td align="left">{skuproperties.id}</td>
                                        <td align="left">{skuproperties.id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                            variant="outlined"
                            type="submit"
                            color="primary"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
            <Dialog
                open={deleteopen}
                onClose={handledeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are You Sure You Want to delete this record?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handledeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handledeleteClose}
                        color="primary"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default AppTable
