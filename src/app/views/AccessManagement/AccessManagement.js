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
import { useNavigate } from 'react-router-dom'
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
    const [submitData,setsubmitData]=useState([])
    const navigate = useNavigate()
    const model = 'citys';

    const [cities, setcities] = useState([])

    const [open, setOpen] = React.useState(false)
    const [deleteopen, setDeleteOpen] = React.useState(false)

    const [formdata, setFormData] = useState({ id: "", is_checked: [] ,is_checkedmain:[]})
    const [is_edit, setIsEdit] = useState(false)
    const [edit_id, setEditId] = useState("")

    const [state, setState] = React.useState({
        active: true,
        deactive: true,
    })
    const [employeeoptions, setemployeeoptions] = useState([]);

    const [alert, setalert] = useState(false)
    const [alermessage, setalermessage] = useState("")
    const [alerttype, setalerttype] = useState("")
    const [selectedstate, setselectedstate] = useState({})
    const [menumasterlist, setMenuMasterlist] = useState([])
    useEffect(() => {
        employeelist();
        // MenuMaster()
        // getcities();
        // getdatatable();
    }, []);
    



    const employeelist = async () => {

        var query = "model=employee_masters"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if (response && response.data.code && response.data.data != null) {
            setAllusers(response.data.data);
            var useropts = [];
            response.data.data.map((state, i) => {
                var st = [];
                st['id'] = state.id
                st['label'] = state.fullName
                useropts.push(st)
            })
            setemployeeoptions(useropts)
            console.log('employee data', response);
        }

    }
 
  


    

    const checkboxchange=(e,index,type,elemnttype="")=>{
        
        if(elemnttype=="checkbox"){
            if(e.target.checked){
                e.target.value=1
            }
            else{
                e.target.value=0
            }
        }
       
        if(type=='is_checkedmain') {
            
                //var menumasterlist=menumasterlist[index]
                const result = menumasterlist.find( ({ id }) => id == index );
                var values=formdata[type]
                
                values[e.target.name]=e.target.value

                 
                result.children.map((single,i)=>{
                    
                        var values=formdata['is_checked']
                        values['is_checked_'+single.id]=e.target.value
                    
                    
                })
            
        }else{
            var values=formdata[type]
            console.log('values',e.target.name)
            values[e.target.name]=e.target.value
        }

        


        
        
        setFormData((formData) => ({
            ...formData,
            values,
        }));
    }

    // const checkboxtrue=()=>{
    //     var id=
    // }
   

    function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)

    }

    const MenuMaster = async () => {
        var query = "employeeId="+formdata.id
        const response = await postDataFromApi('masters/allMasters/getEmployeeAccessDetails', query);
        if (response && response.data.code && response.data.data != null) {
            setMenuMasterlist(response.data.data);
            console.log('response.data.data',response.data.data)
            var menuName = []
            var id = []
            var ischeckeddata=[]
            var ischeckeddatamain=[]
            
            // var is_searchablearr=[]
           
            response.data.data.map((list, i) => {
                ischeckeddatamain['is_checkedmain_'+list.id]=list.isActive==1 ? 1 : 0

                
                
                list.children.map((single,i)=>{
                    console.log('single',single)
                    ischeckeddata['is_checked_'+single.id]=single.isActive==1 ? 1 : 0
                })
            })


            // var newparameter=[];
            setFormData((formData) => ({
                 ...formData,
                 is_checked:ischeckeddata,
                 is_checkedmain:ischeckeddatamain
            }));
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
        MenuMaster()
    }
    function confirm() {
        setalert(false)
    }
    function getmenus(){
        var id=formdata.id
        console.log('formid',id)
    }
    var count=1;

    const handleaccessmenu = async (e) => {
       let ischecked=[];
       let Menumaster=[];
       let EmployeeId=[];
    //    let accessDetails=[]
       
        Object.keys(formdata.is_checked).map((values,i)=>{
            
            // var newarray=[]
            var sp=values.split('_')
            var newarray={
                'isActive':formdata.is_checked[values],
                'menuMasterId':sp[2],
                'employeeId':formdata.id
            }
            // newarray['isActive']=formdata.is_checked[values]
            // newarray['menuMasterId']=sp[2]
            // newarray['employeeId']=formdata.id

            ischecked.push(newarray)
        })
        var accessDetails={
          'accessDetails':ischecked
        }
        // accessDetails=JSON.stringify(accessDetails)
        console.log('accessDetails',accessDetails)
        var response="";
        response = await postDataFromApi('masters/allMasters/submitMenuAccessDetails', accessDetails);
        if(response.data.code){

            window.location.reload(false);
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            employeelist()
            setMenuMasterlist([])
            setFormData({id:"",menuMasterId:"",is_checked:"",is_checkedmain:""})
          
        }
        else{
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
        
       
    }
    function setdefaultvalue(){
       
        setFormData({id:"",menuMasterId:"",ischecked:"",is_checkedmain:""})
    }

    function handleClickOpen() {
        setdefaultvalue()
       
        
    }
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'User Access Menu' },
                    ]}
                />
            </div>

            <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype} />
            {/* <Box width="100%" overflow="auto">
           
            </Box> */}
   

            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                {/* <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New'} City</DialogTitle> */}
                <Grid>
                    <Grid xs={12}>
                        <Typography variant='h6'>Users</Typography>
                    </Grid>
                    {/* <DialogContent> */}
                    <AutoComplete
                        fullWidth
                        options={employeeoptions}
                        // getOptionLabel={(option) => option.label}
                        onChange={(event, value) => changedropdownvalue('id', value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                className="required"
                                label="Employee Name"
                                variant="outlined"
                                fullWidth
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                                value={formdata.id}
                                name="id"
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        color="secondary"
                     
                        >
                        Go
                    </Button>

                </Grid>
              
            </ValidatorForm>
            {menumasterlist.length>0 ? (
            <Box width="100%" overflow="auto" marginTop='1%'>
                
                <table id="customdatatable" className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Menu Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menumasterlist.map((menu, index) =>
                            {
                               return (
                                <>
                                    <tr key={index+1} className="parentrow">
                                        <td align="left" >
                                            {index+1}
                                        </td>
                                    
                                        <td> {menu.menuName}</td>
                                        <td className="no-margin-label">
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label=""
                                                name={'is_checkedmain_' + menu.id}
                                                checked={formdata.is_checkedmain['is_checkedmain_' + menu.id] !== '0' 
                                                && formdata.is_checkedmain['is_checkedmain_' + menu.id] ? true : false}
                                                onChange={(e)=>checkboxchange(e, menu.id,'is_checkedmain','checkbox')}
                                            />
                                        </td>
                                    </tr>
                                    {
                                        
                                        menu.children.map((singleenu,i)=>{
                                           
                                           
                                            return (
                                               <>
                                               <tr key={i}>
                                                <td align="left" >
                                                    &emsp;
                                                    &emsp;
                                                   {i+1}
                                                </td>
                                                        <td>{singleenu.menuName}</td>
                                                        <td className="no-margin-label">
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label=""
                                                        name={'is_checked_' + singleenu.id}
                                                        checked={formdata.is_checked['is_checked_' + singleenu.id]==1 ? true : false}
                                                        onChange={(e)=>checkboxchange(e, singleenu.id,'is_checked','checkbox')}
                                                    />
                                                </td>
                                                </tr>
                                               </>
                                            )
                                        })
                                    }
                                </>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Grid style={{marginTop:"1%"}}>
                
                <Button onClick={
                    handleaccessmenu}
                     color="secondary" 
                     variant="outlined"
                     >
                    Submit
                </Button>
            </Grid> 
                </Box>
                ) : ''}
               
              
            
                
          
                  
            
        </Container>
    )
}

export default AppTable
