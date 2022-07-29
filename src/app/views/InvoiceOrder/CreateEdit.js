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
    getFormControlUnstyledUtilityClasses,
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

// import {isAlphanumerical} from 'is-alphanumerical'
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
    const userdetails = useAuth()
    const LoginId = userdetails.user.id

    const [dateopen, setdateOpen] = React.useState(false)
    const [logdateOpen, setlogdateOpen] = React.useState(false)
    const [billdate, setBillDate] = React.useState(false)

    const navigate = useNavigate()
    const [sku_masters, setsku_masters] = useState([])
    // const [states,setstates]=useState(subscribarList)
    const model = 'states'
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)

    const [formdata, setFormData] = useState({
        isActice: 1,
        skuids: [],
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
        bill_no: '',
        billdate: null,
        file: [],
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
        // getBM()
        getdatatable()
        getviewOrder()
        getTransportDetails()
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

    const getBM = async (customer_id = '') => {
        var query = ''
        const response = await postDataFromApi(
            'order/getBM/' + customer_id,
            query
        )
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

    const getTransportDetails = async () => {
        const response = await postDataFromApi(
            'invoice/invoiceForm/transportDetailsByOrderId/' + orderid
        )
        if (response && response.data.code && response.data.data != null) {
            var transportdetails = response.data.data[0]
            setFormData((formData) => ({
                ...formData,
                ['transporterName']: transportdetails.transporterName,
                ['driverMobile']: transportdetails.driverMobile,
                ['driver_name']: transportdetails.driverName,
                ['vehical_number']: transportdetails.vehicalNumber,
                ['licenseNumber']: transportdetails.licenseNumber,
                ['doc_no']: transportdetails.doc,
                ['transporter_id']: transportdetails.transporterId,
                ['distance']: transportdetails.distance,
                ['transport_date']: transportdetails.date,
            }))
        }
    }

    const getdatatable = async () => {
        $(document).ready(function () {
            setTimeout(function () {
                $('#customdatatable').DataTable()
            }, 1000)
        })
    }

    const handleDateChange = (date, type = '') => {
        // setClearedDate(date)
        console.log('type', date)
        setFormData((formData) => ({
            ...formData,
            [type]: date,
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
        navigate('/dashboard/default')
    }
    function cancelled() {}
    const handleSubmit = async (e) => {
        e.preventDefault()
        const momentdate = moment(formdata.billdate)
        var newdate = momentdate.format('Y-MM-DD')
        var newformdata = {
            orderId: orderid,
            date: newdate,
            attach_bill:
                formdata.file && formdata.file['file_0'] != 'undefined'
                    ? formdata.file['file_0']
                    : '',
            bill_no: formdata.bill_no,
            createdBy: LoginId,
            remark: formdata.remark,
        }

        var response = ''

        response = await postDataFromApi(
            'invoice/invoiceForm/createInvoiceForm',
            newformdata
        )

        console.log('edit response', response)
        if (response.data.code) {
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
                getBM(ord.dealerId)
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
                    setFormData((formData) => ({
                        ...formData,
                        rcparr: rcparr,
                        dparr: dparr,
                        // proptypearr,
                        quantity_pcsarr: quantity_pcsarr,
                        quantity_mtarr: quantity_mtarr,
                    }))
                    // setFormData((formData) => ({
                    //     ...formData,
                    //     ['quantity_pcs']: quantity_pcsarr,
                    //     ['quantity_mt']: quantity_mtarr,
                    //     ['proptype']: proptypearr,
                    //     ['rcp']: rcparr,
                    //     ['dp']: dparr,
                    // }))
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
                        ['SKU']: ord.skuTypeId,
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
                        // ['quantity_pcs']: quantity_pcsarr,
                        // ['quantity_mt']: quantity_mtarr,
                        // ['proptype']: proptypearr,
                        // ['rcp']: rcparr,
                        // ['dp']: dparr,
                        ['paymentTerms']: paymentoptsarr,
                        ['paymentterms']: paymentoptsarr,
                    }))

                    getskuproperties(ord.skuTypeId)
                    setTimeout(function () {
                        setIsLoaded(true)
                    }, 500)
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

    const handleClickAdd = async (id) => {
        var chkproperty = []
        var proparr = Object.keys(formdata.proptype)
        console.log(proparr)
        proparr.map((prop, i) => {
            var sp = prop.split('_')
            if (sp[2] == id) {
                var property = {
                    property_id: sp[1],
                    value: formdata.proptype[prop],
                }
                chkproperty.push(property)
            }
        })
        console.log('formdata.prop', chkproperty)
        var stockchkarr = {
            yardId: formdata.yardId,
            skuTypeId: formdata.SKU,
            properties: chkproperty,
        }
        console.log('stockchkarr', stockchkarr)
        var response = ''
        response = await postDataFromApi('order/checkStockDetails', stockchkarr)
        console.log('edit response', response)
        //var stockchkarr=stockcheck['stockcheck_'+id]
        if (response.data.code) {
            var newskuid = response.data.data.skuId
            var newstock = response.data.data.stock
            // setalermessage(response.data.message)
            // setalert(true)
            // setalerttype('success')
            var allskuids = formdata.skuids
            var allstock = formdata.stockcheck
            allskuids['skuids_' + id] = newskuid
            allstock['stockcheck_' + id] = newstock
            setFormData((formData) => ({
                ...formData,
                skuids: allskuids,
                stockcheck: allstock,
            }))
        } else {
            // setOpen(false)
            // setalermessage(response.data.message)
            // setalert(true)
            // setalerttype('error')
        }
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

    const filechange = (event, index) => {
        let files = event.target.files
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        var imgurl = URL.createObjectURL(event.target.files[0])
        console.log(imgurl)

        // var images = formdata.imgPreview
        // images['imgPreview_' + index] = imgurl

        // setFormData((formData) => ({
        //     ...formData,
        //     imgPreview: images,
        // }))

        var selectedFile = ''
        reader.onload = (e) => {
            selectedFile = e.target.result
            var values = formdata['file']
            console.log(event.target.name)
            console.log(selectedFile)
            values[event.target.name] = selectedFile
            console.log(values)
        }
    }
    const switchStyles = useN01SwitchStyles()
    if (isLoaded) {
        console.log('all formData', formdata)
        return (
            <Container>
                <div className="breadcrumb leftalign_breadcrumb">
                    <Breadcrumb routeSegments={[{ name: 'Invoice Order' }]} />
                </div>
                <Button
                    className="rightalign_btn"
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/CreateInvoice')}
                >
                    Back to Invoice
                </Button>
                <AlertMessage
                    alert={alert}
                    alermessage={alermessage}
                    confirm={confirm}
                    alerttype={alerttype}
                />
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
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
                                fullWidth
                                className="view-disabled"
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
                                validators={['required']}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                                multiline
                                rows={3}
                            />
                            <AutoComplete
                                fullWidth
                                className="view-disabled"
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
                                fullWidth
                                className="view-disabled"
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
                                fullWidth
                                className="view-disabled"
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
                                        // minDate={todaydate.setDate(
                                        //     todaydate.getDate() + 1
                                        // )}
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
                                                className="required view-disabled"
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
                                    label="Is creditRequired"
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
                                    {/*<th>Action</th> */}
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
                                                                    skuproperties.skuPropertiesMastersId +
                                                                    '_' +
                                                                    index,
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
                                                                            skuproperties.skuPropertiesMastersId +
                                                                            '_' +
                                                                            index
                                                                    ] !==
                                                                    undefined
                                                                        ? formdata
                                                                              .proptype[
                                                                              'proptype_' +
                                                                                  skuproperties.skuPropertiesMastersId +
                                                                                  '_' +
                                                                                  index
                                                                          ]
                                                                        : ''
                                                                }
                                                                name={
                                                                    'proptype_' +
                                                                    skuproperties.skuPropertiesMastersId +
                                                                    '_' +
                                                                    index
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </td>
                                            )
                                        )}
                                        {/* <td className="addbtn">
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() =>
                                                    handleClickAdd(index)
                                                }
                                            >
                                                Checkstock
                                            </Button>
                                        </td> */}
                                        {/* <td>
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
                                        </td> */}
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
                                                    // 'isNumber',
                                                ]}
                                                errorMessages={[
                                                    'this field is required',
                                                    'Only Numbers allowed',
                                                ]}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                className="required"
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
                                            </td>*/}{' '}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="dash_title">Transporter Details</div>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                className="required"
                                id="transporterName"
                                label="Transporter name"
                                type="text"
                                fullWidth
                                name="transporterName"
                                value={formdata.transporterName || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                validators={['required']}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />

                            <TextField
                                className="required"
                                id="driver_name"
                                label="Driver Name"
                                type="text"
                                fullWidth
                                name="driver_name"
                                value={formdata.driver_name || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                validators={[
                                    'required',
                                    'matchRegexp:^[A-Z a-z]*$',
                                ]}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />

                            <TextField
                                className="required"
                                id="driverMobile"
                                label="Driver mobile"
                                type="text"
                                fullWidth
                                name="driverMobile"
                                value={formdata.driverMobile || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                validators={[
                                    'required',
                                    'matchRegexp:^[0-9]{10}$',
                                ]}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />
                            <TextField
                                className="required"
                                id="vehical_number"
                                label="Vehicle Number"
                                type="text"
                                fullWidth
                                name="vehical_number"
                                value={formdata.vehical_number || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                validators={[
                                    'required',
                                    'matchRegexp:^[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{4}$',
                                ]}
                                errorMessages={[
                                    'this field is required',
                                    'Only Alphanumerics allowed',
                                ]}
                            />

                            <TextField
                                className="required"
                                id="licenseNumber"
                                label="license number"
                                type="text"
                                fullWidth
                                name="licenseNumber"
                                value={formdata.licenseNumber || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                // validators={['required','matchRegexp:^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$']}
                                // validators={['required','matchRegexp:^(([A-Za-z]{2}[0-9]{2})(-)|([A-Za-z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{12}$']}
                                inputProps={{ maxLength: 20 }}
                                validators={['required']}
                                errorMessages={[
                                    'this field is required',
                                    // 'Only Characters allowed',
                                ]}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                // className="required"
                                id="doc_no"
                                label="Doc/Landing/RR/Airway No"
                                type="text"
                                fullWidth
                                name="doc_no"
                                value={formdata.doc_no || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                // validators={['required']}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />

                            <TextField
                                // className="required"
                                id="transporter_id"
                                label="Transporter ID"
                                type="text"
                                fullWidth
                                name="transporter_id"
                                value={formdata.transporter_id || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                // validators={['required', 'isNumber']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                className="required"
                                id="distance"
                                label="Distance"
                                type="text"
                                fullWidth
                                name="distance"
                                value={formdata.distance || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                validators={['required']}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    /*minDate={new Date()}*/
                                    minDate={todaydate.setDate(
                                        todaydate.getDate() + 1
                                    )}
                                    open={logdateOpen}
                                    onOpen={() => setlogdateOpen(true)}
                                    onClose={() => setlogdateOpen(false)}
                                    inputFormat="dd/MM/yyyy"
                                    value={
                                        formdata.transport_date
                                            ? formdata.transport_date
                                            : null
                                    }
                                    onChange={(e, name) =>
                                        handleDateChange(e, 'transport_date')
                                    }
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            // variant="Outlined"
                                            className="required"
                                            id="mui-pickers-date"
                                            label="Expected Delevery Date"
                                            sx={{ mb: 2, width: '100%' }}
                                            name="transport_date"
                                            validators={['required']}
                                            value={
                                                formdata.transport_date
                                                    ? formdata.transport_date
                                                    : null
                                            }
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                            onClick={(e) =>
                                                setlogdateOpen(true)
                                            }
                                            // required
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            <TextField
                                className="required"
                                id="file"
                                type="file"
                                fullWidth
                                name={'file_0'}
                                onChange={(e) => filechange(e, 0)}
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                className="required"
                                id="bill_no"
                                label="Bill No"
                                type="text"
                                fullWidth
                                name="bill_no"
                                value={formdata.bill_no || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    open={billdate}
                                    onOpen={() => setBillDate(true)}
                                    onClose={() => setBillDate(false)}
                                    inputFormat="dd/MM/yyyy"
                                    value={formdata.billdate}
                                    onChange={(e) =>
                                        handleDateChange(e, 'billdate')
                                    }
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            // variant="Outlined"
                                            className="required"
                                            id="mui-pickers-date"
                                            label="Bill Date"
                                            sx={{ mb: 2, width: '100%' }}
                                            name="billdate"
                                            onClick={(e) => setBillDate(true)}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    {/* <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                className="required"
                                id="vehical_name"
                                label="Vehicle Name"
                                type="text"
                                fullWidth
                                name="vehical_name"
                                value={formdata.vehical_name || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />
                            <TextField
                                className="required"
                                id="vehical_model"
                                label="Model"
                                type="text"
                                fullWidth
                                name="vehical_model"
                                value={formdata.vehical_model || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />
                            <TextField
                                className="required"
                                id="driver_name"
                                label="Driver Name"
                                type="text"
                                fullWidth
                                name="driver_name"
                                value={formdata.driver_name || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />
                            <TextField
                                className="required"
                                id="vehical_number"
                                label="Vehicle Number"
                                type="text"
                                fullWidth
                                name="vehical_number"
                                value={formdata.vehical_number || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                validators={['required' ,'matchRegexp:^[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{4}$']}
                                // validators={['required' ,'matchRegexp:^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$']}
                                // validators={['required', 'matchRegexp:^[a-zA-Z0-9]+$']}
                                // validators={['required','isAlphanumerical']}
                                // validators={['required','matchRegexp:^[ A-Za-z0-9_@./#&+-]*$']}
                                // validators={[ 'required','matchRegexp:^[a-zA-Z0-9]*$']}
                                // validators={['required' ,'minNumber:0', 'maxNumber:255', 'matchRegexp:^[0-9]$']}
                                errorMessages={[
                                    'this field is required',
                                    'Only Alphanumerics allowed',
                                ]}
                            />
                            <TextField
                                className="required"
                                id="doc_no"
                                label="Doc/Landing/RR/Airway No"
                                type="text"
                                fullWidth
                                name="doc_no"
                                value={formdata.doc_no || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                className="required"
                                id="distance"
                                label="Distance"
                                type="text"
                                fullWidth
                                name="distance"
                                value={formdata.distance || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />
                            <TextField
                                className="required"
                                id="transporter_id"
                                label="Transporter ID"
                                type="text"
                                fullWidth
                                name="transporter_id"
                                value={formdata.transporter_id || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                className="required"
                                id="vehical_type"
                                label="Vehicle Type"
                                type="text"
                                fullWidth
                                name="vehical_type"
                                value={formdata.vehical_type || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                errorMessages={[
                                    'this field is required',
                                    'Only Characters allowed',
                                ]}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    minDate={todaydate.setDate(
                                        todaydate.getDate() + 1
                                    )}
                                    open={logdateOpen}
                                    onOpen={() => setlogdateOpen(true)}
                                    onClose={() => setlogdateOpen(false)}
                                    inputFormat="dd/MM/yyyy"
                                    value={formdata.transport_date}
                                    onChange={(e) =>
                                        handleDateChange(e, 'transport_date')
                                    }
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            // variant="Outlined"
                                            className="required"
                                            id="mui-pickers-date"
                                            label="Expected Delevery Date"
                                            sx={{ mb: 2, width: '100%' }}
                                            name="transport_date"
                                            onClick={(e) =>
                                                setlogdateOpen(true)
                                            }
                                        />
                                    )}
                                />
                            </LocalizationProvider>

                            <TextField
                                className="required"
                                id="file"
                                type="file"
                                fullWidth
                                name={'file_0'}
                                onChange={(e) => filechange(e, 0)}
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                className="required"
                                id="bill_no"
                                label="Bill No"
                                type="text"
                                fullWidth
                                name="bill_no"
                                value={formdata.bill_no || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    open={billdate}
                                    onOpen={() => setBillDate(true)}
                                    onClose={() => setBillDate(false)}
                                    inputFormat="dd/MM/yyyy"
                                    value={formdata.billdate}
                                    onChange={(e) =>
                                        handleDateChange(e, 'billdate')
                                    }
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            // variant="Outlined"
                                            className="required"
                                            id="mui-pickers-date"
                                            label="Bill Date"
                                            sx={{ mb: 2, width: '100%' }}
                                            name="billdate"
                                            onClick={(e) => setBillDate(true)}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid> */}
                    <div className="approve_reject">
                        <Button
                            variant="outlined"
                            type="submit"
                            color="primary"
                        >
                            Save
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
                        {'Are You Sure You Want to Change Status?'}
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
