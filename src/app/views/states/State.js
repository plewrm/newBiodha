import React,{useEffect,useState} from "react";
import style from 'Assets/css/style.css'
import SimpleTable from '../material-kit/tables/SimpleTable'
import PaginationTable from '../material-kit/tables/PaginationTable'
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
import { Alert, Snackbar, SnackbarContent } from '@mui/material'
// import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import SweetAlert from 'react-bootstrap-sweetalert';
import AlertMessage from '../commoncomponent/AlertMessage'
import { Autocomplete } from '@mui/lab'

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


const subscribarList = [
    {
        id: '1',
        stateName: 'Gujarat',
        isActive: true,
       
    },
    {
        no: '2',
        stateName: 'Maharashtra',
        isActive: false,
       
    }
    
]

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
   
    const [states,setstates]=useState([])
    // const [states,setstates]=useState(subscribarList)
    const model='states';
	const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)
    
    const [formdata,setFormData]=useState({stateName:"",isActice:1})
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const [countryoptions, setcountryoptions] = useState([])
    const [selectedcountry, setselectedcountry] = useState({})
     
    

    //const [statename,setStatename]=useState="";

	// const [state, setState] = React.useState({
 //        active: true,
 //        deactive: true,
 //    })

    const handleStateChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            console.log(response.data.message);
            getstates()

            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            $('#customdatatable').DataTable().destroy();
            // getdatatable();
        }
        else{
            getstates()
           
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
            $('#customdatatable').DataTable().destroy();
            // getdatatable();
        }
    }

    useEffect(() => {
        getCountries()
        getstates();
        // getdatatable();
    }, []);

    useEffect(() => {
        getdatatable();
    }, [states]);
    

    const getCountries = async () => {
        var query = 'model=country_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            // setstates(response.data.data);
            var countryopts = []
            response.data.data.map((country, i) => {
                var st = []
                st['id'] = country.id
                st['label'] = country.countryName
                countryopts.push(st)
            })
            setcountryoptions(countryopts)
            console.log('states data', response)
        }
    }
    
    const getstates = async () => {
        
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
        $('#customdatatable').DataTable();
         } ,500);
    });
        
    }
    
    function setdefaultvalue(){
        setselectedcountry()
        setFormData({countryId:"",stateName:"",isActice:1})
    }
    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['countryId']:states[id].countryId,
            ['stateName']:states[id].stateName,
            ['isActive']:states[id].isActive
        }));
        setselectedcountry(getSelectedItem(states[id].countryId))
        setEditId(states[id].id)
        setIsEdit(true)
        setOpen(true)
    }
    function getSelectedItem(id){
        const item = countryoptions.find((opt)=>{

            
          if (opt.id == id)
            return opt;
        })
        return item || null;

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
    function formdatavaluechange(e){
        var value=e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    }

    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.id
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
        // if (type == 'countryId') {
        //     getstates(e.id)
        // }

        // if (type == 'stateId') {
        //     if(e){
        //       getcities(e.id)
        //     }else{
        //         getcities()
        //         setcityoptions([])
        //     }
        // }
    }
    function confirm(){
        setalert(false)
    }
    function cancelled(){

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        var response ="";
        if(is_edit){
             response = await postDataFromApi('masters/allMasters/updateStateMasters/'+edit_id, formdata);
        }
        else{
             response = await postDataFromApi('masters/allMasters/createStateMasters', formdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            getstates()
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
    const switchStyles = useN01SwitchStyles();
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'State List' },
                    ]}
                />
            </div>
            <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
               Add new State
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>
            
            <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>State</th>
	                        <th>Status</th>
	                        <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {states.map((state, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            <td align="left">
	                                {state.stateName}
	                            </td>
	                            <td><span className="ac_inactive">{state.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={state.isActive ? "Active" : "Inactive"}
					                checked={state.isActive}
					                onChange={()=>handleStateChange(state.id,state.isActive)}
					                value={state.isActive ? "Active" : "Inactive"}
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New'} State</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>

                        <AutoComplete
                                    fullWidth
                                    defaultValue={selectedcountry}
                                    options={countryoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('countryId', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Country Name"
                                            variant="outlined"
                                            fullWidth
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                            value={formdata.countryId}
                                            name="countryId"
                                        />
                                    )}
                                />
                        <TextField
                                className="required"
                                id="state"
                                label="State Name"
                                type="text"
                                fullWidth
                                name="stateName"
                                value={formdata.stateName || ''}
                                onChange={(e)=>formdatavaluechange(e)}
                                validators={['required' ,'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
                                errorMessages={['Enter state name','Only Characters allowed']}
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
                        <Button type="submit" variant="outlined" color="primary">
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
                    <Button onClick={handledeleteClose} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            
        </Container>
    )
}

export default AppTable
