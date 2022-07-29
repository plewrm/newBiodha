import React,{useEffect,useState} from 'react'
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
import { ValidatorForm, TextValidator ,SelectValidator } from 'react-material-ui-form-validator'
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
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';

import AlertMessage from '../commoncomponent/AlertMessage'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';


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
        sku: 11323,
        skulabel: 'test'
       
    },
    {
        id: '2',
        sku: 11323,
        skulabel: 'test'
       
    }
    
]
const SKU = [
    { id:'1', label: '1234' },
]
const fieldTypelist = [
    { id:'1', label: 'text' },
    { id:'2', label: 'dropdown' },
]



const  AppTable = () => {

    
    const switchStyles = useN01SwitchStyles();
    const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)
    
    const [formdata,setFormData]=useState({skulabel:""})
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    
    const model='sku_properties_masters';
    
    const [sku_properties_masters,setsku_properties_masters]=useState([]);
    const [sku_mastersoptions,setsku_mastersoptions]=useState([]);
    const [sku_masters,setsku_masters]=useState([])

    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const [selectedsku,setselectedsku]=useState({})
    const [selectedfield,setselectedfield]=useState({})
    const [skuproperties,setskuproperties]=useState([])
    
    function setdefaultvalue(){
        setselectedsku()
        setselectedfield()
        setFormData({skuId:"",label:"",fieldType:"",isActice:1})
    }

	function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
        getskuproperties()
    }
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['skuId']:sku_properties_masters[id].skuId,
            ['label']:sku_properties_masters[id].label,
            ['fieldType']:sku_properties_masters[id].fieldType,
            ['isActive']:sku_properties_masters[id].isActive
        }));
        setselectedsku(getSelectedItem(sku_properties_masters[id].skuId))
        setselectedfield(getSelectedItemfield(sku_properties_masters[id].fieldType))
        setEditId(sku_properties_masters[id].id)
        setIsEdit(true)
        setOpen(true)
        getskuproperties(sku_properties_masters[id].skuId)
        //getdatatable()
    }
    function getSelectedItem(id){
        const item = sku_mastersoptions.find((opt)=>{

            
          if (opt.id == id)
            return opt;
        })
        return item || {};

    }
    function getSelectedItemfield(id){
        const item = fieldTypelist.find((opt)=>{

            
          if (opt.label == id)
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
        var response ="";
        if(is_edit){
            response =  await postDataFromApi('masters/allMasters/updateSkuPropertiesMasters/'+edit_id, formdata);
        }
        else{
            response = await postDataFromApi('masters/allMasters/createSkuPropertiesMasters', formdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            getsku_properties_masters()
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
        }
    }

    function formdatavaluechange(e){
        var value=e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    } 
    function changedropdownvalue(type,e){
        $('#property').DataTable().destroy();
        if(e){
           var value=e.id
        }else{
            var value=""
        }
        setFormData((formData) => ({
            ...formData,
            [type]:value,
        }));
       
        if(e){
            if(type == 'skuId'){
                getskuproperties(e.id)
                //getdatatable();
            }
        }else{
            getskuproperties()
            //$('#property').DataTable().destroy();
        }
    } 
   
   const getskuproperties = async (id) => {
                var query = "skuId="+id
                const response = await postDataFromApi('masters/allMasters/getSkuPropertyList', query);
                if(response && response.data.code && response.data.data!=null){
                    setskuproperties(response.data.data);
                    console.log('SKU properties',response);
                }
    }

    useEffect(() => {
        getdatatable();
        getsku_masters();

        getsku_properties_masters();
        // getskuproperties();
    }, []);

    useEffect(() => {
        getdatatable();
    }, [sku_properties_masters]); 

  

    /*useEffect(() => {
        getdatatable();
    }, [skuproperties]);*/

    var datatable="";
    
    const getdatatable = async () => {
        if(datatable){
            //$('table.display').DataTable().destroy();
            $('#customdatatable').DataTable().destroy();
        }
        
        $(document).ready(function () {
            setTimeout(function(){
                //datatable=$('table.display').DataTable();
                datatable=$('#customdatatable').DataTable();
                
            } ,2000);
        });
    }
   
    const getsku_masters = async () => {
        
        var query = "model=sku_type_masters"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if(response && response.data.code && response.data.data!=null){
            setsku_masters(response.data.data);
            var sku_mastersopts=[];
            response.data.data.map((sku_masters,i)=>{
                var um=[];
                um['id']=sku_masters.id
                um['label']=sku_masters.skuTypeName
                sku_mastersopts.push(um)
            })
            setsku_mastersoptions(sku_mastersopts)
            console.log('sku_masters data',response);
        }
        
    } 

    const getsku_properties_masters = async () => {
        
        var query = "";
        // const response = await postDataFromApi('masters/allMasters/', query);
        // const response = await getDataFromApi('masters/allMasters/skuPropertyDropdownList', query);
        const response = await getDataFromApi('masters/allMasters/skuPropertyListMaster', query);
        if(response && response.data.code && response.data.data!=null){
            setsku_properties_masters(response.data.data);
            console.log('sku_properties_masters',response);
        }
        
    } 
    const handleproperties_mastersChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            console.log(response.data.message)
            getsku_properties_masters()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            $('#customdatatable').DataTable().destroy();
            getdatatable();
        }
        else{
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }
    
    function confirm(){
        setalert(false)
    }
	return (
        <Container>
	        <div className="breadcrumb leftalign_breadcrumb">
		                <Breadcrumb
		                    routeSegments={[
		                        { name: 'SKU Properties' },
		                    ]}
		                />
		      </div>
              <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
               Add SKU Properties
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>   
		      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table display table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        {/*<th>SKU</th>*/}
                            <th>SKU Label</th>
                            <th>Field Type</th>
                            <th>Status</th>
	                        <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {sku_properties_masters.map((properties_masters, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            {/*<td align="left">
	                                {properties_masters.skuId}
	                            </td>*/}
                                <td align="left">
                                    {properties_masters.label}
                                </td>
                                <td align="left">
                                    {properties_masters.fieldType}
                                </td>
                                <td><span className="ac_inactive">{properties_masters.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    checked={properties_masters.isActive}
                                    onChange={()=>handleproperties_mastersChange(properties_masters.id,properties_masters.isActive)}
                                    value="active"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                /></td>
	                            <td>
	                                <IconButton onClick={()=>handleClickEdit(index)}>
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
            >
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add'} SKU Properties</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                {/*<AutoComplete
                                    fullWidth
                                    
                                    defaultValue={selectedsku}

                                    options={sku_mastersoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('skuId',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="SKU Type"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.skuId}
                                            name="skuId"
                                        />
                                    )}
                                />*/}
                                <AutoComplete
                                    fullWidth
                                    defaultValue={selectedfield}
                                    options={fieldTypelist}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('fieldType',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Field Type"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.fieldType}
                                            name="fieldType"
                                        />
                                    )}
                                />
                                
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    className="required"
                                    id="label"
                                    label="Properties Label"
                                    type="text"
                                    fullWidth
                                    name="label"
                                    value={formdata.label || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                            </Grid>
                         </Grid>  
                         {/*<table  id="property" className="table display table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>label</th>
                                    <th>Field Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skuproperties.map((skuproperty, index) => (
                                    <tr key={index}>
                                        <td align="left">
                                            {index+1}
                                        </td>
                                        <td align="left">
                                            {skuproperty.label}
                                        </td>
                                        <td align="left">
                                            {skuproperty.fieldType}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>  */}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
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
                    {"Are You Sure You Want to delete this record?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handledeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handledeleteClose} color="primary" >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
		 </Container>
    )
}

export default AppTable      