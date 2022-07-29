import React,{useEffect,useState} from 'react'
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
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
import { ValidatorForm, TextValidator,SelectValidator } from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'
import MenuItem from "@material-ui/core/MenuItem";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';
import SweetAlert from 'react-bootstrap-sweetalert';
import AlertMessage from '../commoncomponent/AlertMessage'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip';
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


const customerList = [
    {
        id: '1',
        firmName: 'test',
        ContactPersonName : 'test1',
        phoneNo : '1237854234',
    },
    {
        no: '2',
        firmName: 'test1',
        ContactPersonName : 'test1',
        phoneNo : '1237854234',
    }
    
]

const states = [
    {
        stateName: 'gujarat',
       
    }
    
]
const cities = [
    {
        cityName: 'amhedabad',
       
    }
    
]

const AppTable = () => {
    const navigate = useNavigate()
    const [states,setstates]=useState([])
    const [cities,setcities]=useState([])
	const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)
    const [formdata,setFormData]=useState({firmName:"",ContactPersonName:"",
    address:"",officeAddress:"",phoneNo:"",emailId:"",stateId:"",cityId:"",GSTNo:"",PanNo:"",ASOMaster:"",BM:""}) 
	const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const [skuproperties,setskuproperties]=useState([])
    const [customerList,setpayment]=useState([])
    const model='customer_masters';
    
 
	function handleClickOpen() {
		setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit() {
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
    
   
    // function changedropdownvalue(type,e){
    //     if(e){
    //        var value=e.id
    //     }else{
    //         var value=""
    //     }
    //     setFormData((formData) => ({
    //         ...formData,
    //         [type]:value,
    //     }));
    //     if(e){
    //         if(type == 'SKU'){
    //           getskuproperties(e.id)
    //         }
    //     }else{
    //         getskuproperties()
            
    //     }
    // }

    const handleCustomerChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            // $('#customdatatable').DataTable().destroy();
            console.log(response.data.message);
            getAllCustomer();

            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
           
            // getdatatable();
        }
        else{
            getAllCustomer();
           
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
            $('#customdatatable').DataTable().destroy();
            // getdatatable();
        }
    }

    useEffect(() => {
        // getdatatable();
        // getcustomerList()
        getAllCustomer();
    }, []);
    
    useEffect(() => {
        // getdatatable();
    }, [customerList]);
    function confirm() {
        setalert(false)
        
    }

    const getcustomerList = async () => {
        
        var query = "model="+model
        const response = await postDataFromApi('masters/allMasters/', query);
        if(response && response.data.code && response.data.data!=null){
            setstates(response.data.data);
            console.log('states data',response);
            getdatatable()
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
            } ,500);
        });
    }
    

    


    const getAllCustomer = async () => {
      
        var query = "model=customer_masters"

        const response = await postDataFromApi('masters/allMasters/',query);
        if(response && response.data.code && response.data.data!=null){
            setpayment(response.data.data);
            getdatatable()
            console.log('menumaster data',response);
        }
        
    } 

    
    const switchStyles = useN01SwitchStyles();
    return (
     <Container>
	     <div className="breadcrumb leftalign_breadcrumb">
	                <Breadcrumb
	                    routeSegments={[
	                        { name: 'Customer' },
	                    ]}
	                />
	      </div>
          <AlertMessage
                alert={alert}
                alermessage={alermessage}
                confirm={confirm}
                alerttype={alerttype}
            />
          <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={() => navigate('/customer/add')}>
               Add new Customer
            </Button>
          
	      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>Firm Name</th>
	                        <th>Contact Person Name</th>
                            <th>phone No</th>
                            <th>Status</th>
	                        <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {customerList.map((customer, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            <td align="left">
	                                {customer.firmName}
	                            </td>
	                            <td>{customer.ContactPersonName}</td>
                                <td>{customer.phoneNo}</td>
                                {/* <td>{customer.Status}</td> */}
                                <td><span className="ac_inactive">{customer.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={customer.isActive ? "Active" : "Inactive"}
					                checked={customer.isActive}
					                onChange={()=>handleCustomerChange(customer.id,customer.isActive)}
					                value={customer.isActive ? "Active" : "Inactive"}
					                inputProps={{ 'aria-label': 'secondary checkbox' }}
					            /></td>
	                            <td>
                                    <Tooltip title="Edit">
	                                <IconButton onClick={() => navigate('/customer/edit/'+customer.id)}>
	                                    <Icon color="primary">edit</Icon>
	                                </IconButton>
                                     </Tooltip>
                                    <Tooltip title="View">
                                        <IconButton onClick={() => navigate('/customer/view/'+customer.id)}>
                                            <Icon color="primary">remove_red_eye</Icon>
                                        </IconButton>
                                    </Tooltip>
	                            </td>
	                        </tr>
	                    ))}
	                </tbody>
	            </table>
	        </Box>
	        
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