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
import { ValidatorForm, TextValidator ,SelectValidator} from 'react-material-ui-form-validator'
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
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
import AlertMessage from '../commoncomponent/AlertMessage'
import { useNavigate } from 'react-router-dom'

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




const AppTable = () => {
    const navigate = useNavigate()
    const [sku_masters,setsku_masters]=useState([])
    const model='sku_masters';
    const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)

    const [formdata,setFormData]=useState({SKUName:""})
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    
    const switchStyles = useN01SwitchStyles();
     
    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const [uomoptions,setuomoptions]=useState([]);
    const [uom,setuom]=useState([])
    const [selectedfield,setselectedfield]=useState({})
    const [SkuTypeList,setSkuTypeList]=useState([])
    const [SkuType,setSkuType]=useState([])
    const getuom = async () => {
        
        var query = "model=uom_masters"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if(response && response.data.code && response.data.data!=null){
            setuom(response.data.data);
            var uomopts=[];
            response.data.data.map((uom,i)=>{
                var um=[];
                um['id']=uom.id
                um['label']=uom.uomName
                uomopts.push(um)
            })
            setuomoptions(uomopts)
            console.log('uom_masters data',response);
        }
        
    } 
    
    function setdefaultvalue(){
        setselectedfield()
        setFormData({SKUName:"",uomId:"",SKUCode:"",priceOfSKU:"",remark:"",isActice:1})
    }
    
    
	function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['SKUName']:sku_masters[id].SKUName,
            ['SKUCode']:sku_masters[id].SKUCode,
            ['priceOfSKU']:sku_masters[id].priceOfSKU,
            ['uomId']:sku_masters[id].uomId,
            ['remark']:sku_masters[id].remark,
            ['isActive']:sku_masters[id].isActive
        }));
        setEditId(sku_masters[id].id)
        setselectedfield(getSelectedItemfield(sku_masters[id].uomId))
        setIsEdit(true)
        setOpen(true)
    }
    function getSelectedItemfield(id){
        const item = uomoptions.find((opt)=>{

            
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
        var response ="";
        if(is_edit){
             response = await postDataFromApi('masters/allMasters/updateSkuMasters/'+edit_id, formdata);
        }
        else{
             response = await postDataFromApi('masters/allMasters/createSkuMasters', formdata);
        }
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
        }

    }
    function confirm(){
        setalert(false)
    }

    const getsku_masters = async () => {
        
        var query = "model="+model
        const response = await postDataFromApi('masters/allMasters/skuMastersListing/', query);
        if(response && response.data.code && response.data.data!=null){
            setsku_masters(response.data.data);
            console.log('sku_masters data',response);

        }
        
    }
    const skuTypelist = async () => {
        var query = "model=sku_masters"
        const response = await postDataFromApi('masters/allMasters/', query);
        if (response && response.data.code && response.data.data != null) {
            setSkuType(response.data.data);
            var skutype = [];
            response.data.data.map((sku, i) => {
                var st = [];
                st['id'] = sku.skuTypeId
                st['label'] = sku.SKUName
                skutype.push(st)
            })
            setSkuTypeList(skutype)
            console.log('employee data', response);
        }

    }
   
    function formdatavaluechange(e){
        var value=e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    }
     
    const handleStateChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            setOpen(false)
            getsku_masters()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            $('#customdatatable').DataTable().destroy();
            getdatatable();
        }
        else{
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
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
        skuTypelist();
        getuom();
    }, []);
     
    useEffect(() => {
        getdatatable();
    }, [sku_masters]); 

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
    
	return (
        <Container>
	        <div className="breadcrumb leftalign_breadcrumb">
		                <Breadcrumb
		                    routeSegments={[
		                        { name: 'SKU Master' },
		                    ]}
		                />
		      </div>
              <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={() => navigate('/Sku/add')}>
               Add SKU
            </Button>
              <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>
		      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
                            <th>Product Group</th>
	                        <th>SKU Name</th>
                            <th>SKU Code</th>
                            <th>Status</th>
	                        <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {sku_masters.map((skumasters, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
                                <td align="left">
	                                {skumasters.skuTypeName}
	                            </td>
	                            <td align="left">
	                                {skumasters.SKUName}
	                            </td>
                                <td align="left">
                                    {skumasters.SKUCode}
                                </td>
                                <td><span className="ac_inactive">{skumasters.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={skumasters.isActive ? "Active" : "Inactive"}
                                    checked={skumasters.isActive}
                                    onChange={()=>handleStateChange(skumasters.id,skumasters.isActive)}
                                    value="active"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                /></td>
	                            <td>
	                                {/*<IconButton onClick={()=>handleClickEdit(index)}>
	                                    <Icon color="primary">edit</Icon>
	                                </IconButton>*/}
                                    <IconButton onClick={() => navigate('/Sku/view/'+skumasters.id)}>
                                            <Icon color="primary">remove_red_eye</Icon>
                                    </IconButton>
	                            </td>
	                        </tr>
	                    ))}
	                </tbody>
	            </table>
	        </Box>
	        {/* <Dialog
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                     <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add'} SKU Type</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                            <AutoComplete
                        fullWidth
                        options={SkuTypeList}
                        // getOptionLabel={(option) => option.label}
                        onChange={(event, value) => changedropdownvalue('id', value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                className="required"
                                label="SKU Type"
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
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required','matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
                                    errorMessages={['this field is required','Only Characters allowed']}
                                />
                               
                                <TextField
                                    className="required"
                                    id="remark"
                                    label="Remark"
                                    type="text"
                                    fullWidth
                                    name="remark"
                                    value={formdata.remark || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
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
                                    onChange={(e)=>formdatavaluechange(e)}
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
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <AutoComplete
                                    fullWidth
                                    defaultValue={selectedfield}
                                    options={uomoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('uomId',value)}
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
                        <Button type="submit" color="primary">
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
            </Dialog> */}
		 </Container>
    )
}

export default AppTable      