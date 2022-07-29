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
    FormControlLabel,
    Checkbox,
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
import Switch from '@mui/material/Switch'

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';
import $ from 'jquery';
import SweetAlert from 'react-bootstrap-sweetalert';
import AlertMessage from '../commoncomponent/AlertMessage'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01'

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

const PaymenttermsList = [
    {
        id: '1',
        paymentterms: 'test1',
    },
    {
        id: '2',
        paymentterms: 'test1',
    }
    
]

const AppTable = () => {
    const [payment,setpayment]=useState([])
   
    const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)
    const [formdata,setFormData]=useState({paymentTerms:"", isCreditApprove:""})
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const model='payment_terms';

    const handlePaymentChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            console.log(response.data.message);
            getpayment()

            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            $('#customdatatable').DataTable().destroy();
            // getdatatable();
        }
        else{
            getpayment()
           
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
            $('#customdatatable').DataTable().destroy();
            // getdatatable();
        }
    }//New

	function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
   
    function handleClose() {
        setOpen(false)
    }
    function handleDeleteOpen() {
        setDeleteOpen(true)
    }

    function setdefaultvalue(){
        setFormData({uomName:""})
    }
    function handledeleteClose() {
        setDeleteOpen(false)
    } 
    function handledeleteClose() {
        setDeleteOpen(false)
    } 
   
    // function formdatavaluechange(e){
    //     var value=e.target.value.trimStart()
    //     setFormData((formData) => ({
    //         ...formData,
    //         [e.target.name]:value,
    //     }));
    // }

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
  
    const handleFormulaChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        
    }
    const getpaymentTerms = async () => {
        //console.log('hi');
        var query = "model="+model
        const response = await postDataFromApi('masters/allMasters/',query);
        if(response && response.data.code && response.data.data!=null){
            setpayment(response.data.data);
            console.log('menumaster data',response);
        }
        
    } 

    const getcreateapprove = async () => {
        //console.log('hi');
        var query = "model="+model
        const response = await postDataFromApi('masters/allMasters/',query);
        if(response && response.data.code && response.data.data!=null){
            setpayment(response.data.data);
            console.log('menumaster data',response);
        }
        
    } 
    
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['paymentTerms']:payment[id].paymentTerms,
            ['isCreditApprove']:payment[id].isCreditApprove,
            
            
        }));
        setEditId(payment[id].id)
        setIsEdit(true)
        setOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var response ="";
        if(is_edit){
             response = await postDataFromApi('masters/allMasters/updatePaymentTermsMasters/'+edit_id, formdata);
        }
        else{
             response = await postDataFromApi('masters/allMasters/createPaymentTermsMasters', formdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            getpaymentTerms()
            getcreateapprove()
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

    useEffect(() => {
        getpayment()//New
       getdatatable();
       getpaymentTerms()
       getcreateapprove()
       }, []);

       const getpayment = async () => {
        
        var query = "model="+model
        const response = await postDataFromApi('masters/allMasters/', query);
        if(response && response.data.code && response.data.data!=null){
            setpayment(response.data.data);
            console.log('states data',response);
            getdatatable()
        }
        
    }   //new

    const getdatatable = async () => {
        
        $(document).ready(function () {
        setTimeout(function(){
        $('#customdatatable').DataTable();
             } ,1000);
        });
        
    }
    
    const switchStyles = useN01SwitchStyles();
	return (
        <Container>
	        <div className="breadcrumb leftalign_breadcrumb">
		                <Breadcrumb
		                    routeSegments={[
		                        { name: 'Payment Terms' },
		                    ]}
		                />
		      </div>
              <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
               Add Payment Terms
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>
		      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>Payment Terms</th>
                            <th>Credit Approve</th>
                            <th>Status</th>
                            <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {payment.map((paymentterms, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            <td align="left">
	                                {paymentterms.paymentTerms}
	                            </td>
                                <td align="left">
	                                {paymentterms.isCreditApprove == 0 ? 'No' : 'Yes'}
	                            </td>
                                <td><span className="ac_inactive">{paymentterms.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={paymentterms.isActive ? "Active" : "Inactive"}
					                checked={paymentterms.isActive}
					                onChange={()=>handlePaymentChange(paymentterms.id,paymentterms.isActive)}
					                value={paymentterms.isActive ? "Active" : "Inactive"}
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add'}  Payment Terms</DialogTitle>
                    <DialogContent>
                        <TextField
                            className="required"
                            id="paymentTerms"
                            label="Payment Terms"
                            type="text"
                            fullWidth
                            name="paymentTerms"
                            value={formdata.paymentTerms || ''}
                            onChange={(e)=>formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            multiline
                            rows={3}
                            
                        /> 
                        
                        <TextField
                                className="required hidden"
                                type="hidden"
                                name={formdata.typeOfDispatch}
                                value="0"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Is Credit Approve"
                                name="isCreditApprove"
                                checked={
                                    formdata.isCreditApprove !== '0' &&
                                    formdata.isCreditApprove !=='1' &&
                                    formdata.isCreditApprove
                                        ? true
                                        : false
                                }
                                onChange={(e) =>
                                    formdatavaluechange(e, 'checkbox')
                                }
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