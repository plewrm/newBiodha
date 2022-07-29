import React, { useEffect, useState } from 'react'
import style from 'Assets/css/style.css'
import SimpleTable from '../material-kit/tables/SimpleTable'
import PaginationTable from '../material-kit/tables/PaginationTable'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import Typography from '@mui/material/Typography'
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
import { ro } from 'date-fns/locale'

const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    marginBottom: '0px',
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

const AppTable = () => {
    const switchStyles = useN01SwitchStyles()
    const navigate = useNavigate()
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')
    const [formdata, setFormData] = useState({
        Yard: '',
        zoneId: '',
        skuids: [],
        stockcheck: [],
        proptype: [],
        InwardQuantity: [],
        InwardWeight: [],
        formula: [],
        batchNo: [],
        scanOCR: [],
        invoice_number: '',
        vehical_number: '',
        invoice_date: null,
        truckArrivedFrom: '',
        truckNo: '',
        remark: '',
        truckWeight: '',
        totalweight: 0,
    })
    const [zone_masters, setzone_masters] = useState([])
    const [zoneoptions, setzoneoptions] = useState([])
    const [sku_mastersoptions, setsku_mastersoptions] = useState([])
    const [sku_masters, setsku_masters] = useState([])
    const [is_skuselected, setskuselected] = useState(false)
    const [skuproperties, setskuproperties] = useState([])
    const [rows, setrows] = useState([])
    const [propertyoptions, setpropertyoptions] = useState([])
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)
    const [clearedDate, setClearedDate] = React.useState(null)
    const todaydate = new Date()
    const [dateopen, setdateOpen] = React.useState(false)
    const [invdateopen, setinvdateOpen] = React.useState(false)
    const [yards, setyards] = useState([])
    const [yardsoptions, setyardsoptions] = useState([])
    const [redirectUrl, setRedirectUrl] = useState('')
    const [isredirect, setIsRedirect] = useState(false)
    const [scanOCR, setscanOCR] = useState('')

    const getzone_masters = async (id = '') => {
        var query = 'model=zone_masters'
        const response = await getDataFromApi(
            'masters/zoneMaster/getZoneByYardId/' + id
        )
        if (response && response.data.code && response.data.data != null) {
            setzone_masters(response.data.data)
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
                InwardQuantity: [],
                formula: [],
                proptype: [],
                batchNo: [],
                scanOCR: [],
            }))

            setTimeout(function () {
                getrows('sku')
            }, 200)
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
    function confirm() {
        if (isredirect) {
            navigate(redirectUrl)
        }
        setalert(false)
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

        if (type == 'Yard') {
            getzone_masters(e.id)
        }
    }
    const handleDateChange = (date, name = '') => {
        // setClearedDate(date)
        setFormData((formData) => ({
            ...formData,
            [name]: date,
        }))
    }
    function addrow() {
        getrows()
    }
    function handleClickDelete(index, e) {
        setrows(rows.filter((v, i) => i !== index))
    }
    function handleClose() {
        setOpen(false)
    }

    const getrows = (type = '') => {
        if (type) {
            // if(is_skuselected){
            setrows([])
            // }
        } else {
            // if(is_skuselected){
            setrows([
                ...rows,
                { InwardQuantity: 1, formula: 2, InwardWeight: 5 },
            ])
            // }
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
    const stockchange = (e, index, type) => {
        var values = formdata[type]
        values[e.target.name] = e.target.value
        var totalweight = formdata['totalweight']
        if (type == 'InwardWeight') {
            totalweight = 0
            rows.map((lab, i) => {
                if (i == index) {
                    totalweight =
                        parseFloat(totalweight) + parseFloat(e.target.value)
                } else {
                    totalweight =
                        formdata.InwardWeight['InwardWeight_' + i] !=
                            undefined &&
                        formdata.InwardWeight['InwardWeight_' + i]
                            ? parseFloat(totalweight) +
                              parseFloat(
                                  formdata.InwardWeight['InwardWeight_' + i]
                              )
                            : totalweight
                }
            })
        }

        setFormData((formData) => ({
            ...formData,
            values,
            totalweight: totalweight,
        }))
    }
    const handleClickAdd = async (id) => {
        console.log(id)
        console.log('propertycheckqty', formdata.proptype)
        console.log('SKU', formdata.SKU)
        var chkproperty = []
        var proparr = Object.keys(formdata.proptype)

        proparr.map((prop, i) => {
            var sp = prop.split('_')
            // if(sp[2]==id){
            var property = {
                property_id: sp[1],
                value: formdata.proptype[prop],
            }
            chkproperty.push(property)
            // }
        })
        var stockchkarr = {
            yardId: formdata.Yard,
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
            /*setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')*/
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
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formdata)
        var stockDetails = []
        var proptypedetail = []
        rows.map((list, i) => {
            var proparr = Object.keys(formdata.proptype)
            var chkproperty = []
            console.log('proparr', proparr)
            proparr.map((prop, ind) => {
                var sp = prop.split('_')
                if (sp[2] == i) {
                    var property = {
                        property_id: sp[1],
                        value: formdata.proptype[prop],
                    }
                    chkproperty.push(property)
                }
            })
            var data = {
                properties: chkproperty,
                // scanOCR: formdata.scanOCR['scanOCR_' + i],
                // batchNo: formdata.batchNo['batchNo_' + i],
                // 'skuId':formdata.skuids['skuids_'+i],
                // 'stock_check':formdata.stockcheck['stockcheck_'+i],
                stockQuantity: formdata.InwardQuantity['InwardQuantity_' + i],
                stockWeight: formdata.InwardWeight['InwardWeight_' + i],
                formula: formdata.formula['formula_' + i],
            }
            var properties = []
            skuproperties.map((skuproperties, indexinner) => {
                // var datas={
                //  'proptype':formdata.proptype['proptype_'+skuproperties.skuPropertiesMastersId]
                // }
                // proptypedetail.push(datas)
                // data['property_'+skuproperties.skuPropertiesMastersId]=formdata.proptype['proptype_'+skuproperties.skuPropertiesMastersId]
                // properties.push(formdata.proptype['proptype_'+skuproperties.skuPropertiesMastersId])
            })
            // data['skuId']['properties']=properties
            stockDetails.push(data)
        })
        //var newdate =  Moment((formdata.date.format('Y-m-d'))
        var inwardDate = moment(formdata.inwardDate)
        inwardDate = inwardDate.format('Y-MM-DD')
        var invoice_date = moment(formdata.invoice_date)
        invoice_date = invoice_date.format('Y-MM-DD')

        var newformdata = {
            // 'scanOCR':formdata.scanOCR,
            skuTypeId: formdata.SKU,
            yardId: formdata.Yard,
            batchId: 1,
            remark: formdata.remark,
            inward_date: inwardDate,
            // "batchNo":formdata.batchNo,
            // zoneId: formdata.zoneId,
            invoice_date: invoice_date,
            vehical_number: formdata.vehical_number,
            invoice_number: formdata.invoice_number,
            truckArrivedFrom: formdata.truckArrivedFrom,
            truckWeight: formdata.truckWeight,
            truckNo: formdata.truckNo,
            stockDetails: stockDetails,
        }

        console.log(newformdata)
        var min = parseFloat(formdata.truckWeight) - 10
        var max = parseFloat(formdata.truckWeight) + 10

        var totalweight = parseFloat(formdata.totalweight)
        // if (min < totalweight && max > totalweight) {
        if (!(totalweight >= min && totalweight <= max)) {
            setOpen(false)
            setalermessage('Not valid Weight')
            setalert(true)
            setalerttype('error')
            return false
        }
        var response = ''

        response = await postDataFromApi(
            'order/createMaterialStockInward',
            newformdata
        )

        console.log('edit response', response)
        if (response.data.code) {
            getsku_masters()
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            setIsRedirect(true)
            if (response.data.data) {
                setRedirectUrl('/stockinward/view/' + response.data.data.id)
            } else {
                setRedirectUrl('/stockinward')
            }
        } else {
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }
    const fetchProductGroupProperties = async (e) => {
        var query = {
            scanOCR: scanOCR,
            skuTypeId: formdata.SKU,
        }
        const response = await postDataFromApi(
            'order/productCodeDetailsInStockInward',
            query
        )
        if (response.data.code) {
            console.log('rowscount', rows.length)
            var properties = response.data.data[0].properties
            var index = rows.length
            var values = formdata['proptype']
            properties.map((label, i) => {
                var name =
                    'proptype_' + label.skuPropertiesMastersId + '_' + index
                values[name] = label.propertyValueId
            })

            setFormData((formData) => ({
                ...formData,
                values,
            }))
            console.log('formdata', formdata)
            setscanOCR('')
            addrow()
        } else {
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }
    useEffect(() => {
        // getzone_masters();
        getsku_masters()
        getyards()
    }, [])

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

    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Stock inward Add' }]} />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/stockinward')}
            >
                Back to Stock inward
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
                            options={yardsoptions}
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
                                    errorMessages={['this field is required']}
                                    value={formdata.Yard}
                                    name="Yard"
                                />
                            )}
                        />
                        {/* <AutoComplete
                            fullWidth
                            options={zoneoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('zoneId', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Zone"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.zoneId}
                                    name="zoneId"
                                />
                            )}
                        /> */}
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
                                    label="Product Group"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.SKU}
                                    name="SKU"
                                />
                            )}
                        />
                        {/* <TextField
                                    className="required"
                                    id="scanOCR"
                                    label="Production Code"
                                    type="text"
                                    fullWidth
                                    name="scanOCR"
                                    value={formdata.scanOCR || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required' ]}
                                    errorMessages={['this field is required']}
                                    
                                />
                        <TextField
                                    className="required"
                                    id="batchNo"
                                    label="Batch No"
                                    type="text"
                                    fullWidth
                                    name="batchNo"
                                    value={formdata.batchNo || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required' ]}
                                    errorMessages={['this field is required']}
                                    
                                /> */}

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
                                'matchRegexp:^[a-zA-Z0-9][[^a-zA-Z0-9 ]+$',
                            ]}
                            errorMessages={[
                                'this field is required',
                                'Only Characters allowed',
                            ]}
                            multiline
                            rows={3}
                        />
                        <Grid container spacing={3}
                            className="allitemweight"
                        >
                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                                className="allitemweight"
                            >
                                <Typography>All Item Weight</Typography>
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                                className="allitemweight"
                            >
                                <Typography>{formdata.totalweight}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
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
                                    value={formdata.inwardDate}
                                    onChange={(e) =>
                                        handleDateChange(e, 'inwardDate')
                                    }
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            // variant="Outlined"
                                            className="required"
                                            id="mui-pickers-date"
                                            label="Inward Date"
                                            sx={{ mb: 2, width: '100%' }}
                                            name="inwardDate"
                                            onClick={(e) => setdateOpen(true)}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                open={invdateopen}
                                onOpen={() => setinvdateOpen(true)}
                                onClose={() => setinvdateOpen(false)}
                                inputFormat="dd/MM/yyyy"
                                value={formdata.invoice_date}
                                onChange={(e) =>
                                    handleDateChange(e, 'invoice_date')
                                }
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        // variant="Outlined"
                                        className="required"
                                        id="mui-pickers-date"
                                        label="Invoice Date"
                                        sx={{ mb: 2, width: '100%' }}
                                        name="invoice_date"
                                        onClick={(e) => setinvdateOpen(true)}
                                        value={formdata.invoice_date}
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <TextField
                            className="required"
                            id="invoice_number"
                            label="Invoice Number"
                            type="text"
                            fullWidth
                            name="invoice_number"
                            value={formdata.invoice_number || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            rows={3}
                        />
                        <TextField
                            className="required"
                            id="vehical_number"
                            label="Vehical Number"
                            type="text"
                            fullWidth
                            name="vehical_number"
                            value={formdata.vehical_number || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            // validators={['required','matchRegexp:^[[^a-zA-Z0-9 ]+$']}
                            // validators={['minNumber:0', 'maxNumber:255', 'matchRegexp:^[0-9]$']}
                            // validators={['required' ,'matchRegexp:^[a-zA-Z0-9][[^a-zA-Z0-9 ]+$']}
                            validators={[
                                'required',
                                'matchRegexp:^[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{4}$',
                            ]}
                            errorMessages={['this field is required']}
                            rows={3}
                        />
                        <TextField
                            className="required"
                            id="truckArrivedFrom"
                            label="Truck Arrived From"
                            type="text"
                            fullWidth
                            name="truckArrivedFrom"
                            value={formdata.truckArrivedFrom || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required', 'matchRegexp:^[A-Za-z]*$']}
                            errorMessages={['this field is required']}
                            rows={3}
                        />
                        <TextField
                            className="required"
                            id="truckNo"
                            label="Truck Name"
                            type="text"
                            fullWidth
                            name="truckNo"
                            value={formdata.truckNo || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            rows={3}
                        />
                        <TextField
                            className="required"
                            id="truckWeight"
                            label="Truck Weight"
                            type="text"
                            fullWidth
                            name="truckWeight"
                            value={formdata.truckWeight || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            rows={3}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} className="fetchgrid">
                    <Grid item lg={2} md={2} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Button
                            className="orderadd"
                            variant="outlined"
                            color="primary"
                            onClick={addrow}
                        >
                            Add Item
                        </Button>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            // className="required"
                            id="scanOCR"
                            label="Product Code"
                            type="text"
                            fullWidth
                            name={scanOCR}
                            value={scanOCR}
                            onChange={(e) => setscanOCR(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Button
                            className="orderadd"
                            variant="outlined"
                            color="primary"
                            onClick={() => fetchProductGroupProperties()}
                        >
                            Fetch
                        </Button>
                    </Grid>
                </Grid>
                <div className="table_scroll">
                    <table className="table table-hover table-bordered display nowrap">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                {/* <th>Product Code</th>
                                <th>Batch No</th> */}
                                {skuproperties.map((skuproperties, index) => (
                                    <th>{skuproperties.label}</th>
                                ))}

                                <th>InwardQuantity</th>
                                <th>InwardWeight</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((rows, index) => (
                                <tr key={index}>
                                    {' '}
                                    <td>{index + 1}</td>
                                    {/* <td>
                                        <TextField
                                            // className="required"
                                            id="scanOCR"
                                            label="Product Code"
                                            type="text"
                                            fullWidth
                                            name={'scanOCR_' + index}
                                            value={
                                                formdata.scanOCR[
                                                    'scanOCR_' + index
                                                ] !== undefined
                                                    ? formdata.scanOCR[
                                                          'scanOCR_' + index
                                                      ]
                                                    : ''
                                            }
                                            // onChange={(e)=>stockchange(e,index,'scanOCR')}
                                            onChange={(e) =>
                                                stockchange(e, index, 'scanOCR')
                                            }
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            // className="required"
                                            id="batchNo"
                                            label="Batch No"
                                            type="text"
                                            fullWidth
                                            name={'batchNo_' + index}
                                            value={
                                                formdata.batchNo[
                                                    'batchNo_' + index
                                                ] !== undefined
                                                    ? formdata.batchNo[
                                                          'batchNo_' + index
                                                      ]
                                                    : ''
                                            }
                                            // onChange={(e)=>stockchange(e,index,'batchNo')}
                                            onChange={(e) =>
                                                stockchange(e, index, 'batchNo')
                                            }
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </td> */}
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
                                                    defaultValue={getSelectedItem(
                                                        formdata.proptype[
                                                            'proptype_' +
                                                                skuproperties.skuPropertiesMastersId +
                                                                '_' +
                                                                index
                                                        ],
                                                        propertyoptions[
                                                            skuproperties
                                                                .skuPropertiesMastersId
                                                        ]
                                                    )}
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
                                    <td>
                                        <TextField
                                            className="required"
                                            id="InwardQuantity"
                                            label="InwardQuantity"
                                            type="text"
                                            fullWidth
                                            name={'InwardQuantity_' + index}
                                            value={
                                                formdata.InwardQuantity[
                                                    'InwardQuantity_' + index
                                                ] !== undefined
                                                    ? formdata.InwardQuantity[
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
                                            label="InwardWeight"
                                            type="text"
                                            fullWidth
                                            name={'InwardWeight_' + index}
                                            value={
                                                formdata.InwardWeight[
                                                    'InwardWeight_' + index
                                                ] !== undefined
                                                    ? formdata.InwardWeight[
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
                </div>

                <Button
                    variant="outlined"
                    color="secondary"
                    // onClick={handleClose}
                    onClick={() => navigate('/stockinward')}
                >
                    Cancel
                </Button>
                <Button variant="outlined" type="submit" color="primary">
                    Save
                </Button>
            </ValidatorForm>
        </Container>
    )
}

export default AppTable
