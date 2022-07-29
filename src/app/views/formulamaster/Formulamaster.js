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
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ValidatorForm, TextValidator ,SelectValidator } from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
import MenuItem from "@material-ui/core/MenuItem"

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { createFilterOptions } from '@mui/material/Autocomplete'
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

const formulamasterList = [
    {
        id: '1',
        batch: 'test',
        formula: 'test1',
    },
    {
        id: '2',
        batch: 'test',
        formula: 'test2',
    }
    
]

const Batch = [
    { id:'1', label: 'Batch' },
]


const AppTable = () => {
    const switchStyles = useN01SwitchStyles();
    const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)
    
    const [formdata,setFormData]=useState({formula:""})
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")

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
    const handleSubmit = (e) => {
        /*setOpen(false)*/
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

    const handleFormulaChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        
    }

    useEffect(() => {
       getdatatable();
    }, []);

    useEffect(() => {
        getdatatable();
    }, [formulamasterList]);

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
		                        { name: 'Formula Master' },
		                    ]}
		                />
		      </div>
              <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={handleClickOpen}>
               Add Formula
              </Button>
		      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>Batch</th>
                            <th>Formula</th>
                            <th>status</th>
                            <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {formulamasterList.map((formulamaster, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            <td align="left">
	                                {formulamaster.formula}
	                            </td>
                                <td align="left">
                                    {formulamaster.batch}
                                </td>
                                <td><Switch
                                    classes={switchStyles}
                                    checked={formulamaster.active}
                                    onChange={()=>handleFormulaChange(formulamaster.id,formulamaster.isActive)}
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
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add'} Formula</DialogTitle>
                    <DialogContent>
                                <AutoComplete
                                    fullWidth
                                    options={Batch}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('Batchid',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Batch"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.Batchid}
                                            name="Batchid"
                                        />
                                    )}
                                />
                        <TextField
                                    className="required"
                                    id="formula"
                                    label="Formula"
                                    type="text"
                                    fullWidth
                                    name="formula"
                                    value={formdata.formula || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                               <FormControlLabel
                                    control={<Checkbox />}
                                    label="Active"
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