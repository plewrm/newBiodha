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
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@mui/material/FormControl'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import {
    postDataFromApi,
    getDataFromApi,
    putDataFromApi,
    MainUrl,
} from '../../services/CommonService'
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import AlertMessage from '../commoncomponent/AlertMessage'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { da } from 'date-fns/locale'

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

const aso = [{ id: '1', label: 'ASO' }]

const BM = [{ id: '1', label: 'BM' }]
const userlevel = [
    { id: '1', label: 'L1' },
    { id: '2', label: 'L2' },
    { id: '3', label: 'L3' },
]

const creditlimit = [
    { id: 1000, label: '1000' },
    { id: 2000, label: '2000' },
    { id: 3000, label: '3000' },
]

const Yard = [{ id: '1', label: 'yard' }]

const YardList = [{ id: '1', label: 'test' }]

const Statuses = [
    { id: 'join', label: 'join' },
    { id: 'notice', label: 'Notice' },
    { id: 'left', label: 'Left' },
]

const AppTable = () => {
    // let { empid } = 0;
    let { empid } = useParams()
    const navigate = useNavigate()
    const switchStyles = useN01SwitchStyles()
    const [dateopen, setdateOpen] = useState(false)
    const [states, setstates] = useState([])
    const [cities, setcities] = useState([])
    const [employeeMaster, setemployeeMaster] = useState([])
    const [role_masters, setrole_masters] = useState([])
    const [yard_masters, setyard_masters] = useState([])
    const [Logistic, setLogistic] = useState([])
    const [BM, setBM] = useState([])
    const [ASO, setASO] = useState([])
    const [ASOoptions, setASOoptions] = useState([])
    const [BMoptions, setBMoptions] = useState([])
    const [roleoptions, setroleoptions] = useState([])
    const [yardoptions, setyardoptions] = useState([])
    const [open, setOpen] = useState(false)
    const [deleteopen, setDeleteOpen] = useState(false)

    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState('')
    const [alerttype, setalerttype] = useState('')

    const [rows, setrows] = useState([])

    const [selectedstate, setselectedstate] = useState(null)
    const [selectedcity, setselectedcity] = useState(null)
    const [selectedrole, setselectedrole] = useState(null)
    const [selectedBM, setselectedBM] = useState(null)
    const [selectedRM, setselectedRM] = useState(null)
    const [selectedstatus, setselectedstatus] = useState(null)
    const [selectedcredit, setselectedcredit] = useState({})
    const [clearedDate, setClearedDate] = React.useState(null)
    const [formdata, setFormData] = useState({
        countryId: '',
        stateId: '',
        cityId: '',
        districtId: '',
        fullName: '',
        isActice: 1,
        date: null,
        password: '',
        creditLimit:[],
        file: [],
        AttachmentName: [],
        imgPreview: [],
    })
    const [oldpassword, setoldpassword] = useState('')

    const [showASO, setshowASO] = useState(false)
    const [showcredit, setshowcredit] = useState(false)
    const [showyard, setshowyard] = useState(false)
    const [showyardList, setshowyardList] = useState(false)
    const [file, setFile] = useState()
    const [existingfiles, setexistingfiles] = useState([])

    const [redirectemp, setredirectemp] = useState(false)
    const [is_delete, setIsDelete] = useState(false)
    const [delete_id, setDeleteId] = useState('')
    const [is_edit_loaded, set_is_edit_loaded] = useState(false)
    const [stateoptions, setstateoptions] = useState([])
    const [cityoptions, setcityoptions] = useState([])

    const [countryoptions, setcountryoptions] = useState([])
    const [districtoptions, setdistrictoptions] = useState([])
    function setdefaultvalue() {
        setselectedstate()
        setselectedcity()
        setselectedrole()
        setselectedBM()
        setselectedRM()
        setselectedstatus()
        setselectedcredit()
        setFormData({
            fullName: '',
            stateId: '',
            cityId: '',
            location: '',
            nameOfYard: '',
            password: '',
            file: [],
            AttachmentName: [],
            imgPreview: [],
        })
    }

    function getSelectedItemcredit(id, data = []) {
        if (!data) {
            data = creditlimit
        }
        const item = data.find((opt) => {
            if (opt.id == id) return opt
        })
        return item || null
    }
    function getSelectedItemstatus(id) {
        const item = Statuses.find((opt) => {
            if (opt.id == id) return opt
        })
        return item || null
    }
    function getSelectedItem(id, data = [], multiple = '', label = '') {
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
            console.log('multiplerecords',id)
            var items=[];
            data.map((opt,i)=>{
                if(!Array.isArray(id)){
                   id=id.toString().split(',')
                }
                if( id.indexOf(opt.id) > -1){
                    items.push(opt)
                }
            })
            console.log('multiplerecordsitems',items)
            return items
        } else {
            return item || null
        }
    }
    function getSelectedItemcity(id) {
        const item = cityoptions.find((opt) => {
            if (opt.id == id) return opt
        })
        return item || null
    }
    function getSelectedItemrole(id) {
        const item = roleoptions.find((opt) => {
            if (opt.id == id) return opt
        })
        return item || null
    }
    function getSelectedItemBM(id) {
        const item = BMoptions.find((opt) => {
            if (opt.id == id) return opt
        })
        return item || null
    }
    function getSelectedItemRM(id) {
        const item = BMoptions.find((opt) => {
            if (opt.id == id) return opt
        })
        return item || null
    }

    function handleClose() {
        setOpen(false)
    }
    function handleDeleteOpen() {
        setDeleteOpen(true)
    }
    function handledeleteClose() {
        setDeleteOpen(false)
        setIsDelete(false)
        setDeleteId('')
    }

    const handledeleteConfirm = async (e) => {
        if (is_delete) {
            var imgdata = {
                id: delete_id,
            }
            var response = ''
            if (empid) {
                response = await postDataFromApi(
                    'masters/allMasters/deleteEmployeeImage',
                    imgdata
                )
            }

            console.log('edit response', response)
            if (response.data.code) {
                // getemployeeMaster()
                setredirectemp(false)
                setIsDelete(false)
                setDeleteId('')
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('success')
            } else {
                // getemployeeMaster()
                setalermessage(response.data.message)
                setalert(true)
                setalerttype('error')
                setIsDelete(false)
                setDeleteId('')
            }
        }
        setDeleteOpen(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formdata)
        const momentdate = moment(formdata.date)
        var newdate = momentdate.format('Y-MM-DD')
        console.log(newdate)

        var newformdata = {
            fullName: formdata.fullName,
            address: formdata.address,
            mobile: formdata.mobile,
            emailId: formdata.emailId,
            countryId: formdata.countryId,
            stateId: formdata.stateId,
            cityId: formdata.cityId,
            districtId:formdata.districtId,
            roleId: formdata.roleId,
            yardId: formdata.yardId,
            ASOId: formdata.ASOId,
            creditLimit: formdata.creditLimit,
            BMId: formdata.BMId,
            employeeJoiningDate: newdate,
            status: formdata.status,
            reportingManager: formdata.reportingManager,
            password: formdata.password,
            isActive: formdata.isActice,
        }

        var editformdata = {
            id: empid,
            fullName: formdata.fullName,
            address: formdata.address,
            mobile: formdata.mobile,
            emailId: formdata.emailId,
            countryId: formdata.countryId,
            stateId: formdata.stateId,
            cityId: formdata.cityId,
            districtId:formdata.districtId,
            roleId: formdata.roleId,
            yardId: formdata.yardId,
            ASOId: formdata.ASOId,
            creditLimit: formdata.creditLimit,
            BMId: formdata.BMId,
            employeeJoiningDate: newdate,
            status: formdata.status,
            reportingManager: formdata.reportingManager,
            password: formdata.password,
            isActive: formdata.isActice,
        }
        if (empid) {
            if (formdata.password == '') {
                editformdata['password'] = oldpassword
            }
        }

        var response = ''
        if (empid) {
            response = await postDataFromApi(
                'masters/allMasters/updateEmployeeMasters',
                editformdata
            )
        } else {
            response = await postDataFromApi(
                'masters/allMasters/createEmployeeMasters',
                newformdata
            )
        }
        console.log('edit response', response)
        if (response.data.code) {
            var employeeid = response.data.data.id
                ? response.data.data.id
                : empid
            var val = formdata.file
            var atahcmentname = formdata.AttachmentName
            var attachdataDetails = []
            rows.map((val, i) => {
                var attachdata = {
                    employeeId: employeeid,
                    AttachmentName:
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

            // getemployeeMaster();
            setredirectemp(true)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            setIsDelete(false)
            setDeleteId('')
        } else {
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
            setIsDelete(false)
            setDeleteId('')
        }
    }
    const uploadattachmet = async (attachdataDetails) => {
        console.log('attachdata', attachdataDetails)
        var response = ''
        response = await postDataFromApi(
            'masters/allMasters/uploadEmployeeImage',
            attachdataDetails
        )
        console.log('attachdataDetails response', response)
    }
    useEffect(() => {
        getyard_masters()
        getLogistic()
        getCountries()
        // getstates()  
        // getcities();
        getrole_masters()
        getBM()
        getASO()
        // setdefaultvalue();

        if (empid) {
            getemployeeMaster()
        } else {
            set_is_edit_loaded(true)
        }
    }, [])

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

    const getstates = async (id="") => {
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

    const getrole_masters = async () => {
        var query = 'model=role_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setrole_masters(response.data.data)
            var roleopts = []
            response.data.data.map((role, i) => {
                var st = []
                st['id'] = role.id
                st['label'] = role.roleName
                roleopts.push(st)
            })
            setroleoptions(roleopts)

            console.log('role data', response)
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

    const getyard_masters = async () => {
        var query = 'model=yard_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setyard_masters(response.data.data)
            var yardopts = []
            response.data.data.map((yard, i) => {
                var yd = []
                yd['id'] = yard.id
                yd['label'] = yard.nameOfYard
                yardopts.push(yd)
            })
            setyardoptions(yardopts)

            console.log('yar data', response)
        }
    }

    const getLogistic = async () => {
        var query = 'model=yard_masters'
        const response = await postDataFromApi(
            'masters/allMasters/findActiveAll',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setLogistic(response.data.data)
            var yardopts = []
            response.data.data.map((Logistic, i) => {
                var yd = []
                yd['id'] = Logistic.id
                yd['label'] = Logistic.nameOfYard
                yardopts.push(yd)
            })
            setyardoptions(yardopts)

            console.log('Logistic data', response)
        }
    }

    const getemployeeMaster = async () => {
        var query = 'id=' + empid
        // const response = await getDataFromApi('masters/allMasters/employeeMasterList', query);
        const response = await postDataFromApi(
            'masters/allMasters/getEmployeeDetails',
            query
        )
        if (response && response.data.code && response.data.data != null) {
            setemployeeMaster(response.data.data)
            setexistingfiles(response.data.data.images)
            console.log(response.data.data.images)
            //const emp=response.data.data

            if (empid) {
                var emp = response.data.data
                getstates(emp.countryId)
                getcities(emp.stateId)
               
                getDistrict(emp.cityId)
                // const employe=response.data.data.map((emp,i)=>{
                // if(emp.id==empid){
                console.log('empname', emp.fullName)
                var yardids = []
                var yardidss = []
                emp.yard.map((yrd, index) => {
                    var pmarr = []
                    
                    pmarr['id'] = yrd.yardId
                    pmarr['label'] = yrd.nameOfYard
                    yardids.push(pmarr)
                    yardidss.push(yrd.yardId)
                })
                console.log('yardidss',yardidss)
                var asoids = []
                var pmarrids = []
                emp.aso.map((asoid, index) => {
                    
                    var pmarr = []
                    pmarr['id'] = asoid.ASOId
                    pmarr['label'] = asoid.fullName
                    asoids.push(pmarr)
                    pmarrids.push(asoid.ASOId)
                })
                var creditids = []
                var creditid = []
                emp.creditLimit.map((cred, index) => {
                    
                    var pmarr = []
                    pmarr['id'] = cred.creditLimitId
                    pmarr['label'] = cred.fullName
                    creditids.push(pmarr)
                    creditid.push(cred.creditLimitId)
                })
                console.log('creditid',creditid)
                setFormData((formData) => ({
                    ...formData,
                    ['fullName']: emp.fullName,
                    ['emailId']: emp.emailId,
                    ['mobile']: emp.mobile,
                    ['address']: emp.address,
                    ['countryId']: emp.countryId,
                    ['stateId']: emp.stateId,
                    ['cityId']: emp.cityId,
                    ['districtId']:emp.districtId,
                    ['date']: emp.EmployeeJoiningDate,
                    ['roleId']: emp.roleId,
                    ['status']: emp.status,
                    ['BMId']: emp.BMId,
                    ['reportingManager']: emp.reportingManager,
                    ['yardId']: yardidss,
                    ['yardids']: yardids,
                    ['ASOId']: pmarrids,
                    ['asoids']: asoids,
                    ['creditLimit']: creditid,
                    ['employeeJoiningDate']: emp.employeeJoiningDate,
                }))
                if (emp.roleName == 'BM') {
                    setshowASO(true)
                    setshowcredit(true)
                    setshowyard(true)
                } else if (emp.roleName == 'ASO') {
                    // var asoids=[];
                    // response.datta.datta.aso.map((asoid, index) => {
                    //     var pmarr=[];
                    //     pmarr['id']=asoid.id
                    //     pmarr['label']=asoid.paymentTerms
                    //     asoids.push(pmarr)
                    // })
                    // setFormData((formData) => ({
                    //     ...formData,
                    // }));
                    setshowASO(true)
                    setshowcredit(false)
                    setshowyard(true)
                } else if (emp.roleName == 'Yard') {
                    setshowASO(false)
                    setshowcredit(false)
                    setshowyard(true)
                }
                else if (emp.roleName == 'Logistic team') {
                    setshowASO(false)
                    setshowcredit(false)
                    setshowyard(true)
                }
                else {
                    setshowASO(false)
                    setshowcredit(false)
                    setshowyard(false)
                }

                // setselectedstate(getSelectedItem(emp.stateId,stateoptions))
                // setselectedcity(getSelectedItem(emp.cityId,cityoptions))

                /*setselectedrole(getSelectedItemrole(employeeMaster[id].roleId))
                        setselectedBM(getSelectedItemBM(employeeMaster[id].BMId))
                        setselectedRM(getSelectedItemRM(employeeMaster[id].reportingManager))
                        setselectedstatus(getSelectedItemstatus(employeeMaster[id].status))
                        setselectedrole(getSelectedItemrole(employeeMaster[id].roleId))
                        setselectedcredit(getSelectedItemcredit(employeeMaster[id].creditLimit))*/
                console.log('selectedstate', selectedstate)
                setoldpassword(emp.password)
                setTimeout(() => {
                    set_is_edit_loaded(true)
                }, 500)
                // }
                // })

                console.log('eh', empid)
            }
            console.log('employeeMasterList data', response)
        }

        /*if(empid){
             setFormData((formData) => ({
                ...formData,
                ['fullName']:employeeMaster[empid].fullName,
            }));
        }*/
    }

    const handleDateChange = (date) => {
        setFormData((formData) => ({
            ...formData,
            date,
        }))
    }
    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        /*if(e.target.files){
          var AttachmentName = e.target.files[0].name;
          console.log(e.target.files[0].name);
        }*/

        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }

    function changedropdownvalue(type, e) {
        console.log('e', e)
        console.log('type', type)
        if (e && type == 'roleId') {
            if (e.label == 'BM') {
                setshowASO(true)
                setshowcredit(true)
                setshowyard(true)
            } else if (e.label == 'ASO') {
                setshowASO(true)
                setshowcredit(false)
                setshowyard(true)
            } else if (e.label == 'Yard') {
                setshowASO(false)
                setshowcredit(false)
                setshowyard(true)
            }
            
            else if (e.label == 'Logistic team') {
                setshowASO(false)
                setshowcredit(false)
                setshowyard(true)
            }
            
            else {
                setshowASO(false)
                setshowcredit(false)
                setshowyard(false)
            }
        }

        if (e) {
            if (type == 'yardId' || type == 'ASOId'|| type == 'creditLimit' ) {
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
       
        if (type == 'countryId') {
            getstates(e.id)
        }
        if (type == 'stateId') {
            getcities(e.id)
        }
        if (type == 'cityId') {
            getDistrict(e.id)
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
        console.log(type)
        console.log('formdata.creditLimit',formdata.creditLimit)
        console.log(value)
    }

    function confirm() {
        setalert(false)
        if (redirectemp) {
            navigate('/employee')
        }
    }

    function addrow() {
        getrows()
    }

    const getrows = async () => {
        setrows([...rows, { AttachmentName: [] }])
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
    const handleClickDeleteImg = async (id) => {
        setDeleteId(id)
        setDeleteOpen(true)
        setIsDelete(true)

        /*var imgdata={
            "id":id
        }
        var response ="";
        if(empid){
             response = await postDataFromApi('masters/allMasters/deleteEmployeeImage', imgdata);
        }
        
        console.log('edit response',response)
        if(response.data.code){
            getemployeeMaster()
            setredirectemp(false)
           
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
        }
        else{
            getemployeeMaster()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }*/
    }
console.log("formdata",formdata)
    return is_edit_loaded ? (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: empid ? 'Employee Edit' : 'Employee Add' },
                    ]}
                />
            </div>

            <Button
                className="rightalign_btn"
                variant="outlined"
                color="primary"
                onClick={() => navigate('/employee')}
            >
                Back to Employee
            </Button>
            <AlertMessage
                alert={alert}
                alermessage={alermessage}
                confirm={confirm}
                alerttype={alerttype}
            />
            <Box width="100%" overflow="auto"></Box>

            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            className="required"
                            id="fullName"
                            label="Full Name"
                            type="text"
                            fullWidth
                            name="fullName"
                            value={formdata.fullName || ''}
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
                            label="Mobile No"
                            type="text"
                            name="mobile"
                            value={formdata.mobile || ''}
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

                        <AutoComplete
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.roleId,
                                roleoptions
                            )}
                            options={roleoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('roleId', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Role"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.roleId}
                                    name="roleId"
                                />
                            )}
                        />
                        <AutoComplete
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.BMId,
                                BMoptions
                            )}
                            options={BMoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('BMId', value)
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
                        <div className="datediv">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    value={formdata.date}
                                    open={dateopen}
                                    onOpen={() => setdateOpen(true)}
                                    onClose={() => setdateOpen(false)}
                                    onChange={(e) => handleDateChange(e)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            // variant="Outlined"
                                            className="required"
                                            id="mui-pickers-date"
                                            label="Employee joing date "
                                            sx={{ mb: 2, width: '100%' }}
                                            onClick={(e) => setdateOpen(true)}
                                            value={formdata.date}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required'
                                            ]}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
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
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            autoComplete="new-password"
                            className="required"
                            label="Email"
                            value={formdata.emailId || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            type="email"
                            name="emailId"
                            id="emailId"
                            fullWidth
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
                            ]}
                        />
                        <TextField
                            autoComplete="new-password"
                            className="required"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            name="password"
                            value={formdata.password || ''}
                            onChange={(e) => formdatavaluechange(e)}
                            validators={
                                empid
                                    ? []
                                    : ['required', 'matchRegexp:^.{5,255}$']
                            }
                            errorMessages={[
                                'this field is required',
                                'Minimum 5 characters required',
                            ]}
                        />
                        <AutoComplete
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.cityId,
                                cityoptions
                            )}
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
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.districtId,
                                districtoptions
                            )}
                            options={districtoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('districtId', value)
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
                         
                         {showcredit ? ( 
                           
                            <AutoComplete
                                fullWidth
                                multiple
                                defaultValue={getSelectedItem(
                                    formdata.creditLimit,
                                    creditlimit,'multiple'
                                )}
                                options={creditlimit}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('creditLimit', value,'multiple')
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Credit limit"
                                        variant="outlined"
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                        value={formdata.creditLimit}
                                        name="creditLimit"
                                    />
                                )}
                            />
                      ) : (
                            ''
                        )}
                         {showASO ? ( 
                            <AutoComplete
                                defaultValue={formdata.asoids}
                                fullWidth
                                multiple
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
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                        value={formdata.ASOId}
                                        name="ASOId"
                                    />
                                )}
                            />
                         ) : (
                            ''
                        )} 
                         {showyard ? ( 
                            <AutoComplete
                                /* defaultValue={
                                    formdata.yardId ? formdata.yardids : null
                                } */
                                defaultValue={
                                    formdata.yardids}
                                fullWidth
                                multiple
                                options={yardoptions}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue('yardId', value,'multiple')
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Yard"
                                        variant="outlined"
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                        value={formdata.yardId}
                                        name="yardId"
                                    />
                                )}
                            />
                       ) : (
                            ''
                        )} 
                        <AutoComplete
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.status,
                                Statuses
                            )}
                            options={Statuses}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('status', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Status"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.status}
                                    name="status"
                                />
                            )}
                        />
                        <AutoComplete
                            fullWidth
                            defaultValue={getSelectedItem(
                                formdata.reportingManager,
                                BMoptions
                            )}
                            options={BMoptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue('reportingManager', value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Reporting Manager"
                                    variant="outlined"
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={formdata.reportingManager}
                                    name="reportingManager"
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
                                    <td>{img.AttachmentName}</td>
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
                    onClick={() => navigate('/employee')}
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
