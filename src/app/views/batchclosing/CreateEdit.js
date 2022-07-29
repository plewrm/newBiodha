import React, { useEffect, useState } from 'react'
import style from 'Assets/css/style.css'
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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Autocomplete } from '@mui/lab'
import {
    postDataFromApi,
    getDataFromApi,
    putDataFromApi,
} from '../../services/CommonService'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import AlertMessage from '../commoncomponent/AlertMessage'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    marginBottom: '16px',
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

const batchptions = [{ label: 'batchptions1', value: '1' }]

const AppTable = () => {
    let { id } = useParams()
    let { status } = useParams()
    const paramid = id
    const navigate = useNavigate()
    const [formdata, setFormData] = useState({
        scanOCR: '',
        isActice: 1,
        skuids: [],
        stockcheck: [],
        qtypcs: [],
        qtymt: [],
        RCP: [],
        DP: [],
        proptype: [],
        isEnable: 0,
        iscreditRequired: 0,
        typeOfDispatch: '0',
        dump_qty: '',
        stockQty:"",
        stockWeight:"",
    })
    const [SkuTypeList, setSkuTypeList] = useState([])
    const [SkuType, setSkuType] = useState([])
    const [BM, setBM] = useState([])
    const [BMoptions, setBMoptions] = useState([])
    const [skuproperties, setskuproperties] = useState([])
    // const [stockQty, setstockQty] = useState([])
    // const [stockWeight, setstockWeight] = useState([])
    const [is_skuselected, setskuselected] = useState(false)
    const [propertyoptions, setpropertyoptions] = useState([])
    const [rows, setrows] = useState([])
    const [ZoneList, setZoneList] = useState([])
    const [BatchList, setBatchList] = useState([])

    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')
    const [statusopen, setstatusopen] = useState(false)
    const [statuschange, setstatuschange] = useState(false)
    const [redirectorder, setredirectorder] = useState(false)
    const [delete_id, setdelete_id] = useState('')
    const [check_status, setcheck_status] = useState('')
    const [redirectUrl, setRedirectUrl] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [batchStockDetails, setbatchStockDetails] = useState(false)
    const skuTypelist = async () => {
        var query = 'model=sku_type_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setSkuType(response.data.data)
            var skutype = []
            response.data.data.map((sku, i) => {
                var st = []
                st['id'] = sku.id
                st['label'] = sku.skuTypeName
                skutype.push(st)
            })
            setSkuTypeList(skutype)
            console.log('employee data', response)
        }
    }

    const getBM = async () => {
        var query = 'employeeId=1'
        const response = await postDataFromApi(
            'masters/allMasters/getBMForEmployee',
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
            // if(type=="zoneID"){
            //     getbatchDetails()
            // }
            if (type == 'SKU') {
                getskuproperties(e.id)
                setFormData((formData) => ({
                    ...formData,
                    ['dump_qty']: '',
                }))
            } else {
                getskuproperties()
            }
        } else {
            getskuproperties()
        }
    }
    const getbatchDetails = async (dataid = '') => {
        var id = dataid ? dataid : formdata.zoneID
        setrows([])
        var query = ''
        // const response = await getDataFromApi(
        //     'dashboard/dumpStock/batchDataByZoneId/' + id,
        //     query
        // )

        const response = await getDataFromApi(
            'dashboard/batchClosing/getBatchMasterData' 
            
        )//new
        if (response && response.data.code && response.data.data != null) {
            var options = []
            response.data.data.map((siopt, i) => {
                var opt = []
                opt['id'] = siopt.id
                opt['label'] = siopt.batchName
                options.push(opt)
            })
            setBatchList(options)
        }
    }
    const getskuproperties = async (id) => {
        id = id ? id : formdata.SKU
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

            setTimeout(function () {
                getrows()
            }, 200)
        }
    }

    function addrow() {
        getrows()
    }

    const getrows = async () => {
        /*if(is_skuselected){*/
        setrows([{ stockcheck: 1, qtypcs: 44, qtymt: 55, RCP: 555, DP: 87 }])
        console.log({ rows })

        /* }*/
    }
    function confirm() {
        if (redirectorder) {
            // navigate('/batch-closing')
            navigate(redirectUrl)
        }
        setalert(false)
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
    const handleClickAdd = async (id) => {
        var chkproperty = []
        var proparr = Object.keys(formdata.proptype)

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
            zoneID: formdata.zoneID,
            batchID: formdata.batchID,
            skuTypeId: formdata.SKU,
            properties: chkproperty,
        }
        console.log('stockchkarr', stockchkarr)
        var response = ''
        response = await postDataFromApi(
            'dashboard/batchClosing/getAvailblestock',
            stockchkarr
        )
        console.log('edit response', response)
        //var stockchkarr=stockcheck['stockcheck_'+id]
        if (response.data.code) {
            var newskuid = response.data.data[0].skuId
            var newstock = response.data.data[0].stockQty
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
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
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

    function handleClickDelete(index, e) {
        setrows(rows.filter((v, i) => i !== index))
    }

    const getBatchList = async () => {
        var query = 'model=batch_masters'
        // const response = await postDataFromApi('masters/allMasters/', query)
        const response = await getDataFromApi('dashboard/batchClosing/getBatchMasterData')//new
        if (response && response.data.code && response.data.data != null) {
            var options = []
            response.data.data.map((siopt, i) => {
                var opt = []
                opt['id'] = siopt.id
                opt['label'] = siopt.batchName
                options.push(opt)
            })
            setBatchList(options)
        }
    }
    const getZoneList = async () => {
        // var query = "model=zone_masters"
        // const response = await postDataFromApi('masters/allMasters/', query);
        var query = "model=zone_type_masters"
        const response = await getDataFromApi('masters/zoneMaster/getAllZone', query);

        // const response = await postDataFromApi(
        //     'dashboard/dumpStock/getZoneLIstByAssociatedYard/' +
        //         window.localStorage.getItem('id')
        // )
        if (response && response.data.code && response.data.data != null) {
            var options = []
            response.data.data.map((siopt, i) => {
                var opt = []
                opt['id'] = siopt.id
                opt['label'] = siopt.nameOfZone
                options.push(opt)
            })
            setZoneList(options)
        }
    }

    const getbatchdetails = async () => {
        const response = await getDataFromApi(
            'dashboard/batchClosing/getBatchClosingById/' + paramid
        )
        if (response && response.data.code && response.data.data != null) {
            const viewdata = response.data.data
            setbatchStockDetails(viewdata)
            console.log('editdata', viewdata)

            setFormData((formData) => ({
                ...formData,
                ['SKU']: viewdata.skuId,
                ['zoneID']: viewdata.zoneId,
                ['batchID']: viewdata.batchId,
                ['BMId']: viewdata.BMId,
                ['remark']: viewdata.remark,
            }))

            setTimeout(function () {
                setIsLoaded(true)
            }, 500)
        }
    }

    useEffect(() => {
        skuTypelist()
        getBM()
        getBatchList()
        getZoneList()
        if (paramid) {
            getbatchdetails()
        } else {
            setIsLoaded(true)
        }
    }, [])
    const handleSubmit = async (e) => {
        var id=0;
        e.preventDefault()
        console.log(formdata)
        var orderDetails = []
        var proptypedetail = []
        var chkproperty = []
        var proparr = Object.keys(formdata.proptype)

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
        console.log('chkproperty',chkproperty)
        var newformdata = {
            skuTypeId: formdata.SKU,
            zoneId: formdata.zoneID,
            batchId: formdata.batchID,
            BMId: formdata.BMId,
            remark: formdata.remark,
            approvalStatus: 0,
            createdBy: +window.localStorage.getItem('id'),
            properties: chkproperty,
        }

        console.log('newformdata', newformdata)

        var response = ''

        response = await postDataFromApi(
            'dashboard/batchClosing/createBatchClosingForm',
            newformdata
        )
        if (response.data.code) {
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            setredirectorder(true)
            setRedirectUrl('/batch-closing')
        } else {
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }
    const handleClickappr_reject = async (id, status) => {
        setstatuschange(true)
        setdelete_id(id)
        setcheck_status(status)
    }
    function handledeleteClose() {
        setstatuschange(false)
        setdelete_id('')
        setcheck_status('')
    }
    const handledeleteConfirm = async () => {
        setstatuschange(false)
        var formdata = {
            approvalStatus: check_status,
            batchId:batchStockDetails.batchId

        }
        var response = ''

        response = await putDataFromApi(
            'dashboard/batchClosing/approveRejectBatchClosing/' + paramid,
            formdata
        )

        console.log('edit response', response)
        if (response.data.code) {
            setstatuschange(false)
            // setalermessage(response.data.message)
            if (check_status) {
                setalermessage('Batch Closing Approved Successfully')
            } else {
                setalermessage('Batch Closing Rejected Successfully')
            }
            setalert(true)
            setalerttype('success')
            setredirectorder(true)
            setRedirectUrl('/dashboard/default')
        } else {
            setstatuschange(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }
    function getSelectedItem(id, data = [], label = '') {
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
    if (isLoaded) {
        return (
            <Container>
                <div className="breadcrumb leftalign_breadcrumb">
                    <Breadcrumb routeSegments={[{ name: 'Batch Closing' }]} />
                </div>
                <Button
                    className="rightalign_btn"
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/batch-closing')}
                >
                    Back to Batch Closing
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
                                className={paramid ? "required view-disabled" : "required"}
                                defaultValue={getSelectedItem(
                                    formdata.SKU,
                                    SkuTypeList
                                )}
                                fullWidth
                                options={SkuTypeList}
                                // getOptionLabel={(option) => option.label}
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
                            <AutoComplete
                                fullWidth
                                className={paramid ? " view-disabled" : ""}
                                options={ZoneList}
                                defaultValue={getSelectedItem(
                                    formdata.zoneID,
                                    ZoneList
                                )}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('zoneID', value)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Zone"
                                        variant="outlined"
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                        value={formdata.zoneID}
                                        name="zoneID"
                                    />
                                )}
                            />
                            <AutoComplete
                                fullWidth
                                className={paramid ? " view-disabled" : ""}
                                options={BatchList}
                                defaultValue={getSelectedItem(
                                    formdata.batchID,
                                    BatchList
                                )}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('batchID', value)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Batch"
                                        variant="outlined"
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                        value={formdata.batchID}
                                        name="batchID"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <AutoComplete
                                fullWidth
                                className={paramid ? " view-disabled" : ""}
                                options={BMoptions}
                                defaultValue={getSelectedItem(
                                    formdata.BMId,
                                    BMoptions
                                )}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('BMId', value)
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
                                        value={formdata.BMId}
                                        name="BMId"
                                    />
                                )}
                            />
                            <TextField
                               className={paramid ? "required view-disabled" : "required"}
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

                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            sx={{ mt: 2 }}
                        >
                            <table
                                id="customdatatable"
                                className="table table-hover table-bordered nowrap"
                            >
                                <thead>
                                {paramid ? (
                                    <tr>
                                        {batchStockDetails.propertydata.map(
                                            (skuproperties, index) => (
                                                <th>{skuproperties.sku_properties_label}</th>
                                            )
                                        )}
                                        <th>Stock Quantity</th>
                                        <th>Stock Weight</th>
                                        {/* <th></th>
                                        <th>Stock check </th> */}
                                    </tr>) : (
                                        <tr>
                                        {skuproperties.map(
                                            (skuproperties, index) => (
                                                <th>{skuproperties.label}</th>
                                            )
                                        )}
                                        <th></th>
                                        <th>Stock check </th>
                                    </tr>
                                    )}
                                </thead>
                                <tbody>
                                    {paramid ? (
                                    <tr>
                                        {' '}
                                        {batchStockDetails.propertydata.map(
                                            (skuproperties, indexinner) => {
                                                return (<td className="dropdowntd">
                                                     {skuproperties.sku_properties_value}
                                                 </td>
                                                 
                                                 )
                                             }
                                             
                                                // <td className="dropdowntd">
                                                //     <AutoComplete
                                                //             options={
                                                //                 propertyoptions[
                                                //                     skuproperties
                                                //                         .skuPropertiesMastersId
                                                //                 ]
                                                //             }
                                                //             getOptionLabel={(
                                                //                 option
                                                //             ) => option.label}
                                                //             onChange={(
                                                //                 e,
                                                //                 value,
                                                //                 name,
                                                //                 type
                                                //             ) =>
                                                //                 changeafterdropdownvalue(
                                                //                     e,
                                                //                     value,
                                                //                     'proptype_' +
                                                //                         skuproperties.skuPropertiesMastersId +
                                                //                         '_' +
                                                //                         index,
                                                //                     'proptype'
                                                //                 )
                                                //             }
                                                //             renderInput={(
                                                //                 params
                                                //             ) => (
                                                //                 <TextField
                                                //                     {...params}
                                                //                     className="required"
                                                //                     label={
                                                //                         skuproperties.label
                                                //                     }
                                                //                     variant="outlined"
                                                //                     value={
                                                //                         formdata
                                                //                             .proptype[
                                                //                             'proptype_' +
                                                //                                 skuproperties.skuPropertiesMastersId +
                                                //                                 '_' +
                                                //                                 index
                                                //                         ] !==
                                                //                         undefined
                                                //                             ? formdata
                                                //                                   .proptype[
                                                //                                   'proptype_' +
                                                //                                       skuproperties.skuPropertiesMastersId +
                                                //                                       '_' +
                                                //                                       index
                                                //                               ]
                                                //                             : ''
                                                //                     }
                                                //                     name={
                                                //                         'proptype_' +
                                                //                         skuproperties.skuPropertiesMastersId +
                                                //                         '_' +
                                                //                         index
                                                //                     }
                                                //                 /> 
                                                //         )} 
                                                //         />
                                                // </td>
                                            
                                        )}
                                       <td>{batchStockDetails.propertydata[0].stockQty}</td>
                                       <td>{batchStockDetails.propertydata[0].stockWeight}</td>
                                        
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
                                        </td> */}
                                        {' '}
                                    </tr>) : 
                                    rows.map((rows, index) => (
                                            <tr key={index}>
                                                {' '}
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
                                                                'stockcheck_' +
                                                                    index
                                                            ] !== undefined
                                                                ? formdata
                                                                      .stockcheck[
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
                                                    
                                                </td>{' '}
                                            </tr>
                                        )
                                        )
                                        }
                                    
                                </tbody>
                            </table>
                        </Grid>
                        {paramid ? (
                            status == 1 ? (
                                <div className="approve_reject">
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                            handleClickappr_reject(paramid, 2)
                                        }
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() =>
                                            handleClickappr_reject(paramid, 1)
                                        }
                                    >
                                        Approve
                                    </Button>
                                </div>
                            ) : (
                                ''
                            )
                        ) : (
                            <Grid
                                className="approve_reject"
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    color="primary"
                                >
                                    Save
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </ValidatorForm>
                <Dialog
                    open={statuschange}
                    disableBackdropClick
                    disableEscapeKeyDown
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {check_status == 1
                            ? 'Are You Sure Do You Want to Approve ?'
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
