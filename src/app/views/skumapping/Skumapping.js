import React, { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import style from 'Assets/css/style.css'
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
import { Box, styled } from '@mui/system'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
    ValidatorForm,
    TextValidator,
    SelectValidator,
} from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import {
    postDataFromApi,
    getDataFromApi,
    putDataFromApi,
} from '../../services/CommonService'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01'
import AlertMessage from '../commoncomponent/AlertMessage'

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

const skupropertiesList = [
    {
        id: '1',
        skuid: 1,
        propertyid: 21,
    },
    {
        id: '2',
        skuid: 12,
        propertyid: 22,
    },
]
const skupropertiesListt = [
    {
        id: '1',
        prop_list: 'Thickless',
        form_seq: '1',
        search_seq: '1',
        is_mand: 'yes',
    },
    {
        id: '2',
        prop_list: 'Width',
        form_seq: '2',
        search_seq: '2',
        is_mand: 'no',
    },
    {
        id: '3',
        prop_list: 'Length',
        form_seq: '3',
        search_seq: '3',
        is_mand: 'yes',
    },
    {
        id: '4',
        prop_list: 'Qty (Pcs)',
        form_seq: '4',
        search_seq: '4',
        is_mand: 'no',
    },
    {
        id: '5',
        prop_list: 'Qty (MT)',
        form_seq: '5',
        search_seq: '5',
        is_mand: 'yes',
    },
]
const SKU = [{ id: '1', label: '1234' }]
const property = [
    { id: '1', label: 21 },
    { id: '2', label: 22 },
]

const Searchable = [
    { id: '1', label: 'Yes' },
    { id: '2', label: 'No' },
]

const searchSequence = [
    { id: '1', label: 'Yes' },
    { id: '2', label: 'No' },
]

const Mandotory = [
    { id: '1', label: 'Yes' },
    { id: '2', label: 'No' },
]

const validationRulesop = [
    { id: '1', label: 'validationRule numeric' },
    { id: '2', label: 'decimal' },
    { id: '3', label: 'characters' },
    { id: '4', label: 'Not null' },
    { id: '5', label: 'NA' },
]

