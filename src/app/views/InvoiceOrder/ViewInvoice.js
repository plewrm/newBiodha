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
    FormControlLabel,
    Checkbox,
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
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment';

const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
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

const orderList = [
    {
        id: '1',
        stock_check : 'test',
        qtypcs : '34',
        qtymt: '11',
        rcp:'2',
        dp:'2',
    },
    {
        id: '2',
        stock_check : 'test',
        qtypcs : '34',
        qtymt: '11',
        rcp:'3',
        dp:'4',
    }
    
]


const AppTable = () => {

    let { orderid } = useParams();
    const navigate = useNavigate()
  
    
    const switchStyles = useN01SwitchStyles();
    const [viewOrder,setviewOrder]=useState([])
    const [orderDetails,setorderDetails]=useState([])
    const [propertyLabels,setpropertyLabels]=useState([])
    const [paymentTerms,setpaymentTerms]=useState([])
    const [logisticsdetails,setLogisticsDetails]=useState('')
    
    const [formdata,setFormData]=useState({dealerId:"",skuTypeId:"",iscreditRequired:"",expectedDeleveryDate:"" ,typeOfDispatch: "",yardId:"",status:"",statusForSystem:"",isDependent:"",remark:"",bm:"",updatedAt:"",updatedBy:"",createdAt:"",createdBy:"",delear:"",nameOfYard:"",skuTypeName:""})

    useEffect(() => {
        getlogisticsdetails();
    }, []);
    const getlogisticsdetails=async()=>{
        var query = ""
        const response = await getDataFromApi('dashboard/delivaryOrder/delivaryOrderDataById/'+orderid, query);
        if(response && response.data.code && response.data.mainMenu!=null){
            setLogisticsDetails(response.data.mainMenu[0])
            getviewOrder(response.data.mainMenu[0].orderId)
        }
    }
    const getviewOrder = async (id) => {
        var query = "orderId="+id
        const response = await postDataFromApi('order/viewOrder', query);
        console.log('order detail',response)
        if(response && response.data.code && response.data.data!=null){
            setviewOrder(response.data.data);

            console.log('orderDetails',response.data.data[0].orderDetails);
            setorderDetails(response.data.data[0].orderDetails)
            setpropertyLabels(response.data.data[0].propertyLabels)
            
            const paymentTerms = response.data.data[0].paymentTerms.map(({
              paymentTerms
            }) => paymentTerms).join(', ')

            setpaymentTerms(paymentTerms)
            
            if(orderid){
                var ord=response.data.data
                setFormData((formData) => ({
                            ...formData,
                            ['dealerId']:ord.dealerId,
                            ["skuTypeId"]:ord.skuTypeId,
                            ["iscreditRequired"]:ord.iscreditRequired,
                            ['expectedDeleveryDate']:ord.expectedDeleveryDate,
                            ['typeOfDispatch']:ord.typeOfDispatch,
                            ['yardId']:ord.yardId,
                            ['status']:ord.status,
                            ['statusForSystem']:ord.statusForSystem,
                            ['isDependent']:ord.isDependent,
                            ['remark']:ord.remark,
                            ['bm']:ord.bm,
                            ['updatedAt']:ord.updatedAt,
                            ['updatedBy']:ord.updatedBy,
                            ['createdAt']: ord.createdAt,
                            ['createdBy']: ord.createdBy,
                            ['delear']: ord.delear,
                            ['nameOfYard']: ord.nameOfYard,
                            ['skuTypeName']: ord.skuTypeName,
                            
                }));
            }
        }
    }    
    return (
        <Container>
        
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Order Details' },
                    ]}
                />
            </div>
            <Button className="rightalign_btn" variant="outlined"
                color="primary" onClick={() => navigate('/logistics')}>
               Back to Order
            </Button>
            <ValidatorForm>
            {viewOrder.map((viewOrder, index) => (
            <Grid container spacing={3} className="orderview">
               
                   <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                       <table className="table table-hover table-bordered viewtable">
                         <tbody>
                            <tr>
                               <td><Typography><span>Customer/Dealer</span></Typography></td>
                               <td><Typography>{viewOrder.delear}</Typography></td>
                            </tr>
                            <tr>
                               <td><Typography><span>Product Group</span></Typography></td>
                               <td><Typography>{viewOrder.skuTypeName}</Typography></td>
                            </tr>
                            <tr>
                              <td><Typography><span>Remark</span></Typography></td>
                                <td><Typography>{viewOrder.remark ? viewOrder.remark : ' - '}</Typography></td>
                            </tr>
                            <tr>
                               <td><Typography><span>BM</span></Typography></td>
                               <td><Typography>{viewOrder.bmName ? viewOrder.bmName : ' - '}</Typography></td>
                            </tr>
                            <tr>
                               <td><Typography><span>Status</span></Typography></td>
                               <td><Typography>{viewOrder.status}</Typography></td>
                            </tr>
                         </tbody>
                       </table>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                       <table className="table table-hover table-bordered viewtable">
                         <tbody>
                            <tr>
                              <td><Typography><span>Yard</span></Typography></td>
                              <td><Typography>{viewOrder.nameOfYard}</Typography></td>
                            </tr>
                            <tr>
                              <td><Typography><span>Payment Terms</span></Typography></td>
                              <td><Typography>{paymentTerms}</Typography></td>
                            </tr> 
                            <tr> 
                              <td><Typography><span>Expected Delevery Date</span></Typography></td>
                              <td><Typography>{moment(viewOrder.expectedDeleveryDate).format('DD-MM-Y')}</Typography></td>
                            </tr> 
                            <tr>
                                <td><Typography><span>Created At:</span></Typography></td>
                                <td><Typography>{moment(viewOrder.createdAt).format('DD-MM-Y')}</Typography></td>
                            </tr>
                            <tr>
                                 <td><Typography><span>Updated At</span></Typography></td>
                                 <td><Typography>{moment(viewOrder.updatedAt).format('DD-MM-Y')}</Typography></td>
                            </tr>
                            <tr>
                                 <td><Typography><span>Is Credit Required</span></Typography></td>
                                 <td><FormControlLabel
                                            control={<Checkbox />}
                                            name="iscreditRequired"
                                            label="Is creditRequired"
                                            checked={viewOrder.iscreditRequired!== '0' && viewOrder.iscreditRequired ? true : false }
                                            className="hidecheckbox_label"
                                        /></td>
                            </tr>  
                            
                          </tbody>
                       </table>
                    </Grid>
               
            </Grid>
             ))}
            </ValidatorForm>
            <table id="customdatatable" className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>SKU Name</th>
                            <th>SKU Code</th>
                            { orderDetails && orderDetails[0] && orderDetails[0].properties ? orderDetails[0].properties.map((label,i)=>{
                                       return (<th>{label.label}</th>)
                                    }) : ''
                                }
                            <th>Qty Pcs</th>
                            <th>Qty MT</th>
                            <th>RCP</th>
                            <th>DP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((orderDetails, index) => (
                            <tr key={index}>
                                <td align="left">
                                    {index+1}
                                </td>
                                <td>{orderDetails.SKUName}</td>
                                <td>{orderDetails.SKUCode}</td>
                                {
                                    orderDetails.properties ? orderDetails.properties.map((prop,i)=>{
                                       return (<td>{prop.value}</td>)
                                    }) : ''
                                }
                                <td align="left">
                                    {orderDetails.quantity_pcs}
                                </td>
                                <td align="left">
                                    {orderDetails.quantity_mt}
                                </td>
                                <td align="left">
                                    {orderDetails.rcp}
                                </td>
                                <td align="left">
                                    {orderDetails.dp}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="dash_title">Transporter Details</div>
                <Grid container spacing={3} className="orderview">
               
                   <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <table className="table table-hover table-bordered">
                         <tbody>
                            <tr>
                              <td><Typography><span>Vehical Name</span></Typography></td>
                              <td><Typography>{logisticsdetails.venhicalName}</Typography></td>
                            </tr>
                            <tr>
                              <td><Typography><span>mode</span></Typography></td>
                              <td><Typography>{logisticsdetails.mode}</Typography></td>
                            </tr>
                             <tr>
                              <td><Typography><span>Vehical Number</span></Typography></td>
                              <td><Typography>{logisticsdetails.vehicalNumber}</Typography></td>
                            </tr>
                            <tr>
                              <td><Typography><span>Doc/Landing/RR/Airway No</span></Typography></td>
                              <td><Typography>{logisticsdetails.doc}</Typography></td>
                            </tr>
                            
                          </tbody>
                       </table>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                       <table className="table table-hover table-bordered">
                         <tbody>
                            <tr>
                              <td><Typography><span>Distance</span></Typography></td>
                              <td><Typography>{logisticsdetails.distance}</Typography></td>
                            </tr>
                            <tr>
                              <td><Typography><span>Transport ID</span></Typography></td>
                              <td><Typography>{logisticsdetails.transporterId}</Typography></td>
                            </tr>
                             <tr>
                              <td><Typography><span>Vehical Type</span></Typography></td>
                              <td><Typography>{logisticsdetails.vehicalType}</Typography></td>
                            </tr>
                            <tr>
                              <td><Typography><span>Date</span></Typography></td>
                              <td><Typography>{logisticsdetails.date}</Typography></td>
                            </tr>
                            
                          </tbody>
                       </table>
                    </Grid>
               
            </Grid>
        </Container>
    )
}

export default AppTable
