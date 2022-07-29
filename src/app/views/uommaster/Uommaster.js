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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import SweetAlert from 'react-bootstrap-sweetalert';
import AlertMessage from '../commoncomponent/AlertMessage'
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';

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

const uomList = [
    {
        id: '1',
        uomName: 'test',
        
       
    },
    {
        id: '2',
        uomName: 'test',
        
    }
    
]

const AppTable = () => {
  
    const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)
    
    const model='uom_masters';
    const [uom_masters,setuom_masters]=useState([])

    const [formdata,setFormData]=useState({uomName:""})
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const switchStyles = useN01SwitchStyles();
    
    function setdefaultvalue(){
        setFormData({uomName:""})
    }


	function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['uomName']:uom_masters[id].uomName,
            
        }));
        setEditId(uom_masters[id].id)
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

    const getuom_masters = async () => {
        
        var query = "model="+model
        const response = await postDataFromApi('masters/allMasters/', query);
        if(response && response.data.code && response.data.data!=null){
            setuom_masters(response.data.data);
            console.log('uom_masters data',response);
        }
        
    } 

    const handleStateChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            getuom_masters()
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        var response ="";
        if(is_edit){
             response = await postDataFromApi('masters/allMasters/updateUomMasters/'+edit_id, formdata);
        }
        else{
             response = await postDataFromApi('masters/allMasters/createUomMasters', formdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            getuom_masters()
            setIsEdit(false)
            setEditId("")
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
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

    function formdatavaluechange(e){
        var value=e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    }

    useEffect(() => {
        getdatatable();
        getuom_masters();
    }, []);
    useEffect(() => {
        getdatatable();
    }, [uom_masters]); 
    
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
		                        { name: 'UOM Master' },
		                    ]}
		                />
		      </div>
              <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
               Add UOM
               </Button>
               <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>
		      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>UOM</th>
                            <th>Status</th>
                            <th>Action</th>
	                    </tr>
	                </thead>
	                <TableBody>
	                    {uom_masters.map((uommasters, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            <td align="left">
	                                {uommasters.uomName}
	                            </td>
                                <td><span className="ac_inactive">{uommasters.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={uommasters.isActive ? "Active" : "Inactive"}
                                    checked={uommasters.isActive}
                                    onChange={()=>handleStateChange(uommasters.id,uommasters.isActive)}
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
	                </TableBody>
	            </table>
	        </Box>
	        <Dialog
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add'} UOM</DialogTitle>
                    <DialogContent>
                        <TextField
                            className="required"
                            id="uomName"
                            label="UOM"
                            type="text"
                            fullWidth
                            name="uomName"
                            value={formdata.uomName || ''}
                            onChange={(e)=>formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required']}
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
                    <Button onClick={handledeleteClose} color="primary" >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
		 </Container>
    )
}

export default AppTable      