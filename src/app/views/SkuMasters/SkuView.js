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
    let { skuid } = useParams()
    const navigate = useNavigate()

    const switchStyles = useN01SwitchStyles()
    const [viewSkuMasters, setviewSkuMasters] = useState([])
    const [properties, setproperties] = useState([])
    const [propertyLabels, setpropertyLabels] = useState([])
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

    useEffect(() => {
        if (skuid) {
            getviewSkuMasters()
        }
    }, [])

    const getviewSkuMasters = async () => {
        var query = 'id=' + skuid
        const response = await postDataFromApi(
            'masters/allMasters/viewSkuMasters',
            query
        )
        console.log('order detail', response)
        if (response && response.data.code && response.data.data != null) {
            setviewSkuMasters(response.data.data)

            console.log('properties', response.data.data[0].properties)
            setproperties(response.data.data[0].properties)
            setpropertyLabels(response.data.data[0].propertyLabels)
            if (skuid) {
                var ord = response.data.data
                setFormData((formData) => ({
                    ...formData,
                    ['dealerId']: ord.dealerId,
                    ['skuTypeId']: ord.skuTypeId,
                    ['iscreditRequired']: ord.iscreditRequired,
                    ['expectedDeleveryDate']: ord.expectedDeleveryDate,
                    ['typeOfDispatch']: ord.typeOfDispatch,
                    ['yardId']: ord.yardId,
                    ['status']: ord.status,
                    ['statusForSystem']: ord.statusForSystem,
                    ['isDependent']: ord.isDependent,
                    ['remark']: ord.remark,
                    ['bm']: ord.bm,
                    ['updatedAt']: ord.updatedAt,
                    ['updatedBy']: ord.updatedBy,
                    ['createdAt']: ord.createdAt,
                    ['createdBy']: ord.createdBy,
                    ['delear']: ord.delear,
                    ['nameOfYard']: ord.nameOfYard,
                    ['skuTypeName']: ord.skuTypeName,
                }))
            }
        }
    }
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'SKU Master View' }]} />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/SkuMasters')}
            >
                Back to SKUMaster
            </Button>
            <ValidatorForm>
                {viewSkuMasters.map((viewSkuMasters, index) => (
                    <Grid container spacing={3} className="orderview">
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <table className="table table-hover table-bordered viewtable">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>Product Group</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewSkuMasters.skuTypeName}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>SKUName</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewSkuMasters.SKUName}
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
                                                {viewSkuMasters.remark
                                                    ? viewSkuMasters.remark
                                                    : ' - '}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>SKUCode</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewSkuMasters.SKUCode}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>SKU Price</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewSkuMasters.priceOfSKU}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>uomId</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewSkuMasters.uomId}
                                            </Typography>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography>
                                                <span>weight Per Piece</span>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {viewSkuMasters.weightPerPiece}
                                            </Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <table className="table table-hover table-bordered viewtable">
                                <tbody>
                                    {properties
                                        ? properties.map((label, i) => {
                                              return (
                                                  <tr>
                                                      <td><Typography>{label.label}</Typography></td>
                                                      <td><Typography>{label.value}</Typography></td>
                                                  </tr>
                                              )
                                          })
                                        : ''}
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                ))}
            </ValidatorForm>
        </Container>
    )
}

export default AppTable
