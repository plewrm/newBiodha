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
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
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


const orderList = [
    {
        id: '1',
        Daeler_customer : 'test',
        Yard : 'test',
        SKU: '11',
       
    },
    {
        id: '2',
        Daeler_customer : 'test',
        Yard : 'test',
        SKU: '112',
       
    }
    
]

const SKUoptions  = [
    {
        id: '1',
        label: 'test'
       
    },
    {
        id: '2',
        label: 'test1'
       
    }
    
]

const Daeler_customeroptions  = [
    {
        id: '1',
        label: '1111'
       
    },
    {
        id: '2',
        label: '222'
       
    }
    
]

const yardoptions  = [
    {
        id: '1',
        label: 'test'
       
    },
    {
        id: '2',
        label: 'test1'
       
    }
    
]

const BMoptions  = [
    {
        id: '1',
        label: 'test'
       
    },
    {
        id: '2',
        label: 'test1'
       
    }
    
]

const paymenttermsoptions  = [
    {
        id: '1',
        label: 'test'
       
    },
    {
        id: '2',
        label: 'test1'
       
    }
    
]

const SKUdropdownlist  = [
    {
        id: '1',
        Thinknees: 'test',
        Width: '112',
        length: '44',
        Stockcheck : '88',
        Qty_pcs: '889',
        Qty_mt: '889',
        RCP: 'tre',
        DP: 'tre',
    },
    {
        id: '2',
        Thinknees: 'test',
        Width: '112',
        length: '44',
        Stockcheck : '88',
        Qty_pcs: '889',
        Qty_mt: '889',
        RCP: 'tre',
        DP: 'tre',
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
    const navigate = useNavigate()
    const [sku_masters,setsku_masters]=useState([])
    // const [states,setstates]=useState(subscribarList)
    const model='states';
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
     
    const [orderListing,setorderListing]=useState([])

    useEffect(() => {
        getorderListing();
        getdatatable();
    }, []);

    const getdatatable = async () => {
        
        $(document).ready(function () {
        setTimeout(function(){
        $('#customdatatable').DataTable();
         } ,1000);
    });
        
    }
    const getorderListing = async () => {
                var query = ""
                const response = await getDataFromApi('dashboard/delivaryOrder/delivaryOrderList', query);
                if(response && response.data.code && response.data.data!=null){
                    setorderListing(response.data.data);
                    console.log('orderListing',response);
                }
    }
   


    const switchStyles = useN01SwitchStyles();
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Logistic Order' },
                    ]}
                />
            </div>
            <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>Vehical Name</th>
	                        <th>Vehical Number</th>
                            <th>Driver Name</th>
                            <th>Createddate</th>
	                        {/* <th>Action</th> */}
	                    </tr>
	                </thead>
	                <tbody>
	                    {orderListing.map((order, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
                                <td align="left">
                                    {order.venhicalName}
                                </td>
	                            <td align="left">
	                                {order.vehicalNumber}
	                            </td>
                                <td align="left">
                                    {order.driverName}
                                </td>
                                <td align="left">
                                {moment(order.createdAt).format('DD-MM-Y')}
                                 
                                </td>
	                            {/* <td>
                                    <Tooltip title="View">
                                        <IconButton onClick={() => navigate('/logistics/view/'+order.id)}>
                                            <Icon color="primary">remove_red_eye</Icon>
                                        </IconButton>
                                    </Tooltip>
	                           </td> */}
	                        </tr>
	                    ))}
	                </tbody>
	            </table>
	        </Box>
            
        </Container>
    )
}

export default AppTable
