import React,{useEffect,useState} from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import style from 'Assets/css/style.css'
import {
	Button,
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
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'
import { ValidatorForm, TextValidator ,SelectValidator} from 'react-material-ui-form-validator'
import MenuItem from "@material-ui/core/MenuItem";
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import SweetAlert from 'react-bootstrap-sweetalert';
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

const rolemasterList = [
    {
        id: '1',
        rolemasterName: 'test',
        
       
    },
    {
        no: '2',
        rolemasterName: 'test',
        
       
    }
    
]

const rolenameoptions = [
    { id:'1', label: 'ASO' },
    { id:'1' , label: 'BM' },
    { id:'1', label: 'Yard Person' },
    { id:'1', label: 'Account team' },
    { id:'1', label: 'Logistic Team' },
    { id:'1', label: 'Credit Team' },
]

const AppTable = () => {
  
    const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)

    const [formdata,setFormData]=useState({rolename:""})
	const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")

    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")

    const model='role_masters';
    const [role_masters,setrole_masters]=useState([])

    const switchStyles = useN01SwitchStyles();

	function setdefaultvalue(){
        setFormData({roleName:"",isActice:1})
    }
    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }

    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['roleName']:role_masters[id].roleName,
            ['isActive']:role_masters[id].isActive
        }));
        setEditId(role_masters[id].id)
        setIsEdit(true)
        setOpen(true)
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
             response = await postDataFromApi('masters/allMasters/updateRoleMasters/'+edit_id, formdata);
        }
        else{
             response = await postDataFromApi('masters/allMasters/createRoleMasters', formdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            getrole_masters()
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
    useEffect(() => {
        getdatatable();
        getrole_masters();
    }, []);
    useEffect(() => {
        getdatatable();
    }, [role_masters]);
    
    const getrole_masters = async () => {
        
        var query = "model="+model
        const response = await postDataFromApi('masters/allMasters/', query);
        if(response && response.data.code && response.data.data!=null){
            setrole_masters(response.data.data);
            console.log('role_masters',response);

        }
        
    }

    var datatable="";
    const getdatatable = async () => {
        if(datatable){
            $('#customdatatable').DataTable().destroy();
        }
        $(document).ready(function () {
            setTimeout(function(){
                datatable=$('#customdatatable').DataTable();
            } ,1000);
        });
    }

     function formdatavaluechange(e){
        var value=e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    }

    function confirm(){
        setalert(false)
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

     const handleStateChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            console.log(response.data.message);
            getrole_masters()
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
            $('#customdatatable').DataTable().destroy();
            getdatatable();
        }
    }

	return (
        <Container>
	        <div className="breadcrumb leftalign_breadcrumb">
		                <Breadcrumb
		                    routeSegments={[
		                        { name: 'Role Master' },
		                    ]}
		                />
		      </div>
              <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
               Add new Role
               </Button>
               <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/> 
		  <Box width="100%" overflow="auto">
            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>Role Name</th>
                            <th>Status</th>
	                        <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {role_masters.map((rolemasters, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            <td align="left">
	                                {rolemasters.roleName}
	                            </td>
                                <td><span className="ac_inactive">{rolemasters.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={rolemasters.isActive ? "Active" : "Inactive"}
                                    checked={rolemasters.isActive}
                                    onChange={()=>handleStateChange(rolemasters.id,rolemasters.isActive)}
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New' } Role</DialogTitle>
                    <DialogContent>
                                <TextField
                                className="required"
                                id="roleName"
                                label="Role Name"
                                type="text"
                                fullWidth
                                name="roleName"
                                value={formdata.roleName || ''}
                                onChange={(e)=>formdatavaluechange(e)}
                                validators={['required' ,'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
                                errorMessages={['this field is required','Only Characters allowed']}
                            />
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
                    <Button onClick={handledeleteClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
		 </Container>
    )
}

export default AppTable      