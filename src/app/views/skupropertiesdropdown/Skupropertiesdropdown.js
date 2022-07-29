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
    
    const [formdata,setFormData]=useState({dropdownName:""})
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    
    const model='sku_properties_dropdown_value_masters';
    
    const [sku_properties_dropdown,setsku_properties_dropdown]=useState([]);
    const [sku_mastersoptions,setsku_mastersoptions]=useState([]);
    const [sku_masters,setsku_masters]=useState([])

    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const [selectedsku,setselectedsku]=useState({})
    
    const [skuproperties,setskuproperties]=useState([])
    
    function setdefaultvalue(){
        setselectedsku()
        
        setFormData({skuPropertyId:"",dropdownName:"",isActice:1})
    }

	function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
        
    }
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['skuPropertyId']:sku_properties_dropdown[id].skuPropertyId,
            ['dropdownName']:sku_properties_dropdown[id].dropdownName,
            ['isActive']:sku_properties_dropdown[id].isActive
        }));
        setselectedsku(getSelectedItem(sku_properties_dropdown[id].skuPropertyId))
        setEditId(sku_properties_dropdown[id].id)
        setIsEdit(true)
        setOpen(true)
        
        
    }
    function getSelectedItem(id){
        const item = sku_mastersoptions.find((opt)=>{

            
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
        try{
            var response ="";
            if(is_edit){
                response =  await postDataFromApi('masters/allMasters/updateskuPropertiesDropdownValueMasters/'+edit_id, formdata);
            }
            else{
                response = await postDataFromApi('masters/allMasters/createskuPropertiesDropdownValueMasters', formdata);
            }
            console.log('edit response',response)
            if(response.data.code){
                getsku_properties_dropdown()
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
        } catch (e) {
            setOpen(false)
                setalermessage('Something went wrong!!')
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
        
        if(e){
           var value=e.id
        }else{
            var value=""
        }
        setFormData((formData) => ({
            ...formData,
            [type]:value,
        }));
       
        
    } 
   
   

    useEffect(() => {
        getdatatable();
        getsku_masters();

        getsku_properties_dropdown();
        
    }, []);

    useEffect(() => {
        getdatatable();
    }, [sku_properties_dropdown]); 

  

    var datatable="";
    
    const getdatatable = async () => {
        if(datatable){
           
            $('#customdatatable').DataTable().destroy();
        }
        
        $(document).ready(function () {
            setTimeout(function(){
                
                datatable=$('#customdatatable').DataTable();
                
            } ,500);
        });
    }
   
    const getsku_masters = async () => {
        
        
        const response = await getDataFromApi('masters/allMasters/getSkuDropdownsProperty');
        if(response && response.data.code && response.data.data!=null){
            setsku_masters(response.data.data);
            var sku_mastersopts=[];
            response.data.data.map((sku_masters,i)=>{
                var sk=[];
                sk['id']=sku_masters.id
                sk['label']=sku_masters.label
                sku_mastersopts.push(sk)
            })
            setsku_mastersoptions(sku_mastersopts)
            console.log('sku_masters data',response);
        }
        
    } 

    const getsku_properties_dropdown = async () => {
        
        // var query = "model="+model
        // const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        const response = await getDataFromApi('masters/allMasters/getSkuPropertyDropdownsListMaster');
        if(response && response.data.code && response.data.data!=null){
            setsku_properties_dropdown(response.data.data);
            console.log('sku_properties_dropdown',response);
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
            getsku_properties_dropdown()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
             $('#customdatatable').DataTable().destroy();
            // getdatatable();
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
		                        { name: 'SKU Properties Dropdown' },
		                    ]}
		                />
		      </div>
              <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
               Add SKU Dropdown
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>   
		      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table display table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>Property</th>
	                        <th>Dropdown Name</th>
                            <th>Status</th>
	                        <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {sku_properties_dropdown.map((properties_dropdown, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
                               
	                           <td align="left">
                                    {properties_dropdown.skuPropertyName}
                                </td>
                                <td align="left">
                                    {properties_dropdown.dropdownName}
                                </td>
                                <td><span className="ac_inactive">{properties_dropdown.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    checked={properties_dropdown.isActive}
                                    onChange={()=>handleproperties_mastersChange(properties_dropdown.id,properties_dropdown.isActive)}
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add'} SKU Properties Dropdown</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                                <AutoComplete
                                    fullWidth

                                    defaultValue={selectedsku}

                                    options={sku_mastersoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('skuPropertyId',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="SKU Properties"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.skuPropertyId}
                                            name="skuPropertyId"
                                        />
                                    )}
                                />
                                <TextField
                                    className="required"
                                    id="label"
                                    label="Dropdown Name"
                                    type="text"
                                    fullWidth
                                    name="dropdownName"
                                    value={formdata.dropdownName}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                            </Grid>
                        </Grid>  
                         
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