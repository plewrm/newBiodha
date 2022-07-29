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
import useAuth from 'app/hooks/useAuth'
import { useLocation } from 'react-router-dom';
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

const orderList = [
    {
        id: '1',
        fromYard: 'test',
        Yard: 'test',
        productGroup: '11',
    },
    {
        id: '2',
        fromYard: 'test',
        Yard: 'test',
        productGroup: '112',
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

const tableData = [
    {
        id: 1,
        stockcheck: '23',
        qtypcs: 325,
        qtymt: 325,
        RCP: 225,
        DP: 23,
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
    const [viewOrder, setviewOrder] = useState([])
    const [orderDetails, setorderDetails] = useState([])
    const [propertyLabels, setpropertyLabels] = useState([])

    const userdetails = useAuth()
    const LoginId = userdetails.user.id
    const [dateopen, setdateOpen] = React.useState(false)

    const navigate = useNavigate()
    const [sku_masters, setsku_masters] = useState([])
    // const [states,setstates]=useState(subscribarList)
    const model = 'states'
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)
    const location = useLocation();
    const [formdata, setFormData] = useState({
        isActice: 1,
        skuids: [],
        stockcheck: [],
        qtypcs: [],
        qtymt: [],
        RCP: [],
        DP: [],
        weightPerPiece: [],
        proptype: [],
        isEnable: 0,
        iscreditRequired: 0,
        typeOfDispatch: '0',
        remark: '',
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
    const [redirectorder, setredirectorder] = useState(false)
    const [is_edit_loaded, set_is_edit_loaded] = useState(false)
    const [checkorderEdit,setcheckorderEdit]=useState(false)

    const [statuschange, setstatuschange] = useState(false)
    const [order_id, setorder_id] = useState('')
    const [check_status, setcheck_status] = useState('')
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
            console.log(response.data.message)
            getsku_masters()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
        } else {
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    const getviewOrder = async () => {
        const response = await getDataFromApi('invoice/intergodownTransfer/getIntergodownTransferDataById/'+orderid)
        console.log('order detail', response)
        if (response && response.data.code && response.data.data != null) {
            setviewOrder(response.data.data)

            
            // setorderDetails(response.data.data[0].orderDetails)
            setpropertyLabels(response.data.data[0].propertyLabels)

            // const paymentTerms = response.data.data[0].paymentTerms
            //     .map(({ paymentTerms }) => paymentTerms)
            //     .join(', ')

            // setpayment_terms(paymentTerms)//new****

            if (orderid) {
                orderDetails.map((orderDetails, i) => {
                    /* 'skuId':formdata.skuids['skuids_'+i],
                    'stock_check':formdata.stockcheck['stockcheck_'+i],
                    'quantity_pcs':formdata.qtypcs['qtypcs_'+i],
                    'quantity_mt':formdata.qtymt['qtymt_'+i],
                    'rcp':formdata.RCP['RCP_'+i],
                    'dp':formdata.DP['DP_'+i] */
                    // rcparr=[]
                    // rcparr['rcp'+i]=orderDetails.rcp;
                    // /* allstock['stockcheck_'+i]=orderDetails */
                    // setFormData((formData) => ({
                    //     ...formData,
                    //     skuids:allskuids,
                    //     stockcheck:allstock
                    // }));
                })

                var ord = response.data.data[0]
                setClearedDate(ord.expectedDeleveryDate)
                const momentdate = moment(ord.delivaryDate)
                var newdate = momentdate.format('Y-MM-DD')
                setFormData((formData) => ({
                    ...formData,
                    
                    fromYard: ord.fromYard,
                    toYard: ord.toYard,
                    productGroup: ord.productGroup,
                    remark:ord.remark,
                    delivaryDate: newdate
                    // ['dealerId']: ord.dealerId,
                    // ['skuTypeId']: ord.skuTypeId,
                    // ['iscreditRequired']: ord.iscreditRequired,
                    // ['expectedDeleveryDate']: ord.expectedDeleveryDate,
                    // ['typeOfDispatch']: ord.typeOfDispatch,
                    // ['yardId']: ord.yardId,
                    // ['status']: ord.status,
                    // ['statusForSystem']: ord.statusForSystem,
                    // ['isDependent']: ord.isDependent,
                    // ['remark']: ord.remark,
                    // ['bm']: ord.bm,
                    // ['updatedAt']: ord.updatedAt,
                    // ['updatedBy']: ord.updatedBy,
                    // ['createdAt']: ord.createdAt,
                    // ['createdBy']: ord.createdBy,
                    // ['delear']: ord.delear,
                    // ['nameOfYard']: ord.nameOfYard,
                    // ['skuTypeName']: ord.skuTypeName,
                }))
                setTimeout(() => {
                    set_is_edit_loaded(true)
                }, 500)
            }
        }
    }

    

    useEffect(() => {
        getcheckEdit();
        getSelectedItem()
        getsku_masters()
        getcustomer_masters()
        // getpayment_terms()//new***
        getyards()
        // getBM()
        getdatatable()

        if (orderid) {
            getviewOrder()
        } else {
            set_is_edit_loaded(true)
        }
    }, [])
    const getcheckEdit = async () =>{
        console.log('path',location.pathname)
        console.log('pathex','/IntergodownTransferadd/bm-approve/'+orderid)
        if(location.pathname=='/IntergodownTransferadd/bm-approve/'+orderid){
            setcheckorderEdit(true) 
        }
        
    
    }

    const getcustomer_masters = async () => {
        var query = 'model=customer_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setcustomer_masters(response.data.data)
            var customeropts = []
            response.data.data.map((customer_masters, i) => {
                var st = []
                st['id'] = customer_masters.id
                st['label'] = customer_masters.firmName
                customeropts.push(st)
            })
            setcustomeroptions(customeropts)
            console.log('customer master data', response)
        }
    }

    // const getpayment_terms = async () => {
    //     var query = 'model=payment_terms'
    //     const response = await postDataFromApi(
    //         'masters/allMasters/findActiveAll',
    //         query
    //     )
    //     if (response && response.data.code && response.data.data != null) {
    //         setpayment_terms(response.data.data)
    //         var paymentopts = []
    //         response.data.data.map((payment_terms, i) => {
    //             var pm = []
    //             pm['id'] = payment_terms.id
    //             pm['label'] = payment_terms.paymentTerms
    //             paymentopts.push(pm)
    //         })
    //         setpaymentoptions(paymentopts)
    //         console.log('payment data', response)
    //     }
    // }// new***

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

    // const getBM = async () => {
    //     var query = ''
    //     const response = await getDataFromApi('order/getBM', query)
    //     if (response && response.data.code && response.data.data != null) {
    //         setBM(response.data.data)
    //         var BMopts = []
    //         response.data.data.map((BM, i) => {
    //             var bm = []
    //             bm['id'] = BM.id
    //             bm['label'] = BM.fullName
    //             BMopts.push(bm)
    //         })
    //         setBMoptions(BMopts)
    //         console.log('BM data', response)
    //     }
    // }

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
                //$('#customdatatable').DataTable();
                $('#customdatatable').DataTable({
                    scrollX: true,
                })
            }, 1000)
        })
    }

    const handleDateChange = (delivaryDate) => {
        setClearedDate(delivaryDate)
        setFormData((formData) => ({
            ...formData,
            delivaryDate,
        }))

        /*  setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        })) */
    }

    function setdefaultvalue() {
        setFormData({
            fromYard: [],
            isActice: 1,
            iscreditRequired: 0,
            typeOfDispatch: '0',
            skuids: [],
        })
    }
    function handleClickOpen() {
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

    function handleClickEdit() {
        setIsEdit(true)
        setOpen(true)
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
        if (redirectUrl) {
            navigate(redirectUrl)
        }
        setalert(false)
    }
    function cancelled() {}
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(formdata)
        var orderDetails = []
        var proptypedetail = []
        var isvalidorder = true
        rows.map((list, i) => {
            // alert('hi')
            console.log(
                "formdata.skuids['skuids_'+i]",
                formdata.skuids['skuids_' + i]
            )
            console.log(
                " formdata.stockcheck['stockcheck_'+i",
                formdata.stockcheck['stockcheck_' + i]
            )
            console.log(
                " formdata.qtypcs['qtypcs_'+i]",
                formdata.qtypcs['qtypcs_' + i]
            )
            if (formdata.skuids['skuids_' + i] == '-1') {
                isvalidorder = false
            }
            if (
                formdata.stockcheck['stockcheck_' + i] <
                formdata.qtypcs['qtypcs_' + i]
            ) {
                isvalidorder = false
            }

            var data = {
                skuId: formdata.skuids['skuids_' + i],
                stock_check: formdata.stockcheck['stockcheck_' + i],
                quantity_pcs: formdata.qtypcs['qtypcs_' + i],
                quantity_mt: formdata.qtymt['qtymt_' + i],
                rcp: formdata.RCP['RCP_' + i],
                dp: formdata.DP['DP_' + i],
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
        if (!isvalidorder) {
            setOpen(false)
            setalermessage('Please Enter Valid Qty')
            setalert(true)
            setalerttype('error')
            return false
        }
        // return false
        //var newdate =  Moment((formdata.date.format('Y-m-d'))
        const momentdate = moment(formdata.delivaryDate)
        var newdate = momentdate.format('Y-MM-DD')
        var newformdata = {
            fromYard: formdata.fromYard,
            toYard: formdata.toYard,
            productGroup: formdata.productGroup,
            remark:formdata.remark,
            delivaryDate: newdate
            // dealerId: formdata.fromYard,
            // skuTypeId: formdata.SKU,
            // yardId: formdata.toYard,
            // payment_terms: formdata.paymentterms,
            // remark: formdata.remark,
            // expectedDeleveryDate: newdate,
            // bm: formdata.BM,
            // typeOfDispatch: formdata.typeOfDispatch,
            // iscreditRequired: formdata.iscreditRequired,
            // createdBy: LoginId,
            // orderDetails: orderDetails,
           
        }

        console.log(newformdata)
        var response = ''
        if (orderid) {
            response = await putDataFromApi(
                'invoice/intergodownTransfer/updateIntergodownTransferForm/' + orderid,
                formdata
            )
        } else {
            response = await postDataFromApi(
                'invoice/intergodownTransfer/createIntergodownTransfer',
                formdata
            )
        }
        // var response = ''
        // if (orderid) {
        //     getviewOrder()
        // } else {
        //     set_is_edit_loaded(true)
        // }

        // response = await postDataFromApi('invoice/intergodownTransfer/createIntergodownTransfer', newformdata)

        console.log('edit response', response)
        if (response.data.code) {
            getsku_masters()
            setIsEdit(false)
            setEditId('')
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            setredirectorder(true)
            setRedirectUrl('/IntergodownTransfer')
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
            if (type == 'productGroup') {
                getskuproperties(e.id)
            }
        } else {
            getskuproperties()
        }
    }

    const orderchange = (e, index, type) => {
        var values = formdata[type]
        values[e.target.name] = e.target.value
        if (type == 'qtypcs') {
            // var amt=10
            var amt =
                formdata.weightPerPiece['weightPerPrice_' + index] !==
                    undefined &&
                formdata.weightPerPiece['weightPerPrice_' + index]!==""
                    ? formdata.weightPerPiece['weightPerPrice_' + index]
                    : 0
            console.log(
                'weightPerPiece',
                formdata.weightPerPiece['weightPerPrice_' + index]
            )
            var amount = formdata['qtymt']
            var newamount = amt * e.target.value
            amount['qtymt_' + index] = newamount ? newamount.toFixed(4): newamount
            setFormData((formData) => ({
                ...formData,
                values,
                amount,
            }))
        } else {
            setFormData((formData) => ({
                ...formData,
                values,
            }))
        }
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
                qtypcs: [],
                qtymt: [],
                RCP: [],
                DP: [],
                proptype: [],
            }))
        }
    }

    function addrow() {
        getrows()
    }

    const getrows = async () => {
        if (is_skuselected) {
            setrows([
                ...rows,
                { stockcheck: 1, qtypcs: 44, qtymt: 55, RCP: 555, DP: 87 },
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
        var stockchkarr = {
            yardId: formdata.toYard,
            skuTypeId: formdata.productGroup,
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
            var dpprice = response.data.data.priceOfSKU
            var weightPerPiece = response.data.data.weightPerPiece
            // setalermessage(response.data.message)
            // setalert(true)
            // setalerttype('success')
            var allskuids = formdata.skuids
            var allstock = formdata.stockcheck
            var allDP = formdata.DP
            var allweightPerPiece = formdata.weightPerPiece
            allskuids['skuids_' + id] = newskuid
            allstock['stockcheck_' + id] = newstock
            allDP['DP_' + id] = dpprice
            allweightPerPiece['weightPerPrice_' + id] = weightPerPiece
            allstock['skumaster_' + id] =
                response.data.records && response.data.records[0]
                    ? response.data.records[0].SKUName
                    : ''
            setFormData((formData) => ({
                ...formData,
                skuids: allskuids,
                stockcheck: allstock,
                DP: allDP,
                weightPerPiece: allweightPerPiece,
            }))
        } else {
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    function getSelectedItem(id, data = [], label = '', multiple = '') {
        console.log('mainoptiondata', data)
        const item = data.find((opt) => {
            if (label) {
                if (opt.label == id) return opt
            } else {
                if (opt.id == id) return opt
            }
        })
        console.log('item', item)
        if (multiple) {
            return item || []
        } else {
            return item || null
        }
    }
    const handleClickappr_reject = async (id, status) => {
        setDeleteOpen(true)
        setorder_id(id)
        setcheck_status(status)
    }
    const handleConfirm = async () => {
        setDeleteOpen(false)
        if (order_id) {
            var newformdata = {
                skuId:formdata.productGroup,
                fromYard :formdata.fromYard,
                toYard :formdata.toYard,
                isApproved:check_status == 'Approved' ? 1 : 0
            }
            var response = ''

            response = await putDataFromApi('/invoice/intergodownTransfer/approveOrRejectIntergodownTransfer/'+orderid,
                newformdata
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

    const switchStyles = useN01SwitchStyles()
    return is_edit_loaded ? (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: orderid ? 'Intergodown Transfer ' : 'Intergodown Transfer ' },
                    ]}
                />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/IntergodownTransfer')}
            >
                Back to Intergodown Transfer
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
                            fullWidth
                           defaultValue={getSelectedItem(
                                        formdata.fromYard,
                                        yardsoptions
                                    )}//new
                            options={yardsoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('fromYard', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="From Yard"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.fromYard}
                                    name="fromYard"
                                />
                            )}
                        />
                        <AutoComplete
                            fullWidth
                           defaultValue={getSelectedItem(
                                        formdata.productGroup,
                                        sku_mastersoptions
                                    )}//new
                            options={sku_mastersoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('productGroup', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Product Group"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.productGroup}
                                    name="productGroup"
                                />
                            )}
                        />
                        <TextField
                        
                            className="required"
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
                        
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <AutoComplete
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.toYard,
                                yardsoptions
                            )}
                            options={yardsoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('toYard', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="To Yard"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.toYard}
                                    name="toYard"
                                />
                            )}
                        />
                        
                        <div className="datediv">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    /*minDate={new Date()}*/
                                    minDate={todaydate.setDate(
                                        todaydate.getDate() 
                                    )}
                                    open={dateopen}
                                    onOpen={() => setdateOpen(true)}
                                    onClose={() => setdateOpen(false)}
                                    inputFormat="dd/MM/yyyy"
                                    value={clearedDate}
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
                                            onClick={(e) => setdateOpen(true)}
                                            value={clearedDate}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            <TextField
                                className="required hidden"
                                type="hidden"
                                name={formdata.typeOfDispatch}
                                value="0"
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
                </Button>
                <div className="table_scroll">
                    <table className="table table-hover table-bordered display nowrap">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                {skuproperties.map((skuproperties, index) => (
                                    <th>{skuproperties.label}</th>
                                ))}
                                <th></th>
                                <th>SKU Master</th>
                                <th>Stock check</th>
                                <th>Qty pcs</th>
                                <th>Qty mt</th>
                                <th>RCP</th>
                                <th>DP</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((orderDetails, index) => (
                                <tr key={index}>
                                    {' '}
                                    <td>{index + 1}</td>
                                    <td>
                                        <TextField
                                            className="required"
                                            id="qtypcs"
                                            label="Qty pcs"
                                            type="text"
                                            fullWidth
                                            name={'qtypcs_' + index}
                                            value={
                                                formdata.qtypcs[
                                                    'qtypcs_' + index
                                                ] !== undefined
                                                    ? formdata.qtypcs[
                                                          'qtypcs_' + index
                                                      ]
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                orderchange(e, index, 'qtypcs')
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
                                            className="required"
                                            id="qtymt"
                                            disabled
                                            label="Qty mt"
                                            type="text"
                                            fullWidth
                                            name={'qtymt_' + index}
                                            value={
                                                formdata.qtymt[
                                                    'qtymt_' + index
                                                ] !== undefined
                                                    ? formdata.qtymt[
                                                          'qtymt_' + index
                                                      ]
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                orderchange(e, index, 'qtymt')
                                            }
                                            validators={[
                                                'required',
                                                'matchRegexp:^[0-9]+([.][0-9]+)?$',
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
                                            id="RCP"
                                            label="RCP"
                                            type="text"
                                            fullWidth
                                            name={'RCP_' + index}
                                            value={
                                                formdata.RCP['RCP_' + index] !==
                                                undefined
                                                    ? formdata.RCP[
                                                          'RCP_' + index
                                                      ]
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                orderchange(e, index, 'RCP')
                                            }
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            disabled={'disabled'}
                                            className="required"
                                            id="DP"
                                            label="DP"
                                            type="text"
                                            fullWidth
                                            name={'DP_' + index}
                                            value={
                                                formdata.DP['DP_' + index] !==
                                                undefined
                                                    ? formdata.DP['DP_' + index]
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                orderchange(e, index, 'DP')
                                            }
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </td>
                                </tr>
                            ))}
                            {rows.map((rows, index) => (
                                <tr key={index}>
                                    {' '}
                                    <td>{orderDetails.length + index + 1}</td>
                                    {skuproperties.map(
                                        (skuproperties, indexinner) => (
                                            <td className="dropdowntd">
                                                <AutoComplete
                                                    options={
                                                        propertyoptions[
                                                            skuproperties
                                                                .skuPropertiesMastersId
                                                        ]
                                                    }
                                                    getOptionLabel={(option) =>
                                                        option.label
                                                    }
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
                                                    renderInput={(params) => (
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
                                                                ] !== undefined
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
                                    <td className="addbtn">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() =>
                                                handleClickAdd(index)
                                            }
                                        >
                                            Checkstock
                                        </Button>
                                    </td>
                                    <td>
                                        {formdata.stockcheck[
                                            'skumaster_' + index
                                        ] !== undefined
                                            ? formdata.stockcheck[
                                                  'skumaster_' + index
                                              ]
                                            : ''}
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
                                            className={
                                                formdata.stockcheck[
                                                    'stockcheck_' + index
                                                ] !== undefined &&
                                                formdata.stockcheck[
                                                    'stockcheck_' + index
                                                ] == 0
                                                    ? 'required required-border'
                                                    : 'required'
                                            }
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
                                                          'stockcheck_' + index
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
                                    </td>
                                    <td>
                                        <TextField
                                            disabled={
                                                formdata.weightPerPiece[
                                                    'weightPerPrice_' + index
                                                ] == undefined
                                                    ? 'disabled'
                                                    : ''
                                            }
                                            className="required"
                                            id="qtypcs"
                                            label={'Qty pcs'}
                                            type="text"
                                            fullWidth
                                            name={'qtypcs_' + index}
                                            value={
                                                formdata.qtypcs[
                                                    'qtypcs_' + index
                                                ] !== undefined
                                                    ? formdata.qtypcs[
                                                          'qtypcs_' + index
                                                      ]
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                orderchange(e, index, 'qtypcs')
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
                                            className="required"
                                            id="qtymt"
                                            disabled
                                            label="Qty mt"
                                            type="text"
                                            fullWidth
                                            name={'qtymt_' + index}
                                            value={
                                                formdata.qtymt[
                                                    'qtymt_' + index
                                                ] !== undefined
                                                    ? formdata.qtymt[
                                                          'qtymt_' + index
                                                      ]
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                orderchange(e, index, 'qtymt')
                                            }
                                            validators={[
                                                'required',
                                                'matchRegexp:^[0-9]+([.][0-9]+)?$',
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
                                            id="RCP"
                                            label="RCP"
                                            type="text"
                                            fullWidth
                                            name={'RCP_' + index}
                                            value={
                                                formdata.RCP['RCP_' + index] !==
                                                undefined
                                                    ? formdata.RCP[
                                                          'RCP_' + index
                                                      ]
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                orderchange(e, index, 'RCP')
                                            }
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            disabled
                                            className="required"
                                            id="DP"
                                            label="DP"
                                            type="text"
                                            fullWidth
                                            name={'DP_' + index}
                                            value={
                                                formdata.DP['DP_' + index] !==
                                                undefined
                                                    ? formdata.DP['DP_' + index]
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                orderchange(e, index, 'DP')
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
                                                handleClickDelete(index, e)
                                            }
                                        >
                                            <Icon color="error">delete</Icon>
                                        </IconButton>
                                    </td>{' '}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}

                <Button
                    variant="outlined"
                    color="secondary"
                    // onClick={handleClose}
                    onClick={()=> navigate('/IntergodownTransfer')}
                   
                >
                    Cancel
                </Button>
                <Button variant="outlined" type="submit" color="primary">
                    Save
                </Button>
            </ValidatorForm>
            { checkorderEdit ? 
            <div className="approve_reject">
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleClickappr_reject(orderid, 'Rejected')}
                >
                    Reject
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClickappr_reject(orderid, 'Approved')}
                >
                    Approve
                </Button>
            </div>:''}
            <Dialog
                open={deleteopen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <ValidatorForm onSubmit={handleConfirm} onError={() => null}>
                <DialogTitle id="alert-dialog-title">
                    {check_status == 'Approved'
                        ? 'Are You Sure Do You Want to Approve?'
                        : 'Are You Sure Do You Want to Reject ?'}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
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
                    </DialogContentText> */}
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
    ) : (
        ''
    )
}

export default AppTable