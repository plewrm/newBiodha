import React, { useEffect, useState } from 'react'
import style from 'Assets/css/style.css'
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
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
    ValidatorForm,
    TextValidator,
    SelectValidator,
} from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import {
    postDataFromApi,
    getDataFromApi,
    putDataFromApi,
    MainUrl,
} from '../../services/CommonService'
import SweetAlert from 'react-bootstrap-sweetalert'
import AlertMessage from '../commoncomponent/AlertMessage'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    marginBottom: '0px',
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

const customerList = [
    {
        id: '1',
        firmName: 'test',
        ContactPersonName: 'test1',
        phoneNo: '1237854234',
    },
    {
        no: '2',
        firmName: 'test1',
        ContactPersonName: 'test1',
        phoneNo: '1237854234',
    },
]

const states = [
    {
        stateName: 'gujarat',
    },
]
const cities = [
    {
        cityName: 'amhedabad',
    },
]

const AppTable = () => {
    let { customerid } = useParams()
    let newcustomerid = customerid ? customerid : ''
    const navigate = useNavigate()
    const [states, setstates] = useState([])
    const [cities, setcities] = useState([])
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)
    const [formdata, setFormData] = useState({
        firmName: '',
        ContactPersonName: '',
        address: '',
        pincode: '',
        officeAddress: '',
        phoneNo: '',
        mobileNo: '',
        emailId: '',
        countryId: '',
        stateId: '',
        cityId: '',
        districtId: '',
        GSTNo: '',
        PanNo: '',
        ASOId: '',
        BM: '',
        paymentTerms: '',
        file: [],
        AttachmentName: [],
        imgPreview: [],
        selectedASO: [],
        selectedBM: [],
        selectedDistrict: [],
        selectedPaymentTerms: [],
    })
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState('')
    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')
    const [skuproperties, setskuproperties] = useState([])
    const [customer_masters, setcustomer_masters] = useState([])
    const [BM, setBM] = useState([])
    const [ASO, setASO] = useState([])
    const [ASOoptions, setASOoptions] = useState([])
    const [BMoptions, setBMoptions] = useState([])
    const [redirectcustomer, setredirectcustomer] = useState(false)
    const [rows, setrows] = useState([])
    const [file, setFile] = useState()
    const [existingfiles, setexistingfiles] = useState([])
    const [is_delete, setIsDelete] = useState(false)
    const [delete_id, setDeleteId] = useState('')
    const [is_edit_loaded, set_is_edit_loaded] = useState(false)

    const [stateoptions, setstateoptions] = useState([])
    const [cityoptions, setcityoptions] = useState([])
    const [countryoptions, setcountryoptions] = useState([])
    const [districtoptions, setdistrictoptions] = useState([])
    const [paymentoptions, setpaymentoptions] = useState([])
    const [payment_terms, setpayment_terms] = useState([])

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
    const handledeleteConfirm = async (e) => {
        if (is_delete) {
            var imgdata = {
                id: delete_id,
            }
            var response = ''
            if (customerid) {
                response = await postDataFromApi(
                    'masters/allMasters/deleteCustomerImage',
                    imgdata
                )
            }

            console.log('edit response', response)
            if (response.data.code) {
                // getcustomer_masters()
                setredirectcustomer(false)
                setIsDelete(false)
                setDeleteId('')
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('success')
            } else {
                // getcustomer_masters()
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('error')
                setIsDelete(false)
                setDeleteId('')
            }
        }
        setDeleteOpen(false)
    }
    const handleClickDeleteImg = async (id) => {
        setDeleteId(id)
        setDeleteOpen(true)
        setIsDelete(true)
    }
    const filechange = (event, index) => {
        let files = event.target.files
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        var imgurl = URL.createObjectURL(event.target.files[0])
        console.log(imgurl)

        var images = formdata.imgPreview
        images['imgPreview_' + index] = imgurl

        setFormData((formData) => ({
            ...formData,
            imgPreview: images,
        }))

        var selectedFile = ''
        reader.onload = (e) => {
            selectedFile = e.target.result
            var values = formdata['file']
            console.log(event.target.name)
            console.log(selectedFile)
            values[event.target.name] = selectedFile
            console.log(values)

            /*var objectUrl = URL.createObjectURL(selectedFile)
             console.log('objectUrl',objectUrl)*/
            //setFile(values[event.target.name])
            /*setFormData((formData) => ({
                ...formData,
                values,
            }));*/
        }
    }
    const AttachmentNamechange = (e, index) => {
        var values = formdata['AttachmentName']
        console.log('values', e.target.value)
        values[e.target.name] = e.target.value

        setFormData((formData) => ({
            ...formData,
            values,
        }))
    }

    function getSelectedItem(id, data = [], label = '',multiple = '') {
        console.log('mainoptiondata', data)
        const item = data.find((opt) => {
            if (label) {
                if (opt.label == id) return opt
            } else {
                if (opt.id == id) return opt
            }
        })
        console.log('item', item)
        if (multiple) {
            return item || []
        } else {
            return item || null
        }
    }

    // function changedropdownvalue(type,e){
    //     if(e){
    //        var value=e.id
    //     }else{
    //         var value=""
    //     }
    //     setFormData((formData) => ({
    //         ...formData,
    //         [type]:value,
    //     }));
    //     if(e){
    //         if(type == 'SKU'){
    //           getskuproperties(e.id)
    //         }
    //     }else{
    //         getskuproperties()

    //     }
    // }
    const getpayment_terms = async () => {
        var query = 'model=payment_terms'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            var paymentopts = []
            response.data.data.map((payment_terms, i) => {
                var pm = []
                pm['id'] = payment_terms.id
                pm['label'] = payment_terms.paymentTerms
                pm['isCreditApprove'] = payment_terms.isCreditApprove
                paymentopts.push(pm)
            })
            setpaymentoptions(paymentopts)
            console.log('payment data', response)
        }
    }
    useEffect(() => {
        getpayment_terms()
        getCountries()
        // getcities();
        // getstates()
        getASO()
        getBM()
        getdatatable()
        //getcustomer_masters();

        if (customerid) {
            getcustomer_masters()
        } else {
            set_is_edit_loaded(true)
        }
    }, [])

    var datatable = ''
    const getdatatable = async () => {
        if (datatable) {
            $('#customdatatable').DataTable().destroy()
        }
        $(document).ready(function () {
            setTimeout(function () {
                datatable = $('#customdatatable').DataTable()
            }, 500)
        })
    }

    function confirm() {
        setalert(false)
        if (redirectcustomer) {
            navigate('/customer')
        }
    }

    const getcustomer_masters = async () => {
        var query = 'id=' + customerid
        // const response = await getDataFromApi('masters/allMasters/employeeMasterList', query);
        const response = await postDataFromApi(
            'masters/allMasters/getCustomerDetails',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setcustomer_masters(response.data.data)
            setexistingfiles(response.data.data.images)
            console.log(response.data.data.images)
            console.log(response)
            //const emp=response.data.data
            if (customerid) {
                var cus = response.data.data
                // const employe=response.data.data.map((emp,i)=>{
                // if(emp.id==empid){
                console.log('cusname', cus.fullName)
                getstates(cus.countryId)
                getcities(cus.stateId)
                getDistrict(cus.cityId)
                const selectedaso=[];
                const selectedasoids=[];
                cus.ASO.map((aso,i)=>{
                    const asoid=[]
                    asoid['id']=aso.aso_id;
                    asoid['label']=aso.fullName;
                    selectedaso.push(asoid);
                    selectedasoids.push(aso.aso_id);
                })
                const selectedbm=[];
                const selectedbmids=[];
                cus.BM.map((bm,i)=>{
                    const bmid=[]
                    bmid['id']=bm.bm_id;
                    bmid['label']=bm.fullName;
                    selectedbm.push(bmid);
                    selectedbmids.push(bm.bm_id);
                })
                console.log('selectedaso',selectedaso)
                const selecteddistics=[];
                const selecteddistids=[];
                cus.District.map((dist,i)=>{
                    const distid=[]
                    distid['id']=dist.ditrict_id;
                    distid['label']=dist.districtName;
                    selecteddistics.push(distid);
                    selecteddistids.push(dist.ditrict_id);
                })
                const selectedPaymentTerms=[];
                const selectedpaymentids=[];
                response.data.data.paymentTerm.map((payment,i)=>{
                    const paymentdetails=[]
                    paymentdetails['id']=payment.paymentTermsId;
                    paymentdetails['label']=payment.paymentTerms;
                    selectedPaymentTerms.push(paymentdetails);
                     selectedpaymentids.push(payment.paymentTermsId);
                })

                /* const paymentTerms = response.data.data.paymentTerm
                .map(({ paymentTermsId }) => paymentTermsId)
                .join(', ')
                console.log('paymentTerms',paymentTerms);
                selectedPaymentTerms.push(paymentTerms) */
                

                setFormData((formData) => ({
                    ...formData,
                    ['firmName']: cus.firmName,
                    ['ContactPersonName']: cus.ContactPersonName,
                    ['address']: cus.address,
                    ['address']: cus.address,
                    ['officeAddress']: cus.officeAddress,
                    ['phoneNo']: cus.phoneNo,
                    ['mobileNo']: cus.mobileNo,
                    ['emailId']: cus.emailId,
                    ['countryId']: cus.countryId,
                    ['stateId']: cus.stateId,
                    ['cityId']: cus.cityId,
                    ['districtId']: selecteddistids,
                    ['selectedDistrict']: selecteddistics,
                    ['GSTNo']: cus.GSTNo,
                    ['PanNo']: cus.PanNo,
                    ['pincode']: cus.pincode,
                    ['ASOId']: selectedasoids,
                    ['selectedASO']: selectedaso,
                    ['selectedPaymentTerms']: selectedPaymentTerms,
                    ['paymentTerms']: selectedpaymentids,
                    ['BMId']:selectedbmids,
                    ['selectedBM']:selectedbm,
                }))

                // setselectedstate(getSelectedItem(emp.stateId,stateoptions))
                // setselectedcity(getSelectedItem(emp.cityId,cityoptions))

                /*setselectedrole(getSelectedItemrole(employeeMaster[id].roleId))
                        setselectedBM(getSelectedItemBM(employeeMaster[id].BMId))
                        setselectedRM(getSelectedItemRM(employeeMaster[id].reportingManager))
                        setselectedstatus(getSelectedItemstatus(employeeMaster[id].status))
                        setselectedrole(getSelectedItemrole(employeeMaster[id].roleId))
                        setselectedcredit(getSelectedItemcredit(employeeMaster[id].creditLimit))*/

                //setoldpassword(cus.password)
                setTimeout(() => {
                    set_is_edit_loaded(true)
                }, 500)
                // }
                // })

                console.log('cus', customerid)
            }
            console.log('customer data', response)
        }
    }

    const getCountries = async () => {
        var query = 'model=country_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            // setstates(response.data.data);
            var stateopts = []
            response.data.data.map((country, i) => {
                var st = []
                st['id'] = country.id
                st['label'] = country.countryName
                stateopts.push(st)
            })
            setcountryoptions(stateopts)
        }
    }

    const getstates = async (id = '') => {
        var query = 'model=states'
        const response = await getDataFromApi(
            'masters/districtMaster/getStateByCountryId/' + id,
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setstates(response.data.data)
            var stateopts = []
            response.data.data.map((state, i) => {
                var st = []
                st['id'] = state.id
                st['label'] = state.stateName
                stateopts.push(st)
            })
            setstateoptions(stateopts)
            console.log('states data', response)
        }
    }

    const getcities = async (id = '') => {
        // var query = "model=citys"
        // const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        const response = await getDataFromApi(
            'masters/allMasters/getCityBystateId/' + id
        )
        if (response && response.data.code && response.data.data != null) {
            setcities(response.data.data)
            var cityopts = []
            response.data.data.map((city, i) => {
                var st = []
                st['id'] = city.id
                st['label'] = city.cityName
                cityopts.push(st)
            })
            setcityoptions(cityopts)
            console.log('city data', response)
        }
    }
    const getDistrict = async (id = '') => {
        const response = await getDataFromApi(
            'masters/districtMaster/getDistrictByCityId/' + id
        )
        if (response && response.data.code && response.data.data != null) {
            var cityopts = []
            response.data.data.map((city, i) => {
                var st = []
                st['id'] = city.id
                st['label'] = city.districtName
                cityopts.push(st)
            })
            setdistrictoptions(cityopts)
            console.log('city data', response)
        }
    }

    const getBM = async () => {
        var query = 'employeeId=1'
        const response = await postDataFromApi(
            'masters/allMasters/getBMForEmployee',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setBM(response.data.data)
            var BMopts = []
            response.data.data.map((BM, i) => {
                var bm = []
                bm['id'] = BM.id
                bm['label'] = BM.fullName
                BMopts.push(bm)
            })
            setBMoptions(BMopts)
            console.log('BM data', response)
        }
    }

    const getASO = async () => {
        var query = 'employeeId=1'
        const response = await postDataFromApi(
            'masters/allMasters/getASOForEmployee',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setASO(response.data.data)
            var ASOopts = []
            response.data.data.map((ASO, i) => {
                var as = []
                as['id'] = ASO.id
                as['label'] = ASO.fullName
                ASOopts.push(as)
            })
            setASOoptions(ASOopts)
            console.log('ASO data', response)
        }
    }

    const [state, setState] = useState({
        date: new Date(),
    })
    const handleDateChange = (date) => {
        setState({ ...state, date })
    }
    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }

    function changedropdownvalue(type, e,multiple='') {
        if (e) {
            if (multiple == 'multiple') {
                var values = []
                e.map((prop, i) => {
                    var data = prop.id
                    values.push(data)
                })
                var value = values
            } else {
                var value = e.id
            }
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
        if (type == 'countryId') {
            getstates(e.id)
        }
        if (type == 'stateId') {
            getcities(e.id)
        }
        if (type == 'cityId') {
            getDistrict(e.id)
        }
    }

    function addrow() {
        getrows()
    }

    const getrows = async () => {
        setrows([...rows, { AttachmentName: [] }])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        var response = ''
        var newformdata = {
            firmName: formdata.firmName,
            ContactPersonName: formdata.ContactPersonName,
            address: formdata.address,
            officeAddress: formdata.officeAddress,
            phoneNo: formdata.phoneNo,
            mobileNo: formdata.mobileNo,
            emailId: formdata.emailId,
            countryId: formdata.countryId,
            stateId: formdata.stateId,
            cityId: formdata.cityId,
            districtId: formdata.districtId,
            GSTNo: formdata.GSTNo,
            PanNo: formdata.PanNo,
            pincode: formdata.pincode,
            ASOId: formdata.ASOId,
            BM: formdata.BMId,
            paymentTerms: formdata.paymentTerms,
            isActive: 1,
        }

        var editformdata = {
            id: newcustomerid,
            firmName: formdata.firmName,
            ContactPersonName: formdata.ContactPersonName,
            address: formdata.address,
            officeAddress: formdata.officeAddress,
            phoneNo: formdata.phoneNo,
            mobileNo: formdata.mobileNo,
            emailId: formdata.emailId,
            countryId: formdata.countryId,
            stateId: formdata.stateId,
            cityId: formdata.cityId,
            districtId: formdata.districtId,
            GSTNo: formdata.GSTNo,
            pincode: formdata.pincode,
            PanNo: formdata.PanNo,
            ASOId: formdata.ASOId,
            BM: formdata.BMId,
            paymentTerms: formdata.paymentTerms,
            isActive: 1,
        }
        console.log('newcustomerid', newcustomerid)
        if (newcustomerid) {
            response = await postDataFromApi(
                'masters/allMasters/updateCustomerMasters',
                editformdata
            )
            console.log('edit')
        } else {
            response = await postDataFromApi(
                'masters/allMasters/createCustomerMasters',
                newformdata
            )
            console.log('add')
        }
        console.log('edit response', response)
        if (response.data.code) {
            // getsku_masters()

            var customerid = response.data.data.id
                ? response.data.data.id
                : newcustomerid
            var val = formdata.file
            var atahcmentname = formdata.AttachmentName
            var attachdataDetails = []
            rows.map((val, i) => {
                var attachdata = {
                    customerId: customerid,
                    DocumentName:
                        formdata.AttachmentName['AttachmentName_' + i],
                    file:
                        formdata.file &&
                        formdata.file['file_' + i] != 'undefined'
                            ? formdata.file['file_' + i]
                            : '',
                }
                // attachdataDetails.push(attachdata)
                uploadattachmet(attachdata)
            })

            // getcustomer_masters()
            // getcustomerList()
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            setredirectcustomer(true)
            setIsDelete(false)
            setDeleteId('')
        } else {
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    const uploadattachmet = async (attachdataDetails) => {
        console.log('attachdata', attachdataDetails)
        var response = ''
        response = await postDataFromApi(
            'masters/allMasters/uploadCustomerImage',
            attachdataDetails
        )
        console.log('attachdataDetails response', response)
    }

    return is_edit_loaded ? (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: customerid ? 'Customer Edit' : 'Customer Add' },
                    ]}
                />
            </div>
            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/customer')}
            >
                Back to Customer
            </Button>
            <AlertMessage
                alert={alert}
                alermessage={alermessage}
                confirm={confirm}
                alerttype={alerttype}
            />
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            className="required"
                            id="firmName"
                            label="Firm Name"
                            type="text"
                            fullWidth
                            name="firmName"
                            value={formdata.firmName || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={[
                                'required',
                                'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$',
                            ]}
                            errorMessages={[
                                'this field is required',
                                'Only Characters allowed',
                            ]}
                        />
                        <TextField
                            fullWidth
                            className="required"
                            label="Phone No"
                            id="phoneNo"
                            type="text"
                            name="phoneNo"
                            value={formdata.phoneNo || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={[
                                'required',
                                'isNumber',
                                'matchRegexp:^[0-9]{10}$',
                            ]}
                            errorMessages={[
                                'this field is required',
                                'Only Numbers allowed',
                            ]}
                        />
                        <TextField
                            fullWidth
                            className="required"
                            label="Mobile No"
                            id="mobileNo"
                            type="text"
                            name="mobileNo"
                            value={formdata.mobileNo || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={[
                                'required',
                                'isNumber',
                                'matchRegexp:^[0-9]{10}$',
                            ]}
                            errorMessages={[
                                'this field is required',
                                'Only Numbers allowed',
                            ]}
                        />
                        <TextField
                            className="required"
                            id="address"
                            label="Address"
                            type="text"
                            fullWidth
                            name="address"
                            value={formdata.address || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            multiline
                            rows={3}
                        />
                        <AutoComplete
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.countryId,
                                countryoptions
                            )}
                            options={countryoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('countryId', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Country Name"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.countryId}
                                    name="countryId"
                                />
                            )}
                        />
                        <AutoComplete
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.stateId,
                                stateoptions
                            )}
                            filterSelectedOptions
                            options={stateoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('stateId', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="State Name"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.stateId}
                                    name="stateId"
                                />
                            )}
                        />
                        <TextField
                            className="required"
                            id="GSTNo"
                            label="GST no"
                            type="text"
                            fullWidth
                            name="GSTNo"
                            value={formdata.GSTNo || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            // validators={[
                            //     'required',
                            //     'matchRegexp:^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){15}$',
                            // ]}
                            validators={[
                                'required',
                                'matchRegexp:^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}Z[0-9a-zA-Z]{1}$',
                            ]}//new
                            errorMessages={[
                                'this field is required',
                                'enter valid GST Number',
                            ]}
                        />
                        <AutoComplete
                            fullWidth
                            multiple
                            defaultValue={formdata.selectedASO}
                            filterSelectedOptions
                            options={ASOoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('ASOId', value,'multiple')
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="ASO"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.ASOId}
                                    name="ASOId"
                                />
                            )}
                        />
                        <AutoComplete
                            fullWidth
                            multiple
                            defaultValue={formdata.selectedPaymentTerms}
                            filterSelectedOptions
                            options={paymentoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('paymentTerms', value,'multiple')
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Payment Terms"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.paymentTerms}
                                    name="paymentTerms"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            className="required"
                            id="ContactPersonName"
                            label="Contact Person Name"
                            type="text"
                            fullWidth
                            name="ContactPersonName"
                            value={formdata.ContactPersonName || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={[
                                'required',
                                'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$',
                            ]}
                            errorMessages={[
                                'this field is required',
                                'Only Characters allowed',
                            ]}
                        />
                        <TextField
                            className="required"
                            label="Email"
                            type="email"
                            name="emailId"
                            id="emailId"
                            fullWidth
                            value={formdata.emailId || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
                            ]}
                        />
                        <TextField
                            className="required"
                            id="officeAddress"
                            label="Register Address"
                            type="text"
                            fullWidth
                            name="officeAddress"
                            value={formdata.officeAddress || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            multiline
                            rows={3}
                        />
                        <TextField
                            className="required"
                            id="pincode"
                            label="Pin Code"
                            type="text"
                            fullWidth
                            name="pincode"
                            value={formdata.pincode || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={[
                                'required','matchRegexp:^[0-9]{6}$'
                            ]}
                            errorMessages={[
                                'this field is required',
                            ]}
                        />
                        <AutoComplete
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.cityId,
                                cityoptions
                            )}
                            filterSelectedOptions
                            options={cityoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('cityId', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="City"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.cityId}
                                    name="cityId"
                                />
                            )}
                        />
                        <AutoComplete
                        multiple
                            fullWidth
                            defaultValue={formdata.selectedDistrict}
                            options={districtoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('districtId', value,'multiple')
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Distridct Name"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.districtId}
                                    name="districtId"
                                />
                            )}
                        />
                        <TextField
                            className="required"
                            id="PanNo"
                            label="Pan no"
                            type="text"
                            fullWidth
                            name="PanNo"
                            value={formdata.PanNo || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={[
                                'required',
                                'matchRegexp:^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$',
                            ]}
                            errorMessages={[
                                'this field is required',
                                'Invalid PAN Details',
                            ]}
                        />
                        <AutoComplete
                            fullWidth
                            multiple
                            defaultValue={formdata.selectedBM}
                            filterSelectedOptions
                            options={BMoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('BMId', value,'multiple')
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="BM"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.BMId}
                                    name="BMId"
                                />
                            )}
                        />
                        
                    </Grid>
                </Grid>
                <Button
                    className="orderadd"
                    variant="outlined"
                    color="primary"
                    onClick={addrow}
                >
                    Add
                </Button>
                <table className="table table-hover table-bordered display">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Attachment Name</th>
                            <th>Image Upload</th>
                            <th>Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {existingfiles.map((img, i) => {
                            return (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{img.DocumentName}</td>
                                    <td></td>
                                    <td>
                                        <img
                                            src={
                                                MainUrl +
                                                '/uploads/' +
                                                img.fileName
                                            }
                                            className="imgPreview"
                                        />
                                    </td>
                                    <td>
                                        {' '}
                                        <IconButton
                                            onClick={() =>
                                                handleClickDeleteImg(img.id)
                                            }
                                        >
                                            <Icon color="primary">delete</Icon>
                                        </IconButton>
                                    </td>
                                </tr>
                            )
                        })}
                        {rows.map((rows, index) => (
                            <tr key={index}>
                                {' '}
                                <td>{existingfiles.length + index + 1}</td>
                                <td>
                                    <TextField
                                        className="required"
                                        id="AttachmentName"
                                        type="text"
                                        fullWidth
                                        name={'AttachmentName_' + index}
                                        value={
                                            formdata.AttachmentName[
                                                'AttachmentName_' + index
                                            ] !== undefined
                                                ? formdata.AttachmentName[
                                                      'AttachmentName_' + index
                                                  ]
                                                : ''
                                        }
                                        onChange={(e) =>
                                            AttachmentNamechange(e, index)
                                        }
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        className="required"
                                        id="file"
                                        type="file"
                                        fullWidth
                                        name={'file_' + index}
                                        onChange={(e) => filechange(e, index)}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                </td>
                                <td>
                                    <img
                                        src={
                                            formdata.imgPreview[
                                                'imgPreview_' + index
                                            ] !== undefined
                                                ? formdata.imgPreview[
                                                      'imgPreview_' + index
                                                  ]
                                                : ''
                                        }
                                        className={
                                            formdata.imgPreview[
                                                'imgPreview_' + index
                                            ] !== undefined
                                                ? 'imgPreview'
                                                : ''
                                        }
                                    />
                                </td>{' '}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button
                    variant="outlined"
                    color="secondary"
                    // onClick={handleClose}
                    onClick={() => navigate('/customer')}
                >
                    Cancel
                </Button>
                <Button variant="outlined" type="submit" color="primary">
                    Save
                </Button>
            </ValidatorForm>

            <Dialog
                open={deleteopen}
                disableBackdropClick
                disableEscapeKeyDown
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
                    <Button onClick={handledeleteConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    ) : (
        ''
    )
}

export default AppTable
