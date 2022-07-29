import React,{useEffect,useState} from 'react'
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
import { ValidatorForm, TextValidator,SelectValidator } from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'
import MenuItem from "@material-ui/core/MenuItem";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import {postDataFromApi,getDataFromApi,putDataFromApi,MainUrl} from '../../services/CommonService';
import SweetAlert from 'react-bootstrap-sweetalert';
import AlertMessage from '../commoncomponent/AlertMessage'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography'
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
        ContactPersonName : 'test1',
        phoneNo : '1237854234',
    },
    {
        no: '2',
        firmName: 'test1',
        ContactPersonName : 'test1',
        phoneNo : '1237854234',
    }
    
]

const states = [
    {
        stateName: 'gujarat',
       
    }
    
]
const cities = [
    {
        cityName: 'amhedabad',
       
    }
    
]

const AppTable = () => {
    let { customerid } = useParams();
    let { id } = useParams()//new
    let { status } = useParams();
    let newcustomerid=customerid ? customerid : ''
    // const paramid = id
    const navigate = useNavigate()
    const [states,setstates]=useState([])
    const [cities,setcities]=useState([])
	const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)
    const [formdata,setFormData]=useState({firmName:"",ContactPersonName:"",
    address:"",officeAddress:"",phoneNo:"",emailId:"",stateId:"",cityId:"",GSTNo:"",PanNo:"",ASOId:"",BM:"",file:[],AttachmentName:[],imgPreview:[]}) 
	const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const [skuproperties,setskuproperties]=useState([])
    const [customer_masters,setcustomer_masters]=useState([])
    const [BM,setBM]=useState([]) 
    const [paymentTerm,setpaymentTerm]=useState([]) //new
    const [ASO,setASO]=useState([])
    const [ASOoptions,setASOoptions]=useState([]); 
    const [BMoptions,setBMoptions]=useState([]); 
    const [paymentTermoptions,setpaymentTermoptions]=useState([]);//new
    const [redirectcustomer,setredirectcustomer]=useState(false)
    const [rows,setrows]=useState([])
    const [file, setFile] = useState()
    const [existingfiles, setexistingfiles] = useState([])
    const [is_delete,setIsDelete]=useState(false)
    // const [delete_id,setDeleteId]=useState("")
    const [is_edit_loaded,set_is_edit_loaded]=useState(false)
    const [statuschange, setstatuschange] = useState(false)//new
    const [delete_id, setdeleteId] = useState('')//new
    const [check_status, setcheck_status] = useState('')//new 
    const [redirectorder, setredirectorder] = useState(false)//new
    const [redirectUrl, setRedirectUrl] = useState('')//new
    const [mulBM,setmulBM]= useState('')
    const [mulpaymentTerm,setmulpaymentTerm]= useState('')
  
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
    const handleClickappr_reject = async (status) => {
        setstatuschange(true)
        // setdeleteId(id)
        setcheck_status(status)
    }

    function handledeleteClose() {
        // setDeleteOpen(false)
        setstatuschange(false)
        setdeleteId('')
        setcheck_status('')
    } 
    const handledeleteConfirm= async (e) =>{
        if(is_delete){
             var imgdata={
                    "id":delete_id
                }
                var response ="";
                if(customerid){
                     response = await postDataFromApi('masters/allMasters/deleteCustomerImage', imgdata);
                }
                
                console.log('edit response',response)
                if(response.data.code){
                    getcustomer_masters()
                    setredirectcustomer(false)
                    setIsDelete(false)
                    setdeleteId("")
                    setalermessage(response.data.message)
                    setalert(true)
                    setalerttype('success')
                }
                else{
                    getcustomer_masters()
                    setalermessage(response.data.message)
                    setalert(true)
                    setalerttype('error')
                    setIsDelete(false)
                    setdeleteId("")
             }
        }
        setDeleteOpen(false)
    } 
    const handleClickDeleteImg= async (id) =>{
        setdeleteId(id)
        setDeleteOpen(true)
        setIsDelete(true)

    }
    const filechange=(event,index)=>{
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        var imgurl = URL.createObjectURL(event.target.files[0])
        console.log(imgurl)
         

        var images=formdata.imgPreview;
        images['imgPreview_'+index]=imgurl
        
        setFormData((formData) => ({
            ...formData,
            imgPreview:images,
        }));



        var selectedFile=""
        reader.onload = (e) => {
             selectedFile= e.target.result
             var values=formdata['file']
             console.log(event.target.name)
             console.log(selectedFile)
             values[event.target.name]=selectedFile
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
    const AttachmentNamechange=(e,index)=>{
        var values=formdata['AttachmentName']
        console.log('values',e.target.value)
        values[e.target.name]=e.target.value
        
        setFormData((formData) => ({
            ...formData,
            values,
        }));
    }

    function getSelectedItem(id,data=[],label=""){
            console.log('mainoptiondata',data)
            const item = data.find((opt)=>{
            if(label){
                if (opt.label == id)
                return opt;
            }
            else{
                if (opt.id == id)
                return opt;
            }

            })
            console.log('item',item)
            return item || null;
        
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
    useEffect(() => {
        getstates();
        getcities();
        getASO();
        getBM();
        getpaymentTerm();
        getdatatable();
        //getcustomer_masters();

        if(customerid){
            setTimeout(() => {
             getcustomer_masters();
            }, 500)
           
             
        }
        else{
            set_is_edit_loaded(true)
        }
    }, []);
    
   

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
    const [stateoptions,setstateoptions]=useState([]);

    const [cityoptions,setcityoptions]=useState([]);

    function confirm(){
        setalert(false)
        if (redirectcustomer){   navigate('/customer') }
        else{
            navigate(redirectUrl)
        }
        
    }


    const getcustomer_masters = async () => {
      
        
        var query = "id="+customerid
        // const response = await getDataFromApi('masters/allMasters/employeeMasterList', query);
        const response = await postDataFromApi('masters/allMasters/getCustomerDetails', query);
        if(response && response.data.code && response.data.data!=null){
            setcustomer_masters(response.data.data);
            setexistingfiles(response.data.data.images)
            console.log(response.data.data.images)
              
            const multipleBM = response.data.data.BM
                .map(({ fullName }) => fullName)
                .join(', ')

            console.log('multipleBM',multipleBM)
            setmulBM(multipleBM);
            // setPaymentTerm(PaymentTerm)
            //setpaymentTerms(paymentTerms)
            const multiplePT = response.data.data.paymentTerm
                .map(({ paymentTerms }) => paymentTerms)
                .join(', ')

            console.log('multiplePT',multiplePT)
            setmulpaymentTerm(multiplePT);

            //const emp=response.data.data
            if(customerid){
                var cus=response.data.data
                    // const employe=response.data.data.map((emp,i)=>{
                    // if(emp.id==empid){
                        console.log('cusname',cus.fullName)
                        setFormData((formData) => ({
                            ...formData,
                            ['firmName']:cus.firmName,
                            ["ContactPersonName"]:cus.ContactPersonName,
                            ["address"]:cus.address,
                            ['address']:cus.address,
                            ['officeAddress']:cus.officeAddress,
                            ['phoneNo']:cus.phoneNo,
                            ['emailId']:cus.emailId,
                            ['stateId']:cus.stateId,
                            ['cityId']:cus.cityId,
                            ['GSTNo']:cus.GSTNo,
                            ['PanNo']:cus.PanNo,
                            ['ASOId']:cus.ASOMaster,
                            ['BMId']:cus.BM,
                            
                        }));
                        
                        // setselectedstate(getSelectedItem(emp.stateId,stateoptions))
                        // setselectedcity(getSelectedItem(emp.cityId,cityoptions))
                       
                        /*setselectedrole(getSelectedItemrole(employeeMaster[id].roleId))
                        setselectedBM(getSelectedItemBM(employeeMaster[id].BMId))
                        setselectedRM(getSelectedItemRM(employeeMaster[id].reportingManager))
                        setselectedstatus(getSelectedItemstatus(employeeMaster[id].status))
                        setselectedrole(getSelectedItemrole(employeeMaster[id].roleId))
                        setselectedcredit(getSelectedItemcredit(employeeMaster[id].creditLimit))*/
                        
                        //setoldpassword(cus.password)
                        set_is_edit_loaded(true)
                    // }
                // })
                
                console.log('cus',customerid)
                
                
            }
            console.log('customer data',response);
        }
       
        
    } 

    const getstates = async () => {
        
        var query = "model=states"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if(response && response.data.code && response.data.data!=null){
            setstates(response.data.data);
            var stateopts=[];
            response.data.data.map((state,i)=>{
                var st=[];
                st['id']=state.id
                st['label']=state.stateName
                stateopts.push(st)
            })
            setstateoptions(stateopts)
            console.log('states data',response);
        }
        
    } 

    const getcities = async () => {
        
        var query = "model=citys"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if(response && response.data.code && response.data.data!=null){
            setcities(response.data.data);
            var cityopts=[];
            response.data.data.map((city,i)=>{
                var st=[];
                st['id']=city.id
                st['label']=city.cityName
                cityopts.push(st)
            })
            setcityoptions(cityopts)
            console.log('city data',response);
        }
        
    } 
    
    const getBM = async () => {
        
        var query = "employeeId=1"
        const response = await postDataFromApi('masters/allMasters/getBMForEmployee', query);
        if(response && response.data.code && response.data.data!=null){
            setBM(response.data.data);
            var BMopts=[];
            response.data.data.map((BM,i)=>{
                var bm=[];
                bm['id']=BM.id
                bm['label']=BM.fullName
                BMopts.push(bm)
            })
            setBMoptions(BMopts)
            console.log('BM data',response);
        }
        
    }  

    const getpaymentTerm = async () => {
        
        var query = "employeeId=1"
        // const response = await postDataFromApi('masters/allMasters/getBMForEmployee', query);
        const response = await postDataFromApi('masters/allMasters/getCustomerDetails', query);
        if(response && response.data.code && response.data.data!=null){
            setpaymentTerm(response.data.data);
            var PTopts=[];
            response.data.data.map((paymentTerm,i)=>{
                var pt=[];
                pt['id']=paymentTerm.id
                pt['label']=paymentTerm.paymentTerms
                PTopts.push(pt)
            })
            setpaymentTermoptions(PTopts)
            console.log('PT data',response);
        }
        
    } 

    const getASO = async () => {
        
        var query = "employeeId=1"
        const response = await postDataFromApi('masters/allMasters/getASOForEmployee', query);
        if(response && response.data.code && response.data.data!=null){
            setASO(response.data.data);
            var ASOopts=[];
            response.data.data.map((ASO,i)=>{
                var as=[];
                as['id']=ASO.id
                as['label']=ASO.fullName
                ASOopts.push(as)
            })
            setASOoptions(ASOopts)
            console.log('ASO data',response);
        }
        
    } 

     const [state, setState] = useState({
        date: new Date(),
    })
	const handleDateChange = (date) => {
	        setState({ ...state, date })
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

    function addrow(){
       getrows()
    } 

    const getrows = async () => {
        setrows([...rows,{AttachmentName:[]}])
               
    }    


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        var response ="";
        var newformdata={
            "firmName": formdata.firmName,
            "ContactPersonName": formdata.ContactPersonName,
            "address":  formdata.address, 
            "officeAddress": formdata.officeAddress,
            "phoneNo":formdata.phoneNo,
            "emailId":formdata.emailId,
            "stateId":formdata.stateId,
            "cityId":formdata.cityId,
            "GSTNo":formdata.GSTNo,
            "PanNo":formdata.PanNo,
            "ASOMaster":formdata.ASOId,
            "BM":formdata.BMId,
            "isActive":1
        }

        var editformdata={
            "id": newcustomerid,
            "firmName": formdata.firmName,
            "ContactPersonName": formdata.ContactPersonName,
            "address":  formdata.address, 
            "officeAddress": formdata.officeAddress,
            "phoneNo":formdata.phoneNo,
            "emailId":formdata.emailId,
            "stateId":formdata.stateId,
            "cityId":formdata.cityId,
            "GSTNo":formdata.GSTNo,
            "PanNo":formdata.PanNo,
            "ASOMaster":formdata.ASOId,
            "BM":formdata.BMId,
            "isActive":1
        }
        console.log('newcustomerid',newcustomerid)
        if(newcustomerid){
             response = await postDataFromApi('masters/allMasters/updateCustomerMasters', editformdata);
             console.log("edit")
        }
        else{
             response = await postDataFromApi('masters/allMasters/createCustomerMasters', newformdata);
             console.log("add")
        }
        console.log('edit response',response)
        if(response.data.code){
            // getsku_masters()

            var customerid=response.data.data.id ? response.data.data.id : newcustomerid;
            var val=formdata.file;
            var atahcmentname=formdata.AttachmentName;
            var attachdataDetails=[];
            rows.map((val,i)=>{
                 var attachdata={
                    "customerId":customerid,
                    "DocumentName": formdata.AttachmentName['AttachmentName_'+i],
                    "file":formdata.file && formdata.file['file_'+i]!='undefined'? formdata.file['file_'+i] : ""
                }
                // attachdataDetails.push(attachdata)
                uploadattachmet(attachdata)
            })


            getcustomer_masters()
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            setredirectcustomer(true)
            setIsDelete(false)
            setdeleteId("")
        }
        else{
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }

    }

    const uploadattachmet = async (attachdataDetails) => {
       
        console.log('attachdata',attachdataDetails)
        var response ="";
        response = await postDataFromApi('masters/allMasters/uploadCustomerImage', attachdataDetails);
        console.log('attachdataDetails response',response)
    }

    const handleapprovelConfirm = async () => {
        var newformdata = {
            approvalStatus: check_status
        }
        var response = ''

        response = await postDataFromApi(
            'dashboard/allDashboard/approveOrRejectCustomer/'+customerid,
            newformdata
        )
        

        console.log('edit response', response)
        if (response.data.code) {
            setstatuschange(false)
            if (check_status) {
                setalermessage('Approvel Successfully')
            } else {
                setalermessage('Approvel Rejected')
            }
            setalert(true)
            setalerttype('success')
            setredirectorder(true)
            setRedirectUrl('/dashboard/default')
        } else {
            setstatuschange(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    return is_edit_loaded ? (
     <Container>
	     <div className="breadcrumb leftalign_breadcrumb">
	                <Breadcrumb
	                    routeSegments={[
	                        { name: 'Customer View'},
	                    ]}
	                />
	      </div>
          <Button className="rightalign_btn" variant="outlined"
                color="primary"  onClick={() => navigate('/customer')}>
                Back to Customer
            </Button>
            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/> 
	        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    
                        <Grid container spacing={3} className="orderview">
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <table className="table table-hover table-bordered viewtable">
                                    <tbody>
                                        <tr>
                                           <td><Typography><span>Firm Name</span></Typography></td>
                                           <td><Typography>{formdata.firmName}</Typography></td>
                                        </tr>
                                        <tr>
                                           <td><Typography><span>Phone No</span></Typography></td>
                                           <td><Typography>{formdata.phoneNo}</Typography></td>
                                        </tr>
                                        <tr>
                                           <td><Typography><span>Address</span></Typography></td>
                                           <td><Typography>{formdata.address}</Typography></td>
                                        </tr>
                                        <tr>
                                          <td><Typography><span>State Name</span></Typography></td>
                                            <td><Typography>{customer_masters.stateName}</Typography></td>
                                        </tr>
                                        <tr>
                                           <td><Typography><span>GST No</span></Typography></td>
                                           <td><Typography>{formdata.GSTNo}</Typography></td>
                                        </tr>
                                        <tr>
                                           <td><Typography><span>ASO</span></Typography></td>
                                           <td><Typography>{
                                           customer_masters.ASO.map((aso,i)=>{
                                               return i==0 ? aso.fullName : ','+aso.fullName
                                           })
                                           
                                           }</Typography></td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                                
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                               <table className="table table-hover table-bordered viewtable">
                                    <tbody>
                                        <tr>
                                           <td><Typography><span>Contact Person Name</span></Typography></td>
                                           <td><Typography>{formdata.ContactPersonName}</Typography></td>
                                        </tr>
                                        <tr>
                                           <td><Typography><span>Email</span></Typography></td>
                                           <td><Typography>{formdata.emailId}</Typography></td>
                                        </tr>
                                        <tr>
                                           <td><Typography><span>Office Address</span></Typography></td>
                                           <td><Typography>{formdata.officeAddress}</Typography></td>
                                        </tr>
                                        <tr>
                                          <td><Typography><span>City Name</span></Typography></td>
                                            <td><Typography>{customer_masters.cityName}</Typography></td>
                                        </tr>
                                        <tr>
                                           <td><Typography><span>Pan No</span></Typography></td>
                                           <td><Typography>{formdata.PanNo}</Typography></td>
                                        </tr>
                                        <tr>
                                           <td><Typography><span>BM</span></Typography></td>
                                           <td><Typography>{mulBM}</Typography></td>
                                        </tr>
                                        <tr>
                                           <td><Typography><span>Payment Term</span></Typography></td>
                                           <td><Typography>{mulpaymentTerm}</Typography></td>
                                        </tr>
                                    </tbody>
                                </table>  
                            </Grid>
                        </Grid> 
                        <table  className="table table-hover table-bordered display">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Attachment Name</th>
                                    <th>Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    existingfiles.map((img,i)=>{
                                            return (
                                                <tr>
                                                    <td>{i+1}</td>
                                                    <td>{img.DocumentName}</td>
                                                    <td><img src={MainUrl+'/uploads/'+img.fileName} className="imgPreview" /></td>
                                                </tr>
                                            )
                                        })
                                }
                              {rows.map((rows, index) => (
                                 <tr key={index}>
                                     {" "}
                                    <td>{existingfiles.length+index+1}</td>
                                    <td><TextField
                                    className="required"
                                    id="AttachmentName"
                                    type="text"
                                    fullWidth
                                    name={"AttachmentName_"+index}
                                    value={formdata.AttachmentName['AttachmentName_'+index]!== undefined ? formdata.AttachmentName['AttachmentName_'+index] : '' }
                                    onChange={(e)=>AttachmentNamechange(e,index)}
                                    validators={['required' ]}
                                    errorMessages={['this field is required']}
                                />
                                    </td>
                                    <td><TextField
                                    className="required"
                                    id="file"
                                    type="file"
                                    fullWidth
                                    name={"file_"+index}
                                    onChange={(e)=>filechange(e,index)}
                                    errorMessages={['this field is required']}
                                /></td>
                                <td><img src={formdata.imgPreview['imgPreview_'+index]!== undefined ? formdata.imgPreview['imgPreview_'+index] : '' }  className={formdata.imgPreview['imgPreview_'+index]!== undefined ? 'imgPreview' : '' }/></td>
                                    {" "}
                                    </tr>
                               ))}  
                            </tbody>
                        </table>
                   {
                        status == 1 ? (
                            <div className="approve_reject">
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                        handleClickappr_reject(2)
                                    }
                                >
                                    Reject
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        handleClickappr_reject(1)
                                    }
                                >
                                    Approve
                                </Button>
                            </div>
                        ) : (
                            ''
                        )
                    }
                </ValidatorForm>
            
                <Dialog
                    open={statuschange}
                    disableBackdropClick
                    disableEscapeKeyDown
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {check_status == 1
                            ? 'Are You Sure Do You Want to Approve ?'
                            : 'Are You Sure Do You Want to Reject ?'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description"></DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handledeleteClose} color="primary">
                            Cancel
                        </Button> */}
                        <Button onClick={() => navigate('/customer')} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleapprovelConfirm} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            
	 </Container>
    ) : ""
}

export default AppTable