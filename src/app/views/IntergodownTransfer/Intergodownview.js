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
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    postDataFromApi,
    getDataFromApi,
    putDataFromApi,
    orderStatuses,
} from '../../services/CommonService'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import SweetAlert from 'react-bootstrap-sweetalert'
import AlertMessage from '../commoncomponent/AlertMessage'
import { Autocomplete } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import moment from 'moment'

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
        stock_check: 'test',
        qtypcs: '34',
        qtymt: '11',
        rcp: '2',
        dp: '2',
    },
    {
        id: '2',
        stock_check: 'test',
        qtypcs: '34',
        qtymt: '11',
        rcp: '3',
        dp: '4',
    },
]

const AppTable = () => {
    let { orderid } = useParams()
    const navigate = useNavigate()

    const switchStyles = useN01SwitchStyles()
    const [viewIntergo, setviewIntergo] = useState([]) 
    const [skuproperties, setskuproperties] = useState([])
    const [propertyLabels, setpropertyLabels] = useState([])
    const [paymentTerms, setpaymentTerms] = useState([])
    const [rows, setrows] = useState([])
    const [propertyoptions, setpropertyoptions] = useState([])

    const [formdata, setFormData] = useState({
        dealerId: '',
        skuTypeId: '',
        iscreditRequired: '',
        expectedDeleveryDate: '',
        typeOfDispatch: '',
        yardId: '',
        status: '',
        statusForSystem: '',
        isDependent: '',
        remark: '',
        bm: '',
        updatedAt: '',
        updatedBy: '',
        createdAt: '',
        createdBy: '',
        delear: '',
        nameOfYard: '',
        skuTypeName: '',
    })

    const [logList, setLogList] = useState([])

    useEffect(() => {
        console.log('orderStatuses', orderStatuses)
        if (orderid) {
            getviewIntergo()
           
        }
    }, [])

   
    const getviewIntergo = async () => {
        var query = 'orderId=' + orderid
        const response = await getDataFromApi('invoice/intergodownTransfer/getIntergodownTransferDataById/'+orderid)
        console.log('order detail', response)
        if (response && response.data.code && response.data.data != null) {
            setviewIntergo(response.data.data[0])


            if (orderid) {
                const momentdate = moment(formdata.delivaryDate)
                var newdate = momentdate.format('Y-MM-DD')
                var ord = response.data.data
                setFormData((formData) => ({
                    ...formData,

                    fromYard: ord.fromYard,
                    toYard: ord.toYard,
                    productGroup: ord.productGroup,
                    remark:ord.remark,
                    delivaryDate: newdate
                    
                }))
            }
        }
    }
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Intergodown Transfer Details' }]} />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/IntergodownTransfer')}
            >
                Back to Intergodown Transfer
            </Button>
            <ValidatorForm>
            <Grid container spacing={3} className="orderview">
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <table className="table table-hover table-bordered viewtable">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>From Yard</span>
                                            </Typography>
                                        </td>
                                        <td>
                                        <Typography>
                                                {viewIntergo.fromYards
                                                    ? viewIntergo.fromYards
                                                    : ' - '}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Product Group</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewIntergo.productGroupName}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Remark</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewIntergo.remark
                                                    ? viewIntergo.remark
                                                    : ' - '}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>To Yard</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewIntergo.toYards
                                                    ? viewIntergo.toYards
                                                    : ' - '}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>
                                                    Expected Delevery Date
                                                </span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewIntergo.delivaryDate ? moment(
                                                    viewIntergo.delivaryDate
                                                ).format('DD-MM-Y') : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    
                                    
                                </tbody>
                            </table>
                        </Grid>
                        
                    </Grid>
            </ValidatorForm>

            {/* <div className="index_set">
                <table
                    id="customdatatable"
                    className="table table-hover table-bordered"
                >
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            {skuproperties &&
                            skuproperties[0] &&
                            skuproperties[0].properties
                                ? skuproperties[0].properties.map((label, i) => {
                                      return <th>{label.label}</th>
                                  })
                                : ''}
                            <th>SKU Master</th>
                            <th>Stock check</th>
                            
                            <th>Qty Pcs</th>
                            <th>Qty MT</th>
                            <th>RCP</th>
                            <th>DP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skuproperties.map((skuproperties, index) => (
                            <tr key={index}>
                                <td align="left">{index + 1}</td>
                                {skuproperties.properties
                                    ? skuproperties.properties.map((prop, i) => {
                                          return <td>{prop.value}</td>
                                      })
                                    : ''}
                                <td>{skuproperties.SKUName}</td>
                                <td>{skuproperties.SKUCode}</td>
                                
                                <td align="left">
                                    {skuproperties.quantity_pcs}
                                </td>
                                <td align="left">{skuproperties.quantity_mt}</td>
                                <td align="left">{skuproperties.rcp}</td>
                                <td align="left">{skuproperties.dp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
            
        </Container>
    )
}

export default AppTable
