import React, { useEffect, useState } from 'react'
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
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'
import MenuItem from "@material-ui/core/MenuItem"
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
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';
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

const triggermasterList = [
    {
        id: '1',
        triggerName: 'test',
    },
    {
        id: '2',
        triggerName: 'test',
    }

]
// const triggerName = [
//     { id: '1', label: 'test' },
//     { id: '2', label: 'Pass' },
//     { id: '1', label: 'Fail' },
// ]


const AppTable = () => {
    const [triggerMaster,settriggerMaster]=useState([])

    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)
    const [formdata, setFormData] = useState({ triggerName: "" })
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState("")
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')
    const model='trigger_masters';
   

    function handleClickOpen() {
        setdefaultvalue()//New
        setIsEdit(false)
        setOpen(true)
    }
    
    function handleClickEdit(id) {
        console.log(id)
         setFormData((formData) => ({
            ...formData,
            ['triggerName']:triggerMaster[id].triggerName,
            ['isActive']:triggerMaster[id].isActive
        }));
        setEditId(triggerMaster[id].id) 
        
        setIsEdit(true)
        setOpen(true)
    }
     const handleStateChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"r&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            console.log(response.data.message);
            gettriggerMaster();

            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            $('#customdatatable').DataTable().destroy();
            // getdatatable();
        }
        else{
            gettriggerMaster();
           
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
            $('#customdatatable').DataTable().destroy();
            // getdatatable();
        }
    } 

    function handleClose() {
        setOpen(false)
    }
    function setdefaultvalue(){
        setFormData({uomName:""})
    }//New

    function handleDeleteOpen() {
        setDeleteOpen(true)
    }

    function handledeleteClose() {
        setDeleteOpen(false)
    }

    function confirm() {
       
        setalert(false)
    }
    const handleSubmit =  async (e) => {
        e.preventDefault()
        var response ="";
        if(is_edit){
             response = await putDataFromApi('masters/triggerMasters/updateTriggersById/'+edit_id, formdata);
        }
        else{
             response = await postDataFromApi('masters/triggerMasters/createTriggers', formdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            gettriggerMaster();
            getdatatable();
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

    const gettriggerMaster = async () => {
        
        var query = "model="+model
        const response = await getDataFromApi('masters/triggerMasters/getAllTriggers', query);
        if(response && response.data.code && response.data.data!=null){
            settriggerMaster(response.data.data);
            console.log('getAllTriggers data',response);
            getdatatable()
        }
        
    }

    const gettriggerMasterTerms = async () => {
        //console.log('hi');
        var query = "model="+model
        const response = await postDataFromApi('masters/allMasters/',query);
        if(response && response.data.code && response.data.data!=null){
            settriggerMaster(response.data.data);
            console.log('menumaster data',response);
        }//New
        
    } 

    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));
    }

    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.id
        } else {
            var value = ""
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }));
    }

    const handleFormulaChange = async (id, isActive) => {
        console.log(id)
        console.log(isActive)
        isActive = isActive ? 0 : 1;

    }

    useEffect(() => {
        // gettriggerMasterTerms()
        gettriggerMaster();
        getdatatable();
    }, []);

    useEffect(() => {
        getdatatable();
    }, [triggerMaster]);

    var datatable = "";
    const getdatatable = async () => {
        if (datatable) {
            $('#customdatatable').DataTable().destroy();
        }
        $(document).ready(function () {
            setTimeout(function () {
                datatable = $('#customdatatable').DataTable();
            }, 500);
        });
    }

    const switchStyles = useN01SwitchStyles();

    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Trigger Master' },
                    ]}
                />
            </div>
            <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
                Add Trigger Name
            </Button>
            <AlertMessage
                    alert={alert}
                    alermessage={alermessage}
                    confirm={confirm}
                    alerttype={alerttype}
                />
            <Box width="100%" overflow="auto">

                <table id="customdatatable" className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Trigger Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {triggerMaster.map((triggermaster, index) => (
                            <tr key={index}>
                                <td align="left">
                                    {index + 1}
                                </td>
                                <td align="left">
                                    {triggermaster.triggerName}
                                </td>
                                <td><span className="ac_inactive">{triggermaster.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={triggermaster.isActive ? "Active" : "Inactive"}
					                checked={triggermaster.isActive}
					                onChange={()=>handleStateChange(triggermaster.id,triggermaster.isActive)}
					                value={triggermaster.isActive ? "Active" : "Inactive"}
					                inputProps={{ 'aria-label': 'secondary checkbox' }}
					            /></td>
                                <td>
                                    <IconButton onClick={() => handleClickEdit(index)}>
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add'} Trigger Name</DialogTitle>
                    <DialogContent>
                        {/* <AutoComplete
                            fullWidth
                            options={triggerName}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => changedropdownvalue('triggerNameid', value)}
                            renderInput={(params) =>
                             (
                                <TextField
                                    className="required"
                                    id="transport_date"
                                    label="Trigger Name"
                                    type="text"
                                    fullWidth
                                    name="transport_date"
                                />
                                // <TextField
                                //     {...params}
                                //     className="required"
                                //     label="Trigger Name"
                                //     variant="outlined"
                                //     fullWidth
                                //     validators={["required"]}
                                //     errorMessages={["this field is required"]}
                                //     value={formdata.triggerNameid}
                                //     name="triggerNameid"
                                // />
                            )}
                        /> */}
                        <TextField
                                    className="required"
                                    id="triggerName"
                                    label="Trigger Name"
                                    type="text"
                                    fullWidth
                                    name="triggerName"
                                value={formdata.triggerName || ''}
                                onChange={(e)=>formdatavaluechange(e)}
                                validators={['required']}
                                errorMessages={['Enter state name']}
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
                        <Button variant="outlined" type="submit" color="primary" >
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