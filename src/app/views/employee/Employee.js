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
import { ValidatorForm, TextValidator ,SelectValidator} from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@mui/material/FormControl'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import AlertMessage from '../commoncomponent/AlertMessage'
import moment from 'moment';
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





const aso = [
    { id:'1', label: 'ASO' },
    
]

const BM = [
    { id:'1', label: 'BM' },
]
const userlevel   = [
    { id:'1', label: 'L1' },
    { id:'2', label: 'L2' },
    { id:'3', label: 'L3' },
]

const creditlimit   = [
    { id:'1', label: '1000' },
    { id:'2', label: '2000' },
    { id:'3', label: '3000' },
]

const Yard   = [
    { id:'1', label: 'yard' },
]

const YardList   = [
    { id:'1', label: 'test' },
]


const Status = [
    { id:'1', label: 'join' },
    { id:'2', label: 'Notice' },
    { id:'3', label: 'Left' },
]

const AppTable = () => {
    const navigate = useNavigate()
    const switchStyles = useN01SwitchStyles();
    const [dateopen, setdateOpen] = useState(false);
    const [states,setstates]=useState([])
    const [cities,setcities]=useState([])
    const [employeeMaster,setemployeeMaster]=useState([])
    const [role_masters,setrole_masters]=useState([])
    const [BM,setBM]=useState([]) 
    const [BMoptions,setBMoptions]=useState([]); 
    const [roleoptions,setroleoptions]=useState([]);

	const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)
    
    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
   
    const [selectedstate,setselectedstate]=useState({})
    const [selectedcity,setselectedcity]=useState({})
    const [selectedrole,setselectedrole]=useState({})
    const [selectedBM,setselectedBM]=useState({})
    const [selectedRM,setselectedRM]=useState({})
    const [selectedstatus,setselectedstatus]=useState({})
    const [selectedcredit,setselectedcredit]=useState({})
    const [clearedDate, setClearedDate] = React.useState(null);
    const [formdata,setFormData]=useState({fullname:"",isActice:1 ,date: new Date(),})
	const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    
    function setdefaultvalue(){
        setselectedstate();
        setselectedcity();
        setselectedrole();
        setselectedBM();
        setselectedRM();
        setselectedstatus();
        setselectedcredit();
        setFormData({stateId:"",cityId:"",location:"",nameOfYard:""})
    }

	function handleClickOpen() {
        setdefaultvalue()
		setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        
        setFormData((formData) => ({
            ...formData,
            ['countryId']: formdata.countryId,//new
            ['stateId']:employeeMaster[id].stateId,
            ['cityId']:employeeMaster[id].cityId,
            ['districtId']:formdata.districtId,//new
            ['location']:employeeMaster[id].location,
            ['nameOfYard']:employeeMaster[id].nameOfYard,
            ['fullName']:employeeMaster[id].fullName,
            ['address']:employeeMaster[id].address,
            ["mobile"]:employeeMaster[id].mobile,
            ["emailId"]:employeeMaster[id].emailId,
            ["stateId"]:employeeMaster[id].stateId,
            ["cityId"]:employeeMaster[id].cityId,
            ["roleId"]:employeeMaster[id].roleId,
            ['creditLimit']:employeeMaster[id].creditLimit,
            ["BMId"]:employeeMaster[id].BMId,
            ["employeeJoiningDate"]:employeeMaster[id].date,
            ["status"]:employeeMaster[id].status,
            ["reportingManager"]:employeeMaster[id].reportingManager,
            ["password"]:employeeMaster[id].password,
        }));
        setselectedstate(getSelectedItem(employeeMaster[id].stateId))
        setselectedcity(getSelectedItemcity(employeeMaster[id].cityId))
        setselectedrole(getSelectedItemrole(employeeMaster[id].roleId))
        setselectedBM(getSelectedItemBM(employeeMaster[id].BMId))
        setselectedRM(getSelectedItemRM(employeeMaster[id].reportingManager))
        setselectedstatus(getSelectedItemstatus(employeeMaster[id].status))
        setselectedrole(getSelectedItemrole(employeeMaster[id].roleId))
        setselectedcredit(getSelectedItemcredit(employeeMaster[id].creditLimit))
        

        setEditId(employeeMaster[id].id)
        setIsEdit(true)
        setOpen(true)
    }
    function getSelectedItemcredit(id){
        const item = creditlimit.find((opt)=>{

            
          if (opt.id == id)
            return opt;
        })
        return item || {};

    }
    function getSelectedItemstatus(id){
        const item = Status.find((opt)=>{

            
          if (opt.id == id)
            return opt;
        })
        return item || {};

    }
    function getSelectedItem(id){
        const item = stateoptions.find((opt)=>{

            
          if (opt.id == id)
            return opt;
        })
        return item || {};

    }
    function getSelectedItemcity(id){
        const item = cityoptions.find((opt)=>{

            
          if (opt.id == id)
            return opt;
        })
        return item || {};

    }
    function getSelectedItemrole(id){
        const item = roleoptions.find((opt)=>{
        if (opt.id == id)
            return opt;
        })
        return item || {};

    }
    function getSelectedItemBM(id){
        const item = BMoptions.find((opt)=>{
        if (opt.id == id)
            return opt;
        })
        return item || {};

    }
    function getSelectedItemRM(id){
        const item = BMoptions.find((opt)=>{
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
        console.log(formdata)
        const momentdate = moment(formdata.date);
        var newdate =momentdate.format('Y-MM-DD');
        console.log(newdate)

        var newformdata={
            'fullName':formdata.fullName,
            'address':formdata.address,
            "mobile":formdata.mobile,
            "emailId":formdata.emailId,
            "stateId":formdata.stateId,
            "cityId":formdata.cityId,
            "roleId":formdata.roleId,
            'creditLimit':formdata.creditLimit,
            "BMId":formdata.BMId,
            "employeeJoiningDate":newdate,
            "status":formdata.status,
            "reportingManager":formdata.reportingManager,
            "password":formdata.password,
            "isActive":formdata.isActice,
        }

        var editformdata={

            'id':edit_id,
            'fullName':formdata.fullName,
            'address':formdata.address,
            "mobile":formdata.mobile,
            "emailId":formdata.emailId,
            "stateId":formdata.stateId,
            "cityId":formdata.cityId,
            "roleId":formdata.roleId,
            'creditLimit':formdata.creditLimit,
            "BMId":formdata.BMId,
            "employeeJoiningDate":newdate,
            "status":formdata.status,
            "reportingManager":formdata.reportingManager,
            "password":formdata.password,
            "isActive":formdata.isActice,
        }

        console.log(editformdata);
        var response ="";
        if(is_edit){
            response =  await postDataFromApi('masters/allMasters/updateEmployeeMasters', editformdata);
        }
        else{
            response = await postDataFromApi('masters/allMasters/createEmployeeMasters', newformdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            getemployeeMaster();
            setIsEdit(false)
            setEditId("")
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
        }
        else{
            // getemployeeMaster();
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }

    }

    useEffect(() => {
        // getstates();
        // getcities();
        getemployeeMaster();
        // getrole_masters();
        // getBM();
        getdatatable();
    }, []);
    
    useEffect(() => {
        getdatatable();
    }, [employeeMaster]);

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
    const [stateoptions,setstateoptions]=useState([]);
    const [cityoptions,setcityoptions]=useState([]);
    const getstates = async () => {
        
        var query = "model=states"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if(response && response.data.code && response.data.data!=null){
            setstates(response.data.data);
            var stateopts=[];
            response.data.data.map((state,i)=>{
                var st=[];
                st['id']=state.id
                st['label']=state.stateName
                stateopts.push(st)
            })
            setstateoptions(stateopts)
            console.log('states data',response);
        }
        
    } 
    const getcities = async () => {
        
        var query = "model=citys"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if(response && response.data.code && response.data.data!=null){
            setcities(response.data.data);
            var cityopts=[];
            response.data.data.map((city,i)=>{
                var st=[];
                st['id']=city.id
                st['label']=city.cityName
                cityopts.push(st)
            })
            setcityoptions(cityopts)
            console.log('city data',response);
        }
        
    } 

    const getrole_masters = async () => {
        
        var query = "model=role_masters"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if(response && response.data.code && response.data.data!=null){
            setrole_masters(response.data.data);
            var roleopts=[];
            response.data.data.map((role,i)=>{
                var st=[];
                st['id']=role.id
                st['label']=role.roleName
                roleopts.push(st)
            })
            setroleoptions(roleopts)
            console.log('role data',response);
        }
        
    } 
    
    const getBM = async () => {
        
        var query = ""
        const response = await getDataFromApi('order/getBM', query);
        if(response && response.data.code && response.data.data!=null){
            setBM(response.data.data);
            var BMopts=[];
            response.data.data.map((BM,i)=>{
                var bm=[];
                bm['id']=BM.id
                bm['label']=BM.fullName
                BMopts.push(bm)
            })
            setBMoptions(BMopts)
            console.log('BM data',response);
        }
        
    } 

    const getemployeeMaster = async () => {
        
        var query = ""
        const response = await getDataFromApi('masters/allMasters/employeeMasterList', query);
        if(response && response.data.code && response.data.data!=null){
            setemployeeMaster(response.data.data);
            console.log('employeeMasterList data',response);
        }
        
    } 

    const handleEmpChange = async(id,isActive) => {
        isActive=isActive ? 0 : 1;
        var query = "tableName=employee_masters&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            console.log(response.data.message)
            getemployeeMaster()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            $('#customdatatable').DataTable().destroy();
            getdatatable();
        }
        else{
            getemployeeMaster()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
            getdatatable();
        }
    }
    
	const handleDateChange = (date) => {
        setFormData((formData) => ({
            ...formData,
            date,
        }));
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

    function confirm(){
        setalert(false)
    }

    return (
     <Container>
	     <div className="breadcrumb leftalign_breadcrumb">
	                <Breadcrumb
	                    routeSegments={[
	                        { name: 'Employee' },
	                    ]}
	                />
	      </div>
          <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={() => navigate('/employee/add')}>
               Add new Employee
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>     
	      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>Full Name</th>
	                        <th>Mobile</th>
                            <th>EmailId</th>
                            <th>Role</th>
                            <th>Status</th>
	                        <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {employeeMaster.map((employee, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            <td align="left">
	                                {employee.fullName}
	                            </td>
	                            <td>{employee.mobile}</td>
                                <td>{employee.emailId}</td>
                                <td>{employee.roleName}</td>
                                <td>{employee.status}</td>
	                            <td><span className="ac_inactive">{employee.isActive ? "Active" : "Inactive"}</span>
                                <Switch
                                    classes={switchStyles}
                                    checked={employee.isActive}
                                    onChange={()=>handleEmpChange(employee.id,employee.isActive)}
                                    value="active"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                    <Tooltip title="Edit">
	                                <IconButton onClick={() => navigate('/employee/edit/'+employee.id)}>
	                                    <Icon color="primary">edit</Icon>
	                                </IconButton>
                                    </Tooltip>
                                    <Tooltip title="View">
                                        <IconButton onClick={() => navigate('/employee/view/'+employee.id)}>
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
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New' } Employee</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    className="required"
                                    id="fullname"
                                    label="Full Name"
                                    type="text"
                                    fullWidth
                                    name="fullName"
                                    value={formdata.fullName || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required','matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
                                    errorMessages={['this field is required','Only Characters allowed']}
                                />
                                <TextField
                                    fullWidth
                                    className="required"
                                    label="Mobile No"
                                    type="text"
                                    name="mobile"
                                    value={formdata.mobile || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required' ,'isNumber' , 'matchRegexp:^[0-9]{10}$']}
                                    errorMessages={['this field is required','Only Numbers allowed']}
                                />
                                <AutoComplete
                                    fullWidth
                                    defaultValue={selectedstate}
                                    options={stateoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('stateId',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="State Name"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.stateId}
                                            name="stateId"
                                        />
                                    )}
                                />
                                
                                <AutoComplete
                                    fullWidth
                                    defaultValue={selectedrole}
                                    options={roleoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('roleId',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Role"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.roleId}
                                            name="roleId"
                                        />
                                    )}
                                />  
                                <AutoComplete
                                    fullWidth
                                    defaultValue={selectedBM}
                                    options={BMoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('BMId',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="BM"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.BMId}
                                            name="BMId"
                                        />
                                    )}
                                />        
                                <div className="datediv">
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            value={formdata.date}
                                            open={dateopen}
                                            onOpen={() => setdateOpen(true)}
                                            onClose={() => setdateOpen(false)} 
                                            onChange={(e)=>handleDateChange(e)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    // variant="Outlined"
                                                    className="required"
                                                    id="mui-pickers-date"
                                                    label="Employee joing date "
                                                    sx={{ mb: 2, width: '100%' }}
                                                    onClick={(e) => setdateOpen(true)}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider> 
                                </div>
                                <TextField
                                    className="required"
                                    id="address"
                                    label="Address"
                                    type="text"
                                    fullWidth
                                    name="address"
                                    value={formdata.address || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    multiline
                                    rows={3}
                                />  
                                   
                                     
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    className="required"
                                    label="Email"
                                    value={formdata.emailId || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    type="email"
                                    name="emailId"
                                    id="emailId"
                                    fullWidth
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}

                                />
                                <TextField
                                    className="required"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    name="password"
                                    value={formdata.password || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required' , 'matchRegexp:^.{5,255}$']}
                                    errorMessages={['this field is required','Minimum 5 characters required']}
                                />
                                <AutoComplete
                                    fullWidth
                                    defaultValue={selectedcity}
                                    options={cityoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('cityId',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="City"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.cityId}
                                            name="cityId"
                                        />
                                    )}
                                />
                                
                                <AutoComplete
                                    fullWidth
                                    defaultValue={selectedcredit}
                                    options={creditlimit}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('creditLimit',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Credit limit"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.creditLimit}
                                            name="creditLimit"
                                        />
                                    )}
                                />   
                                
                                <AutoComplete
                                    fullWidth
                                    
                                    options={Status}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('status',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Status"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.status}
                                            name="status"
                                        />
                                    )}
                                /> 
                                <AutoComplete
                                    fullWidth
                                    
                                    options={BMoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('reportingManager',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Reporting Manager"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.reportingManager}
                                            name="reportingManager"
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
            </Dialog>
            
            </Container>
    )
}

export default AppTable