//import packages
import React, { useEffect, useState } from 'react'
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
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
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
import { postDataFromApi, getDataFromApi, putDataFromApi } from '../../services/CommonService';

import AlertMessage from '../commoncomponent/AlertMessage'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';


//margine and padding 
const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))
const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

// Table Design
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

// Container Margin and Padding
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

// Listing API
const ZonemasterList = [
    {
        id: '1',
        zoneName: 'test',
        isActive: true,

    },
    {
        id: '2',
        zoneName: 'test',
        isActive: false,

    }

]
const ZONE = [
    { id: '1', dropdownName: '1234' },
]
const fieldTypelist = [
    { id: '1', dropdownName: 'text' },
    { id: '2', dropdownName: 'dropdown' },
]


const AppTable = () => {

    const switchStyles = useN01SwitchStyles();
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)

    const [formdata, setFormData] = useState({ yardId: "1", nameOfZone: "zone master" })
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState("")

    
    const model = 'zone_masters';

    const [yard_properties_dropdown, setyard_properties_dropdown] = useState([]);
    const [zone_mastersoptions, setzone_mastersoptions] = useState([]);
    const [zone_masters, setzone_masters] = useState([])

    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState("")
    const [alerttype, setalerttype] = useState("")
    const [selectedzone, setselectedzone] = useState({})
    const [selectedfield, setselectedfield] = useState({})
    const [zoneproperties, setzoneproperties] = useState([])//recent change

    function setdefaultvalue() {
        setselectedzone()
        setselectedfield()
        setFormData({ zonePropertyId: "", dropdownName: "",fieldType:"", isActice: 1 })
    }

    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
        getzoneproperties()

    }

    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,

            ['yardId']: zone_masters[id].yardId,//new updated
            ['nameOfZone']: zone_masters[id].nameOfZone,//New updated
            ['fieldType']:zone_masters[id].fieldType,
            ['isActive']: zone_masters[id].isActive
        }));
        setselectedzone(getSelectedItem(zone_masters[id].yardId))
        setselectedfield(getSelectedItemfield(zone_masters[id].fieldType))
        setselectedfield(getSelectedItemfield(zone_masters[id].fieldType))
        setEditId(zone_masters[id].id)
        setIsEdit(true)
        setOpen(true)
        getzoneproperties(zone_masters[id].yardId)

    }

    function getSelectedItem(id) {
        const item = zone_mastersoptions.find((opt) => {


            if (opt.id == id)
                return opt;
        })
        return item || {};

    }

    function getSelectedItemfield(id) {
        const item = fieldTypelist.find((opt) => {


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
        var response = "";
        if (is_edit) {
            response = await putDataFromApi('masters/zoneMaster/updateZone/' + edit_id, formdata);
        }
        else {
            response = await postDataFromApi('masters/zoneMaster/createZone', formdata);
        }
        console.log('edit response', response)
        if (response.data.code) {
            getzone_masters()
            setIsEdit(false)
            setEditId("")
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
        }
        else {
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));
    }
    function changedropdownvalue(type, e) {
        $('#property').DataTable().destroy();// recent change
        if (e) {
            var value = e.id
        } else {
            var value = ""
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }));

        if (e) {
            if (type == 'zonePropertyId') {
                getzoneproperties(e.id)
                //getdatatable();
            }
        } else {
            getzoneproperties()
            //$('#property').DataTable().destroy();
        }// recent changes


    }

    const getzoneproperties = async (id) => {
        var query = "zonePropertyId=" + id
        const response = await postDataFromApi('masters/zoneMaster/getAllZone', query);//new update
        if (response && response.data.code && response.data.data != null) {
            setzoneproperties(response.data.data);
            console.log('Zone properties', response);
        }
    }// recent changes

    useEffect(() => {
        getdatatable();
        getzone_masters();

        getyard_properties_dropdown();

    }, []);

    useEffect(() => {
        getdatatable();
    }, [yard_properties_dropdown]);

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

    const getzone_masters = async () => {

        var query = "model=zone_type_masters"
        const response = await getDataFromApi('masters/zoneMaster/getAllZone', query);// new update
        if (response && response.data.code && response.data.data != null) {
            setzone_masters(response.data.data);
            // var zone_mastersopts = [];
            // response.data.data.map((zone_masters, i) => {
            //     var sk = [];
            //     sk['id'] = zone_masters.id
            //     sk['label'] = zone_masters.nameOfZone
            //     zone_mastersopts.push(sk)
            // })
            // setzone_mastersoptions(zone_mastersopts)
            console.log('zone_masters data', response);
        }

    }

    const getyard_properties_dropdown = async () => {
        var query = "model=yard_masters"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
       
        if (response && response.data.code && response.data.data != null) {
            setyard_properties_dropdown(response.data.data);
            var zone_mastersopts = [];
            response.data.data.map((zone_masters, i) => {
                var sk = [];
                sk['id'] = zone_masters.id
                sk['label'] = zone_masters.nameOfYard
                zone_mastersopts.push(sk)
            })
            setzone_mastersoptions(zone_mastersopts)
            console.log('yard_properties_dropdown', response);
        }

    }
    const handleproperties_mastersChange = async (id, isActive) => {
        console.log(id)
        console.log(isActive)
        isActive = isActive ? 0 : 1;
        var query = "tableName=" + model + "&isActive=" + isActive;
        const response = await putDataFromApi('masters/isActive/' + id, query);
        if (response.data.code) {

            console.log(response.data.message)
            getzone_masters()
            // getyard_properties_dropdown()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            $('#customdatatable').DataTable().destroy();
            getdatatable();
        }
        else {
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    function confirm() {
        setalert(false)
    }
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Zone Propertiess' },
                    ]}
                />
            </div>
            <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
                Add Zone
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype} />
            <Box width="100%" overflow="auto">

                <table id="customdatatable" className="table display table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Yard Name</th>
                            <th>Name of Zone</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zone_masters.map((properties_dropdown, index) => (
                            <tr key={index}>
                                <td align="left">
                                    {index + 1}
                                </td>
                                <td align="left">
                                    {properties_dropdown.nameOfYard}
                                </td>
                                <td align="left">
                                    {properties_dropdown.nameOfZone}
                                </td>
                                <td><span className="ac_inactive">{properties_dropdown.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={properties_dropdown.isActive ? "Active" : "Inactive"}
                                    checked={properties_dropdown.isActive}
                                    onChange={() => handleproperties_mastersChange(properties_dropdown.id, properties_dropdown.isActive)}
                                    // value="active"
                                    value={properties_dropdown.isActive ? "Active" : "Inactive"}
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add'} Zone Trigger</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                                <AutoComplete
                                    fullWidth
                                    defaultValue={selectedzone}
                                    options={zone_mastersoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('yardId', value)}// new update
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Yard Properties"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}

                                            value={formdata.yardId}// new update
                                            name="zonePropertyId"
                                        />
                                    )}
                                />
                                <TextField
                                    className="required"
                                    id="label"
                                    label="Zone Name"
                                    type="text"
                                    fullWidth
                                    name="nameOfZone"
                                    value={formdata.nameOfZone || ''}// new update
                                    onChange={(e) => formdatavaluechange(e)}
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