import React, { useEffect, useState } from "react";
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
import { postDataFromApi, getDataFromApi, putDataFromApi } from '../../services/CommonService';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import SweetAlert from 'react-bootstrap-sweetalert';
import AlertMessage from '../commoncomponent/AlertMessage'

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

    const [states, setstates] = useState([])
    const model = 'sku_type_masters';
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)

    const [formdata, setFormData] = useState({ id: "", skuTypeName: "", isActice: 1 })
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState("")
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState("")
    const [alerttype, setalerttype] = useState("")

    const handleStateChange = async (id, isActive) => {
        console.log(id)
        console.log(isActive)
        isActive = isActive ? 0 : 1;
        var query = "tableName=" + model + "&isActive=" + isActive;
        const response = await putDataFromApi('masters/isActive/' + id, query);
        if (response.data.code) {

            console.log(response.data.message);
            getstates()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            $('#customdatatable').DataTable().destroy();
            getdatatable()
        } else {
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    useEffect(() => {
        getstates();
        getdatatable();
    }, []);

    const getstates = async () => {
        var query = "model=" + model
        const response = await postDataFromApi('masters/allMasters/', query);
        if (response && response.data.code && response.data.data != null) {
            setstates(response.data.data);
            console.log('states data', response);
        }
    }

    const getdatatable = async () => {

        $(document).ready(function () {
            setTimeout(function () {
                $('#customdatatable').DataTable();
            }, 1000);
        });

    }

    function setdefaultvalue() {
        setFormData({ id: "", skuTypeName: "", isActice: 1 })
    }
    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        setFormData((formData) => ({
            ...formData,
            ['id']: states[id].id,
            ['skuTypeName']: states[id].skuTypeName,
            ['isActive']: states[id].isActive
        }));
        setEditId(states[id].id)
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
    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));
    }
    function confirm() {
        setalert(false)
    }
    function cancelled() {

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        var response = "";
        if (is_edit) {
            response = await postDataFromApi('masters/allMasters/updateSkuTypeMasters', formdata);
        }
        else {
            response = await postDataFromApi('masters/allMasters/createSkuTypeMasters', formdata);
        }
        // return false;
        console.log('edit response', response)
        if (response.data.code) {
            getstates()
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
    const switchStyles = useN01SwitchStyles();
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Product Group List' },
                    ]}
                />
            </div>
            <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
                Add new
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype} />

            <Box width="100%" overflow="auto">

                <table id="customdatatable" className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Product Group</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {states.map((state, index) => (
                            <tr key={index}>
                                <td align="left">
                                    {index + 1}
                                </td>
                                <td align="left">
                                    {state.skuTypeName}
                                </td>
                                <td><span className="ac_inactive">{state.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={state.isActive ? "Active" : "Inactive"}
                                    checked={state.isActive}
                                    onChange={() => handleStateChange(state.id, state.isActive)}
                                    value="active"
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New'} Product Group</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    className="required"
                                    id="state"
                                    label="Product Group Name"
                                    type="text"
                                    fullWidth
                                    name="skuTypeName"
                                    value={formdata.skuTypeName || ''}
                                    onChange={(e) => formdatavaluechange(e)}
                                    validators={['required', 'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
                                    errorMessages={['this field is required', 'Only Characters allowed']}
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
                    <Button onClick={handledeleteClose} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    )
}

export default AppTable
