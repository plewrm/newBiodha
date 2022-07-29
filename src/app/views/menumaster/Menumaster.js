import React,{useEffect,useState} from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import style from 'Assets/css/style.css'
import {
	Button,
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
/*import TextField from '@mui/material/TextField'*/
import FormControl from '@mui/material/FormControl'

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import SweetAlert from 'react-bootstrap-sweetalert';
import AlertMessage from '../commoncomponent/AlertMessage'
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';
import Switch from '@mui/material/Switch'
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
import { Autocomplete } from '@mui/lab'

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
  
    const [open, setOpen] = useState(false)
	const [deleteopen, setDeleteOpen] = useState(false)
    const [parentlist,setparentlist]=useState([])
    const model='menu_masters';
    
    const [menu_masters,setmenu_masters]=useState([])
  
    const [formdata,setFormData]=useState({menuName:"",parentId:0,menu_page_url:""})
    const [is_edit,setIsEdit]=useState(false)
    const [edit_id,setEditId]=useState("")
    const [alert,setalert]=useState(false)
    const [alermessage,setalermessage]=useState("")
    const [alerttype,setalerttype]=useState("")
    const [selectedparent,setselectedparent]=useState({})
     const [selectedstate2,setselectedstate2]=useState({})
    const switchStyles = useN01SwitchStyles();
    
    function setdefaultvalue(){
        setselectedstate2("");
        setFormData({menuName:""})
    }

	function handleClickOpen() {
        setdefaultvalue()
        setIsEdit(false)
        setOpen(true)
    }
    function handleClickEdit(id) {
        console.log('id',id)
        setFormData((formData) => ({
        
            ...formData,
            ['menuName']:menu_masters[id].menuName,
            ['menu_page_url']:menu_masters[id].menu_page_url,
            ['parentId']:menu_masters[id].parent
        }));
        setselectedstate2(getSelectedItem(menu_masters[id].parent))
        
        setEditId(menu_masters[id].id)
        setIsEdit(true)
        setOpen(true)
    }
    function getSelectedItem(id){
        const item = selectedparent.find((opt)=>{

            
          if (opt.id == id)
            return opt;
        })
        return item || null;

    }
    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.id
        } else {
            var value = ""
        }
        setFormData((formData) => ({
            ...formData,
            [type]:value,
        }));
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

    const getmenu_masters = async () => {
        
        var query = "model="+model
        const response = await getDataFromApi('masters/allMasters/menuMasterList');
        if(response && response.data.code && response.data.data!=null){
            setmenu_masters(response.data.data);
            console.log('menumaster data',response);
        }
        
    } 
    const getparentlist = async () => {
        
        var query = "model=menu_masters"
        const response = await postDataFromApi('masters/allMasters/', query);
        if(response && response.data.code && response.data.data!=null){
            setparentlist(response.data.data);
            var menuopts=[];
            response.data.data.map((menu,i)=>{
                var st=[];
                st['id']=menu.id
                st['label']=menu.menuName
                menuopts.push(st)
            })
            setselectedparent(menuopts)
            console.log('menumaster data',response);
        }
        
    } 
    
    const handleStateChange = async(id,isActive) => {
        console.log(id)
        console.log(isActive)
        isActive=isActive ? 0 : 1;
        var query = "tableName="+model+"&isActive="+isActive;
        const response = await putDataFromApi('masters/isActive/'+id, query);
        if(response.data.code){
            
            console.log(response.data.message);
            getmenu_masters()
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')
            $('#customdatatable').DataTable().destroy();
            getdatatable();
        }
        else{
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
            $('#customdatatable').DataTable().destroy();
            getdatatable();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var response ="";
        formdata.parentId=formdata.parent ? formdata.parent :0
        if(is_edit){
             response = await postDataFromApi('masters/allMasters/updateMenuMasters/'+edit_id, formdata);
        }
        else{
             response = await postDataFromApi('masters/allMasters/createMenuMasters', formdata);
        }
        console.log('edit response',response)
        if(response.data.code){
            getmenu_masters();
            setIsEdit(false)
            setEditId("")
            setOpen(false)
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('success')

        }
        else{
            setalermessage(response.data.message)
            setalert(true)
            setalerttype('error')
        }
    }

    function confirm(){
        setalert(false)
    }

    function formdatavaluechange(e){
        var value=e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    }
    
    useEffect(() => {
        getdatatable();
        getmenu_masters();
        getparentlist();
    }, []);
    useEffect(() => {
        getdatatable();
    }, [menu_masters]);
    
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

	return (
        <Container>
	        <div className="breadcrumb leftalign_breadcrumb">
		                <Breadcrumb
		                    routeSegments={[
		                        { name: 'Menu Master' },
		                    ]}
		                />
		      </div>
              <Button className="rightalign_btn" variant="outlined"
                    color="primary" onClick={handleClickOpen}>
                   Add new Menu 
              </Button>
              <AlertMessage alert={alert} alermessage={alermessage} confirm={confirm} alerttype={alerttype}/>
		      <Box width="100%" overflow="auto">
            
	            <table id="customdatatable" className="table table-hover table-bordered">
	                <thead>
	                    <tr>
	                        <th>Sr No.</th>
	                        <th>Menu Name</th>
                            <th>Menu Page Url</th>
                            <th>Parent</th>
                            <th>Status</th>
	                        <th>Action</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {menu_masters.map((menumaster, index) => (
	                        <tr key={index}>
	                            <td align="left">
	                                {index+1}
	                            </td>
	                            <td align="left">
	                                {menumaster.menuName}
	                            </td>
                                <td align='left'>{menumaster.menu_page_url?menumaster.menu_page_url:"_"}</td>
                                <td align='left'>{menumaster.parantName?menumaster.parantName:"_"}</td>
                                <td><span className="ac_inactive">{menumaster.isActive ? "Active" : "Inactive"}</span><Switch
                                    classes={switchStyles}
                                    abelPlacement="start"
                                    label={menumaster.isActive ? "Active" : "Inactive"}
                                    checked={menumaster.isActive}
                                    onChange={()=>handleStateChange(menumaster.id,menumaster.isActive)}
                                    value="active"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                /></td>
	                            <td>
	                                <IconButton onClick={()=>handleClickEdit(index)}>
	                                    <Icon color="primary">edit</Icon>
	                                </IconButton>
	                            </td>
	                        </tr>
	                    ))}
	                </tbody>
	            </table>
	        </Box>
	        <Dialog
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <DialogTitle id="form-dialog-title">{is_edit ? 'Update' : 'Add New'} Menu</DialogTitle>
                    <DialogContent>
                        <TextField
                            className="required"
                            id="menu"
                            label="Menu Name"
                            type="text"
                            fullWidth
                            name="menuName"
                            value={formdata.menuName || ''}
                            onChange={(e)=>formdatavaluechange(e)}
                            validators={['required','matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
                            errorMessages={['this field is required','Only Characters allowed']}
                        />
                        <TextField
                            className="required"
                            id="menu_page_url"
                            label="Menu Page URL"
                            type="text"
                            fullWidth
                            name="menu_page_url"
                            value={formdata.menu_page_url || ''}
                            onChange={(e)=>formdatavaluechange(e)}
                            validators={['required']}
                            errorMessages={['this field is required','Only Characters allowed']}
                        />
                         <AutoComplete
                        fullWidth
                        defaultValue={selectedstate2 ? selectedstate2 : null}
                        options={selectedparent}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, value) => changedropdownvalue('parentId', value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Parent"
                                variant="outlined"
                                fullWidth
                                value={formdata.parentId}
                                name="parentId"
                            />
                        )}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
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