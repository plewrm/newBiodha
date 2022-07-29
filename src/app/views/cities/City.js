import React,{useEffect,useState} from 'react'
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
    FormControlLabel
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
/*import TextField from '@mui/material/TextField'*/

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";


import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
import { ValidatorForm, TextValidator,SelectValidator } from 'react-material-ui-form-validator'
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

const AppTable = () => {
    const switchStyles = useN01SwitchStyles();
    const [states,setstates]=useState([])
    //const [states,setstates]=useState(stateList)
    const model='citys';
    
    const [cities,setcities]=useState([])

    const [open, setOpen] = React.useState(false)
    const [deleteopen, setDeleteOpen] = React.useState(false)
 
    const [formdata,setFormData]=useState({stateId:"",cityName:"",isActice:1})
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")

    const [state, setState] = React.useState({
        active: true,
        deactive: true,
    })
    const [stateoptions,setstateoptions]=useState([]);

    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const [selectedstate,setselectedstate]=useState({})
 
    useEffect(() => {
        getstates();
        getcities();
        getdatatable();
    }, []);
    useEffect(() => {
        getdatatable();
    }, [cities]);
    


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
        
        var query = "model="+model
        const response = await postDataFromApi('masters/allMasters/', query);
        if(response && response.data.code && response.data.data!=null){
            setcities(response.data.data);
            console.log('city data',response);
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
    const handleCityChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            console.log(response.data.message)
            getcities()
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

    function setdefaultvalue(){
        setselectedstate();
        setFormData({stateId:"",cityName:"",isActice:1})
    }

    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
        
    }
    
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['stateId']:cities[id].stateId,
            ['cityName']:cities[id].cityName,
            ['isActive']:cities[id].isActive
        }));
        setselectedstate(getSelectedItem(cities[id].stateId))
        setEditId(cities[id].id)
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        var response ="";
        if(is_edit){
            response =  await postDataFromApi('masters/allMasters/updateCityMasters/'+edit_id, formdata);
        }
        else{
            response = await postDataFromApi('masters/allMasters/createCityMasters', formdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            getcities()
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
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'City' },
                    ]}
                />
            </div>
            <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
               Add new City
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>     
            <Box width="100%" overflow="auto">
            <table id="customdatatable" className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city, index) => (
                            <tr key={index}>
                                <td align="left" >
                                {index+1}
                                </td>
                                <td align="left">
                                    {city.cityName}
                                </td>
                                <td><span className="ac_inactive">{city.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    checked={city.isActive}
                                    onChange={()=>handleCityChange(city.id,city.isActive)}
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New'} City</DialogTitle>
                        <DialogContent>
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
                                    id="city"
                                    label="City"
                                    type="text"
                                    fullWidth
                                    name="cityName"
                                    value={formdata.cityName || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required','matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
                                    errorMessages={['this field is required','Only Characters allowed']}
                                />
                               
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                        <Button   variant="outlined" type="submit" color="primary">
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
