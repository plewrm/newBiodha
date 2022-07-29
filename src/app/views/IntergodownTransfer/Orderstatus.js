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
    FormControlLabel,
    Icon,
    TableRow,
    Checkbox,
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
import moment from 'moment'

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
        rcp: 'tre',
        dp: 'tre',
    },
    {
        id: '2',
        Thinknees: 'test',
        Width: '112',
        length: '44',
        Stockcheck: '88',
        Qty_pcs: '889',
        Qty_mt: '889',
        rcp: 'tre',
        dp: 'tre',
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

const tableData = [
    {
        id: 1,
        stockcheck: '23',
        quantity_pcs: 325,
        quantity_mt: 325,
        rcp: 225,
        dp: 23,
    },
]

// const propertyoptions  = [
//     {
//         id: '1',
//         label: 123

//     },
//     {
//         id: '2',
//         label: 344

//     }

// ]

const AppTable = () => {
    let { orderid } = useParams()

    const [dateopen, setdateOpen] = React.useState(false)

    const navigate = useNavigate()
    const [sku_masters, setsku_masters] = useState([])
    // const [states,setstates]=useState(subscribarList)
    const model = 'states'
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)

    const [formdata, setFormData] = useState({
        isActice: 1,
        stockcheck: [],
        quantity_pcs: [],
        quantity_mt: [],
        rcp: [],
        dp: [],
        proptype: [],
        isEnable: 0,
        iscreditRequired: 0,
        typeOfDispatch: '0',
        remark: '',
        expectedDeleveryDate: '',
    })
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState('')
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')

    const [sku_mastersoptions, setsku_mastersoptions] = useState([])
    const [skuproperties, setskuproperties] = useState([])
    const [rows, setrows] = useState([])

    const [is_skuselected, setskuselected] = useState(false)

    const [customer_masters, setcustomer_masters] = useState([])
    const [customeroptions, setcustomeroptions] = useState([])

    const [payment_terms, setpayment_terms] = useState([])
    const [paymentoptions, setpaymentoptions] = useState([])

    const [yards, setyards] = useState([])
    const [yardsoptions, setyardsoptions] = useState([])

    const [BM, setBM] = useState([])
    const [BMoptions, setBMoptions] = useState([])
    const [propertyoptions, setpropertyoptions] = useState([])
    const [clearedDate, setClearedDate] = React.useState(null)
    const todaydate = new Date()
    const [viewOrder, setviewOrder] = useState([])
    const [selectedcustomer, setselectedcustomer] = useState({})
    const [orderDetails, setorderDetails] = useState([])
    const [propertyLabels, setpropertyLabels] = useState([])
    const [statuschange, setstatuschange] = useState(false)
    const [delete_id, setdelete_id] = useState('')
    const [check_status, setcheck_status] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [redirectUrl, setRedirectUrl] = useState('')
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
            setdelete_id('')
            setcheck_status('')
            console.log(response.data.message)
            getsku_masters()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
        } else {
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
            setdelete_id('')
            setcheck_status('')
        }
    }

    useEffect(() => {
        getsku_masters()
        getcustomer_masters()
        getpayment_terms()
        getyards()
        getBM()
        getdatatable()
        getviewOrder()
        // setIsLoaded(true)
    }, [])
    useEffect(() => {
        // setTimeout(getviewOrder(), 5000);
        // getviewOrder()
    }, [BM])

    const getcustomer_masters = async () => {
        var query = 'model=customer_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            var customeropts = []
            response.data.data.map((customer_masters, i) => {
                var st = []
                st['id'] = customer_masters.id
                st['label'] = customer_masters.firmName
                customeropts.push(st)
            })
            setcustomeroptions(customeropts)
            setcustomer_masters(response.data.data)

            console.log('customer master data', response)
        }
    }

    const getpayment_terms = async () => {
        var query = 'model=payment_terms'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setpayment_terms(response.data.data)
            var paymentopts = []
            response.data.data.map((payment_terms, i) => {
                var pm = []
                pm['id'] = payment_terms.id
                pm['label'] = payment_terms.paymentTerms
                paymentopts.push(pm)
            })
            setpaymentoptions(paymentopts)
            console.log('payment data', response)
        }
    }

    const getyards = async () => {
        var query = 'model=yard_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setyards(response.data.data)
            var yardsopts = []
            response.data.data.map((yards, i) => {
                var yd = []
                yd['id'] = yards.id
                yd['label'] = yards.nameOfYard
                yardsopts.push(yd)
            })
            setyardsoptions(yardsopts)
            console.log('yards data', response)
        }
    }

    const getBM = async () => {
        var query = ''
        const response = await getDataFromApi('order/getBM', query)
        if (response && response.data.code && response.data.data != null) {
            setBM(response.data.data)
            var BMopts = []
            response.data.data.map((BM, i) => {
                var bm = []
                bm['id'] = BM.id
                bm['label'] = BM.fullName
                BMopts.push(bm)
            })
            setBMoptions(BMopts)
            console.log('BM data', response)
        }
    }

    const getsku_masters = async () => {
        var query = 'model=sku_type_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setsku_masters(response.data.data)
            var sku_mastersopts = []
            response.data.data.map((sku_masters, i) => {
                var um = []
                um['id'] = sku_masters.id
                um['label'] = sku_masters.skuTypeName
                sku_mastersopts.push(um)
            })
            setsku_mastersoptions(sku_mastersopts)

            console.log('sku_masters data', response)
        }
    }

    const getdatatable = async () => {
        $(document).ready(function () {
            setTimeout(function () {
                $('#customdatatable').DataTable()
            }, 1000)
        })
    }

    const handleDateChange = (date) => {
        setClearedDate(date)
        setFormData((formData) => ({
            ...formData,
            date,
        }))
    }

    function setdefaultvalue() {
        setFormData({
            dealerId: '',
            isActice: 1,
            iscreditRequired: 0,
            typeOfDispatch: '0',
        })
    }
    function handleClickOpen() {
        setdelete_id('')
        setcheck_status('')
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        /* setFormData((formData) => ({
            ...formData,
            ['stateName']:orderList[id].stateName,
            ['isActive']:orderList[id].isActive
        }));
        setEditId(orderList[id].id)
        setIsEdit(true)
        setOpen(true)*/
    }
    function handleClickDelete(index, e) {
        setrows(rows.filter((v, i) => i !== index))
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
    const handledeleteConfirm = async () => {
        setDeleteOpen(false)
        if (delete_id) {
            var formdata = {
                orderId: delete_id,
                status: check_status,
            }
            var response = ''

            response = await postDataFromApi(
                'order/orderApproveReject',
                formdata
            )

            console.log('edit response', response)
            if (response.data.code) {
                setstatuschange(true)
                setOpen(false)
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('success')
                setRedirectUrl('/dashboard/default')
            } else {
                setOpen(false)
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('error')
            }
        }
    }
    function formdatavaluechange(e, elemnttype = '') {
        var value = e.target.value.trimStart()
        if (elemnttype == 'checkbox') {
            if (e.target.checked) {
                value = 1
            } else {
                value = 0
            }
        }
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }
    function confirm() {
        setalert(false)
        if (statuschange) {
            navigate(redirectUrl)
        }
    }
    function cancelled() {}
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formdata)
        var orderDetails = []
        var proptypedetail = []
        rows.map((list, i) => {
            var data = {
                skuId: formdata.SKU,
                stock_check: formdata.stockcheck['stockcheck_' + i],
                quantity_pcs: formdata.quantity_pcs['quantity_pcs_' + i],
                quantity_mt: formdata.quantity_mt['quantity_mt_' + i],
                rcp: formdata.rcp['rcp_' + i],
                dp: formdata.dp['dp_' + i],
            }
            skuproperties.map((skuproperties, indexinner) => {
                // var datas={
                //  'proptype':formdata.proptype['proptype_'+skuproperties.skuPropertiesMastersId]
                // }
                // proptypedetail.push(datas)
                data['property_' + skuproperties.skuPropertiesMastersId] =
                    formdata.proptype[
                        'proptype_' + skuproperties.skuPropertiesMastersId
                    ]
            })

            orderDetails.push(data)
        })
        //var newdate =  Moment((formdata.date.format('Y-m-d'))
        const momentdate = moment(formdata.date)
        var newdate = momentdate.format('Y-MM-DD')
        var newformdata = {
            dealerId: formdata.dealerId,
            skuTypeId: formdata.SKU,
            yardId: formdata.yardId,
            payment_terms: formdata.paymentterms,
            remark: formdata.remark,
            expectedDeleveryDate: newdate,
            bm: formdata.BM,
            typeOfDispatch: formdata.typeOfDispatch,
            iscreditRequired: formdata.iscreditRequired,
            orderDetails: orderDetails,
        }

        console.log(newformdata)

        /*var response ="";
        
        response = await postDataFromApi('order/createOrder', newformdata);
        
        console.log('edit response',response)
        if(response.data.code){
            getsku_masters()
            setIsEdit(false)
            setEditId("")
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
        }*/
    }
    function changedropdownvalue(type, e) {
        if (e) {
            if (type == 'paymentterms') {
                var values = []
                e.map((prop, i) => {
                    var data = prop.id
                    values.push(data)
                })
                var value = values
            } else {
                var value = e.id
            }
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

    const orderchange = (e, index, type) => {
        var values = formdata[type]
        values[e.target.name] = e.target.value
        setFormData((formData) => ({
            ...formData,
            values,
        }))
    }

    const changeafterdropdownvalue = (e, val, name, type) => {
        if (val) {
            var values = formdata[type]
            values[name] = val.id
        } else {
            var values = formdata[type]
            values[name] = ''
        }

        setFormData((formData) => ({
            ...formData,
            values,
        }))
    }
    function getSelectedItem(id, data = [], label = '') {
        console.log('data', data)
        console.log('data-id', id)
        if (data == 'undefined') {
            data = []
        }
        const item = data.find((opt) => {
            if (label) {
                if (opt.label.toUpperCase == id.toUpperCase) return opt
            } else {
                if (opt.id == id) return opt
            }
        })
        console.log('items', item)
        return item ? item : null
    }

    const getskuproperties = async (id) => {
        setskuselected(false)
        var query = 'skuId=' + id
        const response = await postDataFromApi(
            'masters/allMasters/getSkuPropertyList',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setskuproperties(response.data.data)
            setskuselected(true)
            console.log('SKU properties', response.data.data)
            var dddata = []
            response.data.data.map((prop, i) => {
                var signleprpdd = []
                if (prop.dropdownData) {
                    prop.dropdownData.map((dd, i) => {
                        signleprpdd.push({ label: dd.dropdownName, id: dd.id })
                    })
                }
                dddata[prop.skuPropertiesMastersId] = signleprpdd
            })
            setpropertyoptions(dddata)
            setFormData((formData) => ({
                ...formData,
                stockcheck: [],
                quantity_pcs: [],
                quantity_mt: [],
                rcp: [],
                dp: [],
                proptype: [],
            }))
        }
    }
    const getviewOrder = async () => {
        var query = 'orderId=' + orderid
        const response = await postDataFromApi('order/viewOrder', query)
        console.log('order detail', response)
        if (response && response.data.code && response.data.data != null) {
            setviewOrder(response.data.data)
            setorderDetails(response.data.data[0].orderDetails)
            setpropertyLabels(response.data.data[0].propertyLabels)
            console.log('orderDetails', response.data.data[0].orderDetails)
            //setorderDetails(response.data.data[0].orderDetails)
            //setpropertyLabels(response.data.data[0].propertyLabels)
            if (orderid) {
                var ord = response.data.data[0]
                var orderDetails = response.data.data[0].orderDetails
                var propertyLabels = response.data.data[0].propertyLabels
                var quantity_pcsarr = []
                var quantity_mtarr = []
                var proptypearr = []
                var rcparr = []
                var dparr = []

                if (orderDetails) {
                    orderDetails.map((orderDetails, index) => {
                        quantity_pcsarr['quantity_pcs_' + orderDetails.skuId] =
                            orderDetails.quantity_pcs
                        quantity_mtarr['quantity_mt_' + orderDetails.skuId] =
                            orderDetails.quantity_mt
                        rcparr['rcp_' + orderDetails.skuId] = orderDetails.rcp
                        dparr['dp_' + orderDetails.skuId] = orderDetails.dp
                    })

                    propertyLabels.map((propertyLabels, index) => {
                        proptypearr[
                            'proptype_' + propertyLabels.skuPropertiesMastersId
                        ] = propertyLabels.label
                    })

                    var paymentTerms = ord.paymentTerms
                    var paymentoptsarr = []
                    paymentTerms.map((paymentTerms, index) => {
                        var pmarr = []
                        pmarr['id'] = paymentTerms.paymentTermsId
                        pmarr['label'] = paymentTerms.paymentTerms
                        paymentoptsarr.push(pmarr)
                    })

                    // setselectedcustomer(getSelectedItem(ord.dealerId,customeroptions))
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
                        ['quantity_pcs']: quantity_pcsarr,
                        ['quantity_mt']: quantity_mtarr,
                        ['proptype']: proptypearr,
                        ['rcp']: rcparr,
                        ['dp']: dparr,
                        ['paymentTerms']: paymentoptsarr,
                        ['yardId']: ord.yardId,
                    }))
                    getskuproperties(ord.skuTypeId)
                    setTimeout(function () {
                        setIsLoaded(true)
                    }, 500)

                    console.log('dealerid', ord.dealerId)
                    console.log('quantity_pcsarr', quantity_pcsarr)
                }
            }
        }
    }
    function addrow() {
        getrows()
    }

    const getrows = async () => {
        if (is_skuselected) {
            setrows([
                ...rows,
                {
                    stockcheck: 1,
                    quantity_pcs: 44,
                    quantity_mt: 55,
                    rcp: 555,
                    dp: 87,
                },
            ])
            console.log({ rows })
        }
    }

    function handleClickAdd(id) {
        console.log(id)
        console.log('propertycheckqty', formdata.proptype)
        console.log('SKU', formdata.SKU)
        /*var stockchkarr=[]
        var chkproperty=[];
        var proparr=JSON.parse(formdata.proptype)
        console.log(proparr)
        proparr.map((prop,i)=>{
            var property=[]
            property['property_id']=1
            property['value']=1
            chkproperty.push(property)
        })
        console.log(chkproperty)*/
        /* var proparr=JSON.parse(formdata.proptype)
        proparr.map((prop,i)=>{
            var property=[]
            property['property_id']=1
            property['value']=1
            chkproperty.push(property)
        })
        console.log(chkproperty)*/
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
    const switchStyles = useN01SwitchStyles()
    if (isLoaded) {
        console.log('all formData', formdata)
        return (
            <Container className='orderstatuschange'>
                <div className="breadcrumb leftalign_breadcrumb">
                    <Breadcrumb
                        routeSegments={[{ name: 'Change Order Status' }]}
                    />
                </div>
                <Button
                    className="rightalign_btn"
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/order')}
                >
                    Back to Order
                </Button>
                <AlertMessage
                    alert={alert}
                    alermessage={alermessage}
                    confirm={confirm}
                    alerttype={alerttype}
                />
                <ValidatorForm>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <AutoComplete
                                className="view-disabled"
                                fullWidth
                                defaultValue={getSelectedItem(
                                    formdata.dealerId,
                                    customeroptions
                                )}
                                options={customeroptions}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('dealerId', value)
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
                                        value={formdata.dealerId}
                                        name="dealerId"
                                    />
                                )}
                            />

                            <AutoComplete
                                className="view-disabled"
                                fullWidth
                                defaultValue={getSelectedItem(
                                    formdata.skuTypeId,
                                    sku_mastersoptions
                                )}
                                options={sku_mastersoptions}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('SKU', value)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Product Group"
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
                                className="required view-disabled"
                                id="remark"
                                label="Remark"
                                type="text"
                                fullWidth
                                name="remark"
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
                                className="view-disabled"
                                fullWidth
                                defaultValue={getSelectedItem(
                                    formdata.bm,
                                    BMoptions
                                )}
                                options={BMoptions}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('bm', value)
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
                                        value={formdata.bm}
                                        name="bm"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <AutoComplete
                                className="view-disabled"
                                fullWidth
                                defaultValue={getSelectedItem(
                                    formdata.yardId,
                                    yardsoptions
                                )}
                                options={yardsoptions}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('yardId', value)
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
                                        value={formdata.yardId}
                                        name="yardId"
                                    />
                                )}
                            />
                            <AutoComplete
                                className="view-disabled"
                                fullWidth
                                defaultValue={formdata.paymentTerms}
                                options={paymentoptions}
                                multiple
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('paymentterms', value)
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
                                        value={formdata.paymentterms}
                                        name="paymentterms"
                                    />
                                )}
                            />
                            <div className="datediv">
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        className="view-disabled"
                                        /*minDate={new Date()}*/
                                        minDate={todaydate.setDate(
                                            todaydate.getDate() + 1
                                        )}
                                        open={dateopen}
                                        onOpen={() => setdateOpen(true)}
                                        onClose={() => setdateOpen(false)}
                                        inputFormat="dd/MM/yyyy"
                                        value={formdata.expectedDeleveryDate}
                                        onChange={(e) => handleDateChange(e)}
                                        renderInput={(props) => (
                                            <TextField
                                                {...props}
                                                // variant="Outlined"
                                                className="required"
                                                id="mui-pickers-date"
                                                label="Expected Delevery Date"
                                                sx={{ mb: 2, width: '100%' }}
                                                name="joining_date"
                                                onClick={(e) =>
                                                    setdateOpen(true)
                                                }
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    className="required hidden view-disabled"
                                    type="hidden"
                                    name={formdata.typeOfDispatch}
                                    value="0"
                                />
                                <FormControlLabel
                                    className="view-disabled"
                                    control={<Checkbox />}
                                    label="Is Credit Required"
                                    name="iscreditRequired"
                                    checked={
                                        formdata.iscreditRequired !== '0' &&
                                        formdata.iscreditRequired
                                            ? true
                                            : false
                                    }
                                    onChange={(e) =>
                                        formdatavaluechange(e, 'checkbox')
                                    }
                                />
                            </div>
                        </Grid>
                    </Grid>
                    {/* <Button
                        className="orderadd"
                        variant="outlined"
                        color="primary"
                        onClick={addrow}
                    >
                        Add
                    </Button> */}
                    <div className="table_scroll">
                        <table className="table table-hover table-bordered display nowrap">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    {skuproperties.map(
                                        (skuproperties, index) => (
                                            <th>{skuproperties.label}</th>
                                        )
                                    )}
                                    {/* <th></th>
                                    <th>Stock check</th> */}
                                    <th>Qty pcs</th>
                                    <th>Qty mt</th>
                                    <th>rcp</th>
                                    <th>dp</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.map((orderDetails, index) => (
                                    <tr key={index}>
                                        {' '}
                                        <td>{index + 1}</td>
                                        {skuproperties.map(
                                            (skuproperties, indexinner) => (
                                                <td className="dropdowntd">
                                                    <AutoComplete
                                                        className="view-disabled"
                                                        defaultValue={getSelectedItem(
                                                            orderDetails
                                                                .properties[
                                                                indexinner
                                                            ].propertyValueId,
                                                            propertyoptions[
                                                                skuproperties
                                                                    .skuPropertiesMastersId
                                                            ]
                                                        )}
                                                        options={
                                                            propertyoptions[
                                                                skuproperties
                                                                    .skuPropertiesMastersId
                                                            ]
                                                        }
                                                        getOptionLabel={(
                                                            option
                                                        ) => option.label}
                                                        onChange={(
                                                            e,
                                                            value,
                                                            name,
                                                            type
                                                        ) =>
                                                            changeafterdropdownvalue(
                                                                e,
                                                                value,
                                                                'proptype_' +
                                                                    skuproperties.skuPropertiesMastersId,
                                                                'proptype'
                                                            )
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                className="required"
                                                                label={
                                                                    skuproperties.label
                                                                }
                                                                variant="outlined"
                                                                value={
                                                                    formdata
                                                                        .proptype[
                                                                        'proptype_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ] !==
                                                                    undefined
                                                                        ? formdata
                                                                              .proptype[
                                                                              'proptype_' +
                                                                                  skuproperties.skuPropertiesMastersId
                                                                          ]
                                                                        : ''
                                                                }
                                                                name={
                                                                    'proptype_' +
                                                                    skuproperties.skuPropertiesMastersId
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </td>
                                            )
                                        )}
                                        {/*<td className="addbtn">
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() =>
                                                    handleClickAdd(index)
                                                }
                                            >
                                                Add
                                            </Button>
                                            </td>
                                        <td>
                                            <TextField
                                                isEnable
                                                disabled={
                                                    formdata.isEnable[
                                                        'isEnable_' + index
                                                    ] !== 1
                                                        ? 'disabled'
                                                        : ''
                                                }
                                                className="required"
                                                id="stockcheck"
                                                label="stockcheck"
                                                type="text"
                                                fullWidth
                                                name={'stockcheck_' + index}
                                                value={
                                                    formdata.stockcheck[
                                                        'stockcheck_' + index
                                                    ] !== undefined
                                                        ? formdata.stockcheck[
                                                              'stockcheck_' +
                                                                  index
                                                          ]
                                                        : ''
                                                }
                                                onChange={(e) =>
                                                    orderchange(
                                                        e,
                                                        index,
                                                        'stockcheck'
                                                    )
                                                }
                                            />
                                            </td>*/}
                                        <td>
                                            <TextField
                                                className="required view-disabled"
                                                id="quantity_pcs"
                                                label="Qty pcs"
                                                type="text"
                                                fullWidth
                                                name={
                                                    'quantity_pcs_' +
                                                    orderDetails.skuId
                                                }
                                                value={
                                                    formdata.quantity_pcs[
                                                        'quantity_pcs_' +
                                                            orderDetails.skuId
                                                    ] !== undefined &&
                                                    formdata.quantity_pcs[
                                                        'quantity_pcs_' +
                                                            orderDetails.skuId
                                                    ]
                                                        ? formdata.quantity_pcs[
                                                              'quantity_pcs_' +
                                                                  orderDetails.skuId
                                                          ]
                                                        : orderDetails.quantity_pcs
                                                }
                                                onChange={(e) =>
                                                    orderchange(
                                                        e,
                                                        orderDetails.skuId,
                                                        'quantity_pcs'
                                                    )
                                                }
                                                validators={[
                                                    'required',
                                                    'isNumber',
                                                ]}
                                                errorMessages={[
                                                    'this field is required',
                                                    'Only Numbers allowed',
                                                ]}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                className="required view-disabled"
                                                id="quantity_mt"
                                                label="Qty mt"
                                                type="text"
                                                fullWidth
                                                name={
                                                    'quantity_mt_' +
                                                    orderDetails.skuId
                                                }
                                                value={
                                                    formdata.quantity_mt[
                                                        'quantity_mt_' +
                                                            orderDetails.skuId
                                                    ] !== undefined &&
                                                    formdata.quantity_mt[
                                                        'quantity_mt_' +
                                                            orderDetails.skuId
                                                    ]
                                                        ? formdata.quantity_mt[
                                                              'quantity_mt_' +
                                                                  orderDetails.skuId
                                                          ]
                                                        : orderDetails.quantity_mt
                                                }
                                                onChange={(e) =>
                                                    orderchange(
                                                        e,
                                                        orderDetails.skuId,
                                                        'quantity_mt'
                                                    )
                                                }
                                                validators={[
                                                    'required',
                                                    'isNumber',
                                                ]}
                                                errorMessages={[
                                                    'this field is required',
                                                    'Only Numbers allowed',
                                                ]}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                className="required view-disabled"
                                                id="rcp"
                                                label="rcp"
                                                type="text"
                                                fullWidth
                                                name={
                                                    'rcp_' + orderDetails.skuId
                                                }
                                                value={
                                                    formdata.rcp[
                                                        'rcp_' +
                                                            orderDetails.skuId
                                                    ] !== undefined
                                                        ? formdata.rcp[
                                                              'rcp_' +
                                                                  orderDetails.skuId
                                                          ]
                                                        : orderDetails.rcp
                                                }
                                                onChange={(e) =>
                                                    orderchange(
                                                        e,
                                                        orderDetails.skuId,
                                                        'rcp'
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
                                                className="required view-disabled orderstatusdp"
                                                style={{width:'unset'}}
                                                id="dp"
                                                label="dp"
                                                type="text"
                                                fullWidth
                                                name={
                                                    'dp_' + orderDetails.skuId
                                                }
                                                value={
                                                    formdata.dp[
                                                        'dp_' +
                                                            orderDetails.skuId
                                                    ] !== undefined
                                                        ? formdata.dp[
                                                              'dp_' +
                                                                  orderDetails.skuId
                                                          ]
                                                        : orderDetails.dp
                                                }
                                                onChange={(e) =>
                                                    orderchange(
                                                        e,
                                                        orderDetails.skuId,
                                                        'dp'
                                                    )
                                                }
                                                validators={['required']}
                                                errorMessages={[
                                                    'this field is required',
                                                ]}
                                            />
                                        </td>
                                        {/* <td>
                                            <IconButton
                                                onClick={(e) =>
                                                    handleClickDelete(index, e)
                                                }
                                            >
                                                <Icon color="error">
                                                    delete
                                                </Icon>
                                            </IconButton>
                                        </td> */}{' '}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="approve_reject">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() =>
                                handleClickappr_reject(orderid, 'Rejected')
                            }
                        >
                            Reject
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                                handleClickappr_reject(orderid, 'Approved')
                            }
                        >
                            Approve
                        </Button>
                    </div>
                </ValidatorForm>
                <Dialog
                    open={deleteopen}
                    disableBackdropClick
                    disableEscapeKeyDown
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {check_status == 'Approved'
                            ? 'Are You Sure Do You Want to Approve?'
                            : 'Are You Sure Do You Want to Reject ?'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description"></DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handledeleteClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handledeleteConfirm} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        )
    } else {
        return <></>
    }
}

export default AppTable
