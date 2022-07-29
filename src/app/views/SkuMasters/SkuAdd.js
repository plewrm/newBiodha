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
} from '@mui/material'
import { Box, styled } from '@mui/system'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'
import MenuItem from "@material-ui/core/MenuItem";
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import { postDataFromApi, getDataFromApi, putDataFromApi } from '../../services/CommonService';
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
import AlertMessage from '../commoncomponent/AlertMessage'
import { useNavigate } from 'react-router-dom'

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
    const [sku_masters, setsku_masters] = useState([])
    const model = 'sku_masters';
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)
    const navigate = useNavigate()
    const [formdata, setFormData] = useState({ SKUName: "" ,proptype:[]})
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState("")

    const switchStyles = useN01SwitchStyles();
    const [propertyoptions,setpropertyoptions]=useState([]);
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState("")
    const [alerttype, setalerttype] = useState("")
    const [uomoptions, setuomoptions] = useState([]);
    const [uom, setuom] = useState([])
    const [selectedfield, setselectedfield] = useState({})
    const [SkuTypeList, setSkuTypeList] = useState([])
    const [SkuType, setSkuType] = useState([])
    const [is_skuselected,setskuselected]=useState(false)
    const [skuproperties,setskuproperties]=useState([])
    const [showtable,setshowtable]=useState(false)
    const [redirectsku,setredirectsku]=useState(false)
    const getuom = async () => {

        var query = "model=uom_masters"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if (response && response.data.code && response.data.data != null) {
            setuom(response.data.data);
            var uomopts = [];
            response.data.data.map((uom, i) => {
                var um = [];
                um['id'] = uom.id
                um['label'] = uom.uomName
                uomopts.push(um)
            })
            setuomoptions(uomopts)
            console.log('uom_masters data', response);
        }

    }

    function setdefaultvalue() {
        setselectedfield()
        setFormData({ SKUName: "", uomId: "", SKUCode: "", priceOfSKU: "", remark: "",weightPerPiece:"", isActice: 1 ,proptype:[]})
    }


    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['SKUName']: sku_masters[id].SKUName,
            ['SKUCode']: sku_masters[id].SKUCode,
            ['priceOfSKU']: sku_masters[id].priceOfSKU,
            ['uomId']: sku_masters[id].uomId,
            ['remark']: sku_masters[id].remark,
            ['isActive']: sku_masters[id].isActive
        }));
        setEditId(sku_masters[id].id)
        setselectedfield(getSelectedItemfield(sku_masters[id].uomId))
        setIsEdit(true)
        setOpen(true)
    }
    function getSelectedItemfield(id) {
        const item = uomoptions.find((opt) => {


            if (opt.id == id)
                return opt;
        })
        return item || {};

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
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('formdata',formdata)
        var chkproperty=[];
        var proparr=Object.keys(formdata.proptype)
        proparr.map((prop,i)=>{

            var sp=prop.split('_')
            
                var property={
                    'property_id':sp[1],
                    'value':formdata.proptype[prop]
                }
                chkproperty.push(property)
            
        })
        console.log('chkproperty',chkproperty);
        var newformdata ={
            "skuTypeId": formdata.id,
            "SKUName":formdata.SKUName,
            "SKUCode":formdata.SKUCode,
            "priceOfSKU":formdata.priceOfSKU,
            "uomId":formdata.uomId,
            "remark":formdata.remark,
            "weightPerPiece":formdata.weightPerPiece,
            "properties":chkproperty,
        }
        console.log('newformdata',newformdata);
        var response = "";
        if (is_edit) {
            response = await postDataFromApi('masters/allMasters/updateSkuMasters/' + edit_id, newformdata);
        }
        else {
            response = await postDataFromApi('masters/allMasters/createSkuMasters', newformdata);
        }
        console.log('edit response', response)
        if (response.data.code) {
            getsku_masters()
            setIsEdit(false)
            setEditId("")
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            setredirectsku(true)
        }
        else {
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }

    }
    function confirm() {
        setalert(false)
        if(redirectsku){
          navigate('/SkuMasters')
        }
    }

    const getsku_masters = async () => {

        var query = "model=sku_type_masters"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if (response && response.data.code && response.data.data != null) {
            setsku_masters(response.data.data);
            console.log('sku_masters data', response);

        }

    }
    const skuTypelist = async () => {
        var query = "model=sku_type_masters"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if (response && response.data.code && response.data.data != null) {
            setSkuType(response.data.data);
            var skutype = [];
            response.data.data.map((sku, i) => {
                var st = [];
                st['id'] = sku.id
                st['label'] = sku.skuTypeName
                skutype.push(st)
            })
            setSkuTypeList(skutype)
            console.log('employee data', response);
        }

    }

     const getskuproperties = async (id) => {
        
                setskuselected(false)
                var query = "skuId="+id
                const response = await postDataFromApi('masters/allMasters/getSkuPropertyList', query);
                if(response && response.data.code && response.data.data!=null){
                    setskuproperties(response.data.data);
                    setskuselected(true)
                    setshowtable(true)
                    console.log('SKU properties',response.data.data);
                    var dddata=[];
                    response.data.data.map((prop,i)=>{
                        var signleprpdd=[]
                        if(prop.dropdownData){
                            prop.dropdownData.map((dd,i)=>{
                                signleprpdd.push({'label':dd.dropdownName,'id':dd.id})
                            })
                        }
                        dddata[prop.skuPropertiesMastersId]=signleprpdd
                    })
                    setpropertyoptions(dddata)
                    setFormData((formData) => ({
                        ...formData,
                        
                        proptype:[],

                    }));

                }else{
                    setshowtable(false)
                }
    }

    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));
    }

    const handleStateChange = async (id, isActive) => {
        console.log(id)
        console.log(isActive)
        isActive = isActive ? 0 : 1;
        var query = "tableName=" + model + "&isActive=" + isActive;
        const response = await putDataFromApi('masters/isActive/' + id, query);
        if (response.data.code) {

            setOpen(false)
            getsku_masters()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
        }
        else {
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    function changedropdownvalue(type, e) {
        console.log(type)
        console.log(e)
        if (e) {
            var value = e.id
        } else {
            var value = ""
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }));

        if(e){
            if(type == 'id'){
              getskuproperties(e.id)
              console.log('skutypeid',e)
            }
        }else{
            // getskuproperties()
            setshowtable(false) 
        }
    }
    const changeafterdropdownvalue=(e,val,name,type)=>{
       
        if(val){
           var values=formdata[type]
           values[name]=val.id
           
        }else{
            var values=formdata[type]
            values[name]=""
        }
        
        setFormData((formData) => ({
            ...formData,
            values,
        }));

    }    
    useEffect(() => {
        getdatatable();
        getsku_masters();
        skuTypelist();
        getuom();
        // getskuproperties()
    }, []);

    useEffect(() => {
        getdatatable();
    }, [sku_masters]);

    var datatable = "";
    const getdatatable = async () => {
        if (datatable) {
            $('#customdatatable').DataTable().destroy();
        }
        $(document).ready(function () {
            setTimeout(function () {
                datatable = $('#customdatatable').DataTable();
            }, 500);
        });
    }

    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'SKU Add' },
                    ]}
                />
            </div>
            <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={() => navigate('/SkuMasters')}>
                Back to Sku Master
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>

            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <AutoComplete
                            className="required"
                            fullWidth
                            options={SkuTypeList}
                            // getOptionLabel={(option) => option.label}
                            onChange={(event, value) => changedropdownvalue('id', value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Product Group"
                                    variant="outlined"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                    value={formdata.id}
                                    name="id"
                                />
                            )}
                        />
                        <TextField
                            className="required"
                            id="skutypename"
                            label="Name of SKU"
                            type="text"
                            fullWidth
                            name="SKUName"
                            value={formdata.SKUName || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            // validators={['required', 'matchRegexp:^[a-zA-Z0-9][[^a-zA-Z0-9 ]+$']}
                            validators={['required']}
                            errorMessages={['this field is required', 'Only Characters allowed']}
                        />
                        <TextField
                            className="required"
                            id="remark"
                            label="Remark"
                            type="text"
                            multiline
                            rows={3}
                            name="remark"
                            value={formdata.remark || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            className="required"
                            id="SKUCode"
                            label="SKU code"
                            type="text"
                            fullWidth
                            name="SKUCode"
                            value={formdata.SKUCode || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            className="required"
                            id="priceOfSKU"
                            label="SKU Price"
                            type="text"
                            fullWidth
                            name="priceOfSKU"
                            value={formdata.priceOfSKU || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required','matchRegexp:^[0-9]+([.][0-9]+)?$']}
                            errorMessages={['this field is required','only numbers allowed']}
                        />
                        <AutoComplete
                            fullWidth
                            // defaultValue={selectedfield}
                            options={uomoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => changedropdownvalue('uomId', value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="UOM"
                                    variant="outlined"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                    value={formdata.uomId}
                                    name="uomId"
                                />
                            )}
                        />
                        <TextField
                            className="required"
                            id="weightPerPiece"
                            label="Weight Per Piece"
                            type="text"
                            fullWidth
                            name="weightPerPiece"
                            value={formdata.weightPerPiece || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required','matchRegexp:^[0-9]+([.][0-9]+)?$']}
                            errorMessages={['this field is required','only numbers allowed']}
                        />
                        </Grid>
                </Grid>
                {/* </DialogContent> */}

               <Box marginTop='4%'>
               {showtable ?
                <table  className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            {skuproperties.map((skupropery, index) => {
                                if(skupropery.isSearchable){
                                return (
                                    <th>{skupropery.label}</th>
                                )
                                }else{
                                    return null
                                }

                                })}
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                        {skuproperties.map((skuproperties,indexinner) => {
                             if(skuproperties.isSearchable){
                           return (
                                    <td className="dropdowntd"><AutoComplete
                                            options={propertyoptions[skuproperties.skuPropertiesMastersId]}
                                            getOptionLabel={(option) => option.label}
                                            onChange={(e,value,name,type) => changeafterdropdownvalue(e,value,'proptype_'+skuproperties.skuPropertiesMastersId,'proptype')}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label={skuproperties.label}
                                                    variant="outlined"
                                                    
                                                    value={formdata.proptype['proptype_'+skuproperties.skuPropertiesMastersId]!== undefined ? formdata.proptype['proptype_'+skuproperties.skuPropertiesMastersId] : '' }
                                                    name={'proptype_'+skuproperties.skuPropertiesMastersId}
                                                />
                                            )}
                                 /></td>
                                  )
                                   }else{
                                    return null
                                }
                              })}  
                    </tbody>
                </table>: ''}
                </Box>
                <Grid>
                    <Button
                        variant="outlined"
                        color="secondary"
                        // onClick={handleClose}
                        onClick={() => navigate('/SkuMasters')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant="outlined">
                        Save
                    </Button>
                </Grid>
                {/* </DialogActions> */}
            </ValidatorForm>

        </Container>
    )
}

export default AppTable      