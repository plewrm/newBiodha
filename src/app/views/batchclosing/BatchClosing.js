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
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip'
import useAuth from 'app/hooks/useAuth'
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
    const userdetails = useAuth()
    const navigate = useNavigate()
    const [deleteopen, setDeleteOpen] = useState(false)

    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')

    const [orderListing, setorderListing] = useState([])
    const BMId = userdetails.user.BMId

    useEffect(() => {
        getorderListing()
        getdatatable()
    }, [])

    const getdatatable = async () => {
        $(document).ready(function () {
            setTimeout(function () {
                $('#customdatatable').DataTable()
            }, 1000)
        })
    }

    function handleDeleteOpen() {
        setDeleteOpen(true)
    }

    function handledeleteClose() {
        setDeleteOpen(false)
    }
    function confirm() {
        setalert(false)
    }
    function cancelled() {}
    const getorderListing = async () => {
        var query = ''
        const response = await getDataFromApi(
            '/dashboard/batchClosing/getBatchClosingList/' +
                userdetails.user.id,
            query
        )
        // const response = await getDataFromApi('/dashboard/batchClosing/getBatchClosingApprovalList/'+BMId, query);
        if (response && response.data.code && response.data.data != null) {
            setorderListing(response.data.data)
            console.log('orderListing', response)
        }
    }

    const switchStyles = useN01SwitchStyles()
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Batch Closing' }]} />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/batch-closing/add')}
            >
                Add New
            </Button>
            <AlertMessage
                alert={alert}
                alermessage={alermessage}
                confirm={confirm}
                alerttype={alerttype}
            />

            <Box width="100%" overflow="auto">
                <table
                    id="customdatatable"
                    className="table table-hover table-bordered"
                >
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Product Group</th>
                            <th>Zone</th>
                            <th>Batch</th>
                            <th>BM</th>
                            <th>Createddate</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderListing.map((order, index) => (
                            <tr key={index}>
                                <td align="left">{index + 1}</td>
                                <td align="left">{order.SKUName}</td>
                                <td align="left">{order.nameOfZone}</td>
                                <td align="left">{order.batch}</td>
                                <td align="left">{order.fullName}</td>
                                <td align="left">
                                    {moment(order.createdAt).format('DD-MM-Y')}
                                </td>

                                <td align="left">
                                    {order.approvalStatus == 1
                                        ? 'Approved'
                                        : order.approvalStatus == 2
                                        ? 'Rejected'
                                        : 'Pending'}
                                </td>
                                <td>
                                    <Tooltip title="View">
                                        <IconButton
                                            onClick={() =>
                                                navigate(
                                                    '/batch-closing/0/' +
                                                        order.id
                                                )
                                            }
                                        >
                                            <Icon color="primary">
                                                remove_red_eye
                                            </Icon>
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>

            <Dialog
                open={deleteopen}
                onClose={handledeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are You Sure You Want to delete this record?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handledeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handledeleteClose}
                        color="primary"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default AppTable