const AppTable = () => {
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)

    const [formdata, setFormData] = useState({
        skulabel: '',
        sku_frm_seq: [],
        is_searchable: [],
        sku_search_seq: [],
        isMandotory: [],
        validaionrule: [],
        is_checked: [],
    })
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState('')

    const [sku_mastersoptions, setsku_mastersoptions] = useState([])
    const [sku_masters, setsku_masters] = useState([])

    const switchStyles = useN01SwitchStyles()

    const [skuproperties, setskuproperties] = useState([])

    const [skumappingList, setskumappingList] = useState([])

    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')

    const [selectedskuid, setselectedskuid] = useState('')
    const [selectedval_rule, setselectedval_rule] = useState('')
    const [is_edit_loaded, set_is_edit_loaded] = useState(false)

    function setdefaultvalue() {
        setselectedskuid()
        setFormData({
            skuId: '',
            sku_frm_seq: [],
            is_searchable: [],
            sku_search_seq: [],
            isMandotory: [],
            validaionrule: [],
            is_checked: [],
        })
        getskuproperties()
        set_is_edit_loaded(false)
    }

    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['skuId']: skumappingList[id].skuTypeId,
            ['propertyId']: skumappingList[id].propertyId,
            ['formSequence']: skumappingList[id].formSequence,
            ['isSearchable']: skumappingList[id].isSearchable,
            ['searchSequence']: skumappingList[id].searchSequence,
            ['isMandotory']: skumappingList[id].isMandotory,
            ['validationRules']: skumappingList[id].validationRules,
            ['isActive']: skumappingList[id].isActive,
        }))
        setselectedskuid(getSelectedItem(skumappingList[id].skuTypeId))
        setselectedval_rule(getSelectedRule(skumappingList[id].validationRules))
        if (skumappingList[id].skuTypeId) {
            getskuproperties(skumappingList[id].skuTypeId)
        }
        setEditId(skumappingList[id].id)
        setIsEdit(true)
        setOpen(true)
    }

    function getSelectedItem(id) {
        const item = sku_mastersoptions.find((opt) => {
            if (opt.id == id) return opt
        })
        return item || null
    }
    function getSelectedRule(id) {
        const item = validationRulesop.find((opt) => {
            if (opt.id == id) return opt
        })
        console.log('item', item)
        return item || null
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
    function confirm() {
        setalert(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // console.log(formdata)

            // var MappingMasters=[]

            // var skuPropetyMappingDetails=[];

            // MappingMasters.push({'skuId' : formdata.skuId});

            // console.log('mappingsss',MappingMasters)
            var skuPropetyMappingDetails = []
            skuproperties.map((list, i) => {
                var is_searchable =
                    formdata.is_searchable[
                        'is_searchable_' + list.skuPropertiesMastersId
                    ]
                if (is_searchable == undefined) {
                    is_searchable = '0'
                }

                var isMandotory =
                    formdata.isMandotory[
                        'isMandotory_' + list.skuPropertiesMastersId
                    ]
                if (isMandotory == undefined || isMandotory == '0') {
                    isMandotory = 'No'
                } else if (isMandotory == 1) {
                    isMandotory = 'Yes'
                }

                //var is_checked = formdata.is_checked['is_checked_'+list.id]

                var data = {
                    propertyId: list.skuPropertiesMastersId,
                    formSequence:
                        formdata.sku_frm_seq[
                            'sku_form_seq_' + list.skuPropertiesMastersId
                        ],
                    isSearchable: is_searchable,
                    searchSequence:
                        formdata.sku_search_seq[
                            'sku_search_seq_' + list.skuPropertiesMastersId
                        ],
                    isMandotory: isMandotory,
                    validationRules:
                        formdata.validaionrule[
                            'validaionrule_' + list.skuPropertiesMastersId
                        ],
                    isActive:
                        formdata.is_checked[
                            'is_checked_' + list.skuPropertiesMastersId
                        ],
                }

                skuPropetyMappingDetails.push(data)
            })

            var newformdata = {
                skuId: formdata.skuId,
                skuPropetyMappingDetails: skuPropetyMappingDetails,
            }

            console.log(newformdata)

            var response = ''
            if (is_edit) {
                response = await postDataFromApi(
                    'masters/allMasters/updateskuMappingMasters',
                    newformdata
                )
            } else {
                response = await postDataFromApi(
                    'masters/allMasters/createskuMappingMasters',
                    newformdata
                )
            }

            if (response.data.code) {
                getskumappingList()
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
        } catch (e) {
            setOpen(false)
            setalermessage('Something Went Wrong!!')
            setalert(true)
            setalerttype('error')
        }
    }

    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }
    function changedropdownvalue(type, e) {
        $('#customdatatable').DataTable().destroy()
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
            if (type == 'skuId') {
                getskuproperties(e.id)
                //getdatatable();
            }
        } else {
            getskuproperties()
            //$('#property').DataTable().destroy();
        }
    }

    const getskumappingList = async () => {
        var query = ''
        const response = await getDataFromApi(
            'masters/allMasters/skuMappingList',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setskumappingList(response.data.data)
            console.log('Sku Mapping List', response)
        }
    }

    const getskuproperties = async (id) => {
        var query = 'skuId=' + id
        const response = await postDataFromApi(
            'masters/allMasters/getAllSkuPropertyList',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setskuproperties(response.data.data)
            var sku_frm_seqarr = []
            var is_searchablearr = []
            var is_checkedarr = []
            var sku_search_seqarr = []
            var isMandotoryarr = []
            var validaionrulearr = []
            // is_searchable=[]
            // sku_search_seq=[]
            // isMandotory=[]
            // validaionrule=[]
            response.data.data.map((list, i) => {
                console.log(list.formSequence)

                sku_frm_seqarr['sku_form_seq_' + list.skuPropertiesMastersId] =
                    list.formSequence
                is_searchablearr[
                    'is_searchable_' + list.skuPropertiesMastersId
                ] = list.isSearchable
                sku_search_seqarr[
                    'sku_search_seq_' + list.skuPropertiesMastersId
                ] = list.searchSequence
                isMandotoryarr['isMandotory_' + list.skuPropertiesMastersId] =
                    list.isMandotory
                validaionrulearr[
                    'validaionrule_' + list.skuPropertiesMastersId
                ] = list.validationRules
                is_checkedarr['is_checked_' + list.skuPropertiesMastersId] =
                    list.isActive ? 1 : 0

                // setselectedval_rule(getSelectedRule(list.validationRules))

                // sku_frm_seqarr.push({'sku_form_seq_'+list.skuPropertiesMastersId:2})
            })

            var newparameter = []
            setFormData((formData) => ({
                ...formData,
                sku_frm_seq: sku_frm_seqarr,
                is_searchable: is_searchablearr,
                sku_search_seq: sku_search_seqarr,
                isMandotory: isMandotoryarr,
                validaionrule: validaionrulearr,
                is_checked: is_checkedarr,
            }))

            // response.data.data.map((skuprop,i)=>{
            //     var newval={'form_seq_':""}
            //     newparameter.push(newval)
            // })
            // setFormData((formData) => ({
            //     ...formData,
            //     newparameter,
            // }));
            // console.log(newparameter)
            // console.log(formdata)
            set_is_edit_loaded(true)
        }
    }

    const skumappingchange = (e, index, type, elemnttype = '') => {
        if (elemnttype == 'checkbox') {
            if (e.target.checked) {
                e.target.value = 1
            } else {
                e.target.value = 0
            }
        }
        var values = formdata[type]
        console.log('values', e.target.name)
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
    useEffect(() => {
        getdatatable()
        getsku_masters()
        getskumappingList()
    }, [])

    useEffect(() => {
        getdatatable()
    }, [skumappingList])

    useEffect(() => {
        getdatatable()
    }, [skupropertiesListt])

    var datatable = ''
    const getdatatable = async () => {
        if (datatable) {
            $('#customdatatable').DataTable().destroy()
        }
        $(document).ready(function () {
            setTimeout(function () {
                datatable = $('#customdatatable').DataTable()
            }, 500)
        })
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

    const handleStateChange = async (id, isActive) => {
        isActive = isActive ? 0 : 1
        var query =
            'tableName=sku_category_propety_mapping_masters&isActive=' +
            isActive
        const response = await putDataFromApi('masters/isActive/' + id, query)
        console.log(response)
        if (response.data.code) {
            console.log(response.data.message)
            getskumappingList()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
        } else {
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    /*function formdatavaluechange(e){
        var value=e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    } */

    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Product Group Mapping' }]} />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Add Product Group Mapping
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
                            <th>Product Group</th>
                            <th>Property Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skumappingList.map((skumappingList, index) => (
                            <tr key={index}>
                                <td align="left">{index + 1}</td>
                                <td align="left">{skumappingList.SKUName}</td>
                                <td align="left">
                                    {skumappingList.propertyName}
                                </td>
                                <td>
                                    <Switch
                                        classes={switchStyles}
                                        abelPlacement="start"
                                        label={
                                            skumappingList.isActive
                                                ? 'Active'
                                                : 'Inactive'
                                        }
                                        checked={skumappingList.isActive}
                                        onChange={() =>
                                            handleStateChange(
                                                skumappingList.id,
                                                skumappingList.isActive
                                            )
                                        }
                                        value="active"
                                        inputProps={{
                                            'aria-label': 'secondary checkbox',
                                        }}
                                    />
                                </td>
                                <td>
                                    <IconButton
                                        onClick={() => handleClickEdit(index)}
                                    >
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
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
                className="spe-popup sku_mapping"
            >
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <DialogTitle id="form-dialog-title">
                        {is_edit ? 'Update' : 'Add'} Product Group Mapping
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
                                    defaultValue={selectedskuid}
                                    options={sku_mastersoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('skuId', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select Product Group"
                                            variant="outlined"
                                            fullWidth
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                            value={formdata.skuId}
                                            name="skuId"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                                overflow="auto"
                            >
                                <table
                                    id="customdatatable"
                                    className="table display table-hover table-bordered skumaping-table"
                                >
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Properties List</th>
                                            <th>Form Sequence</th>
                                            <th>Is Searchable</th>
                                            <th>Search Sequence</th>
                                            <th>Is Mandatory</th>
                                            <th>Validation Rules</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {is_edit_loaded ? (
                                        <tbody>
                                            {skuproperties.map(
                                                (skuproperties, index) => (
                                                    <tr key={index}>
                                                        <td align="left">
                                                            {index + 1}
                                                        </td>
                                                        <td align="left">
                                                            {
                                                                skuproperties.label
                                                            }
                                                        </td>
                                                        <td align="left">
                                                            <TextField
                                                                className="required"
                                                                label="Sequence"
                                                                variant="outlined"
                                                                fullWidth
                                                                name={
                                                                    'sku_form_seq_' +
                                                                    skuproperties.skuPropertiesMastersId
                                                                }
                                                                value={
                                                                    formdata
                                                                        .sku_frm_seq[
                                                                        'sku_form_seq_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ] !==
                                                                    undefined
                                                                        ? formdata
                                                                              .sku_frm_seq[
                                                                              'sku_form_seq_' +
                                                                                  skuproperties.skuPropertiesMastersId
                                                                          ]
                                                                        : ''
                                                                }
                                                                validators={
                                                                    formdata
                                                                        .is_checked[
                                                                        'is_checked_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ] == '1'
                                                                        ? [
                                                                              'required',
                                                                              'isNumber',
                                                                          ]
                                                                        : []
                                                                }
                                                                onChange={(e) =>
                                                                    skumappingchange(
                                                                        e,
                                                                        skuproperties.skuPropertiesMastersId,
                                                                        'sku_frm_seq'
                                                                    )
                                                                }
                                                                errorMessages={[
                                                                    'this field is required',
                                                                    'Only Numbers allowed',
                                                                ]}
                                                            />
                                                        </td>
                                                        <td
                                                            align="center"
                                                            className="no-margin-label"
                                                        >
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox />
                                                                }
                                                                label=""
                                                                name={
                                                                    'is_searchable_' +
                                                                    skuproperties.skuPropertiesMastersId
                                                                }
                                                                checked={
                                                                    formdata
                                                                        .is_searchable[
                                                                        'is_searchable_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ] !== '0' &&
                                                                    formdata
                                                                        .is_searchable[
                                                                        'is_searchable_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ]
                                                                        ? true
                                                                        : false
                                                                }
                                                                onChange={(e) =>
                                                                    skumappingchange(
                                                                        e,
                                                                        skuproperties.skuPropertiesMastersId,
                                                                        'is_searchable',
                                                                        'checkbox'
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td align="left">
                                                            <td align="left">
                                                                <TextField
                                                                    className="required"
                                                                    label="Sequence"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    value={
                                                                        formdata
                                                                            .sku_search_seq[
                                                                            'sku_search_seq_' +
                                                                                skuproperties.skuPropertiesMastersId
                                                                        ] !==
                                                                        undefined
                                                                            ? formdata
                                                                                  .sku_search_seq[
                                                                                  'sku_search_seq_' +
                                                                                      skuproperties.skuPropertiesMastersId
                                                                              ]
                                                                            : ''
                                                                    }
                                                                    name={
                                                                        'sku_search_seq_' +
                                                                        skuproperties.skuPropertiesMastersId
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        skumappingchange(
                                                                            e,
                                                                            skuproperties.skuPropertiesMastersId,
                                                                            'sku_search_seq'
                                                                        )
                                                                    }
                                                                    validators={
                                                                        formdata
                                                                            .is_checked[
                                                                            'is_checked_' +
                                                                                skuproperties.skuPropertiesMastersId
                                                                        ] == '1'
                                                                            ? [
                                                                                  'required',
                                                                                  'isNumber',
                                                                              ]
                                                                            : []
                                                                    }
                                                                    errorMessages={[
                                                                        'this field is required',
                                                                        'Only Numbers allowed',
                                                                    ]}
                                                                />
                                                            </td>
                                                        </td>
                                                        <td align="left">
                                                            <Switch
                                                                classes={
                                                                    switchStyles
                                                                }
                                                                abelPlacement="start"
                                                                label={
                                                                    skuproperties.isActive
                                                                        ? 'Active'
                                                                        : 'Inactive'
                                                                }
                                                                checked={
                                                                    skuproperties.isActive
                                                                }
                                                                name={
                                                                    'isMandotory_' +
                                                                    skuproperties.skuPropertiesMastersId
                                                                }
                                                                checked={
                                                                    formdata
                                                                        .isMandotory[
                                                                        'isMandotory_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ] !== '0' &&
                                                                    formdata
                                                                        .isMandotory[
                                                                        'isMandotory_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ]
                                                                        ? true
                                                                        : false
                                                                }
                                                                onChange={(e) =>
                                                                    skumappingchange(
                                                                        e,
                                                                        skuproperties.skuPropertiesMastersId,
                                                                        'isMandotory',
                                                                        'checkbox'
                                                                    )
                                                                }
                                                                inputProps={{
                                                                    'aria-label':
                                                                        'secondary checkbox',
                                                                }}
                                                            />
                                                        </td>
                                                        <td align="left">
                                                            <AutoComplete
                                                                fullWidth
                                                                defaultValue={getSelectedRule(
                                                                    formdata
                                                                        .validaionrule[
                                                                        'validaionrule_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ] !==
                                                                        undefined
                                                                        ? formdata
                                                                              .validaionrule[
                                                                              'validaionrule_' +
                                                                                  skuproperties.skuPropertiesMastersId
                                                                          ]
                                                                        : ''
                                                                )}
                                                                options={
                                                                    validationRulesop
                                                                }
                                                                getOptionLabel={(
                                                                    option
                                                                ) =>
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
                                                                        'validaionrule_' +
                                                                            skuproperties.skuPropertiesMastersId,
                                                                        'validaionrule'
                                                                    )
                                                                }
                                                                renderInput={(
                                                                    params
                                                                ) => (
                                                                    <TextField
                                                                        {...params}
                                                                        className="required"
                                                                        label="Rules"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        validators={
                                                                            formdata
                                                                                .is_checked[
                                                                                'is_checked_' +
                                                                                    skuproperties.skuPropertiesMastersId
                                                                            ] ==
                                                                            '1'
                                                                                ? [
                                                                                      'required',
                                                                                  ]
                                                                                : []
                                                                        }
                                                                        errorMessages={[
                                                                            'this field is required',
                                                                        ]}
                                                                        value={
                                                                            formdata
                                                                                .validaionrule[
                                                                                'validaionrule_' +
                                                                                    skuproperties.skuPropertiesMastersId
                                                                            ] !==
                                                                            undefined
                                                                                ? formdata
                                                                                      .validaionrule[
                                                                                      'validaionrule_' +
                                                                                          skuproperties.skuPropertiesMastersId
                                                                                  ]
                                                                                : ''
                                                                        }
                                                                        name={
                                                                            'validaionrule_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        </td>
                                                        <td
                                                            align="center"
                                                            className="no-margin-label"
                                                        >
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox />
                                                                }
                                                                label=""
                                                                name={
                                                                    'is_checked_' +
                                                                    skuproperties.skuPropertiesMastersId
                                                                }
                                                                checked={
                                                                    formdata
                                                                        .is_checked[
                                                                        'is_checked_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ] !== '0' &&
                                                                    formdata
                                                                        .is_checked[
                                                                        'is_checked_' +
                                                                            skuproperties.skuPropertiesMastersId
                                                                    ]
                                                                        ? true
                                                                        : false
                                                                }
                                                                onChange={(e) =>
                                                                    skumappingchange(
                                                                        e,
                                                                        skuproperties.skuPropertiesMastersId,
                                                                        'is_checked',
                                                                        'checkbox'
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    ) : (
                                        ''
                                    )}
                                </table>
                            </Grid>
                        </Grid>
                        <DialogActions className="spe-btn">
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </ValidatorForm>
            </Dialog>
            <Dialog
                open={deleteopen}
                disableBackdropClick
                disableEscapeKeyDown
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
                    <Button onClick={handledeleteClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default AppTable
