import React, { useEffect, useState } from 'react'
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
    FormControlLabel,
    Typography,
    Checkbox
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
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import { postDataFromApi, getDataFromApi, putDataFromApi } from '../../services/CommonService';

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
    const [states, setstates] = useState([])
    const [allusers, setAllusers] = useState([])
    //const [states,setstates]=useState(stateList)
  

    const [open, setOpen] = React.useState(false)
    const [deleteopen, setDeleteOpen] = React.useState(false)

    const [formdata, setFormData] = useState({ skuTypeId:"",yardId:"" })
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState("")
    const [yardList, setyardList] = useState([]);
    const [SkuTypeList,setSkuTypeList]=useState([])
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState("")
    const [alerttype, setalerttype] = useState("")
    const [selectedstate, setselectedstate] = useState({})
    const [StockDetailList, setStockDetailList] = useState([])
    const [isSearched, setIsSearched] = useState(false)
    useEffect(() => {
        yardlist()
        skuTypelist()
        // StockDetails()
        // MenuMaster()
       
    }, []);
    useEffect(() => {
        // getdatatable();
    }, []);



    const yardlist = async () => {
        var query = "model=yard_masters"
        const response = await postDataFromApi('masters/allMasters/', query);
        if (response && response.data.code && response.data.data != null) {
            setAllusers(response.data.data);
            var useropts = [];
            response.data.data.map((yard, i) => {
                var st = [];
                st['id'] = yard.id
                st['label'] = yard.nameOfYard
                useropts.push(st)
            })
            setyardList(useropts)
            console.log('employee data', response);
        }

    }

    const skuTypelist = async () => {
        var query = 'model=sku_type_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setAllusers(response.data.data);
            var skutype = [];
            response.data.data.map((sku, i) => {
                var st = [];
                st['id'] = sku.id
                st['label'] = sku.skuTypeName
                skutype.push(st)
            })
            setSkuTypeList(skutype)
            console.log('employee data', response);
        }

    }

   
    function setdefaultvalue() {
        setselectedstate();
        setFormData({ id: "", isActice: 1 })
    }

    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
     }

    const StockDetails = async () => {
        console.log(formdata)
        var query = {
            'yardId':formdata.yardId,
            'skuTypeId':formdata.skuTypeId
        }
        const response = await postDataFromApi('order/viewStockDetails', query);
        setStockDetailList(response.data.data);
        if (response && response.data.code && response.data.data != null) {
            setStockDetailList(response.data.data);
            var menuName = []
            var id = []
            var ischeckeddata=[]
            
            // var is_searchablearr=[]
           
            response.data.data.map((list, i) => {
                console.log(list.formSequence)
            })
        }
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSearched(true)
        StockDetails()
    }
    function confirm() {
        setalert(false)
    }
    function getmenus(){
        var id=formdata.id
        console.log('formid',id)
    }
    var count=1;
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'View stock' },
                    ]}
                />
            </div>

            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype} />
            {/* <Box width="100%" overflow="auto">
           
            </Box> */}
   

            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                {/* <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New'} City</DialogTitle> */}
                <Grid>
                   
                    {/* <DialogContent> */}
                    <Grid container >
                    <Grid xs={6}>
                     <AutoComplete
                        fullWidth
                        options={SkuTypeList}
                        // getOptionLabel={(option) => option.label}
                        onChange={(event, value) => changedropdownvalue('skuTypeId', value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                className="required"
                                label="Product Group"
                                variant="outlined"
                                fullWidth
                                value={formdata.skuTypeId}
                                name="skuTypeId"
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                            />
                        )}
                    />
                    </Grid>
                        <Grid xs={6}>
                    <AutoComplete
                        fullWidth
                        options={yardList}
                        // getOptionLabel={(option) => option.label}
                        onChange={(event, value) => changedropdownvalue('yardId', value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                className=""
                                label="Yard"
                                variant="outlined"
                                fullWidth
                                value={formdata.yardId}
                                name="yardId"
                            />
                        )}
                    />
                    </Grid>
                   
                    </Grid>
                    <Grid >
                    <Button
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        >
                        Go
                    </Button>
                    </Grid>

                </Grid>
            </ValidatorForm>
            <Box width="100%" overflow="auto">
                {isSearched ? (
                <table id="customdatatable" className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            {formdata.skuTypeId ? <th>SKU Name</th> : ''}
                            <th>SKU Code</th>
                            {/* {!formdata.yardId ?<th>Yard Name</th> :" "} */}
                            <th>Yard Name</th>
                            <th>Zone Name</th>
                            <th>Batch No</th>
                            <th>Available weight</th>
                            <th>Available Qty</th>
                            <th>Hold Qty</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {StockDetailList.length>0 ? StockDetailList.map((stock, index) => {
                        return (
                     <tr key={index+1}>
                     <td align="left" >
                         {index+1}
                     </td>
                 
                     {formdata.skuTypeId ? <td>{stock.SKUName}</td> : '' }
                     <td>{stock.SKUCode}</td>
                    {/* {!formdata.yardId ? <td>{stock.nameOfYard}</td> :" "} */}
                     <td>{stock.nameOfYard}</td>
                     <td>{stock.nameOfZone}</td>
                     <td>{stock.batchName}</td>
                     <td>{stock.stockWeight}</td>
                     <td>{stock.stockQty}</td>
                     <td>{stock.holdQty}</td>
                     {/* <td className="no-margin-label">
                         <FormControlLabel
                             control={<Checkbox />}
                             label=""
                            //  name={'is_checked' + stock.isActive}
                            //  checked={formdata.is_checked['is_checked' + stock.isActive] !== '0' 
                            //  && formdata.is_checked['is_checked' + stock.isActive] ? true : false}
                             
                         />
                     </td> */}
                 </tr>)
                        })
                        :( <tr><td colSpan='8' style={{textAlign:'center'}}>No Data Available</td></tr>) }
                                 
                    </tbody>
                </table>) : ''}
            </Box>
            {/* </Dialog> */}
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
