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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@mui/material/FormControl'
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

const yardList = [
    {
        id: '1',
        yardName: 'test',
        yardNumber : 12323,
       
    },
    {
        no: '2',
        yardName: 'test1',
        yardNumber : 1323,
       
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
    
    const switchStyles = useN01SwitchStyles();
    const [states,setstates]=useState([])
    const [cities,setcities]=useState([])
    const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)

    const [formdata,setFormData]=useState({location:""})
	const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    const [yards,setyards]=useState([])

    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const [selectedstate,setselectedstate]=useState({})
    const [selectedcity,setselectedcity]=useState({})
    
    function setdefaultvalue(){
        setselectedstate();
        setselectedcity();
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
            ['stateId']:yards[id].stateId,
            ['cityId']:yards[id].cityId,
            ['location']:yards[id].location,
            ['nameOfYard']:yards[id].nameOfYard
        }));
        setselectedstate(getSelectedItem(yards[id].stateId))
        setselectedcity(getSelectedItemcity(yards[id].cityId))
        setEditId(yards[id].id)
        setIsEdit(true)
        setOpen(true)
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
    const handleCityChange = async(id,isActive) => {
        isActive=isActive ? 0 : 1;
        var query = "tableName=yard_masters&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            console.log(response.data.message)
            getyards()
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
            response =  await postDataFromApi('masters/allMasters/updateYardMasters/'+edit_id, formdata);
        }
        else{
            response = await postDataFromApi('masters/allMasters/createYardMasters', formdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            getcities()
            getstates()
            getyards();
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
        getstates();
        getcities();
        getyards();
        getdatatable();
    }, []);
    
    useEffect(() => {
        getdatatable();
    }, [yards]);

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

    const getyards = async () => {
        
        var query = ""
        const response = await getDataFromApi('masters/allMasters/yardMasterList', query);
        if(response && response.data.code && response.data.data!=null){
            setyards(response.data.data);
            console.log('yards data',response);
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
    function confirm(){
        setalert(false)
    }

	return (
        <Container>
	        <div className="breadcrumb leftalign_breadcrumb">
		                <Breadcrumb
		                    routeSegments={[
		                        { name: 'Yard' },
		                    ]}
		                />
		      </div>
              <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
               Add new Yard
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>     
		      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>Yard Name</th>
	                        <th>location</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Status</th>
	                        <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {yards.map((yard, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            <td align="left">
	                                {yard.nameOfYard}
	                            </td>
	                            <td>{yard.location}</td>
                                <td>{yard.stateName}</td>
                                <td>{yard.cityName}</td>
                                <td><span className="ac_inactive">{yard.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    checked={yard.isActive}
                                    onChange={()=>handleCityChange(yard.id,yard.isActive)}
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New' } Yard</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
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
                                <TextField
                                    className="required"
                                    id="location"
                                    label="Location"
                                    type="text"
                                    fullWidth
                                    name="location"
                                    value={formdata.location || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    multiline
                                    rows={3}
                                />
                               
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
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
                                <TextField
                                    className="required"
                                    id="nameOfYard"
                                    label="Name of yard"
                                    type="text"
                                    fullWidth
                                    name="nameOfYard"
                                    value={formdata.nameOfYard || ''}
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