import React,{useEffect,useState} from "react";
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
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Autocomplete } from '@mui/lab'
import { postDataFromApi, getDataFromApi, putDataFromApi } from '../../services/CommonService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


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

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    marginBottom: '16px',
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

const batchptions=[
  {label:"batchptions1",value:"1"}
]


const AppTable = () => {
   
   const [formdata,setFormData]=useState({scanOCR:"",isActice:1,skuids:[],stockcheck:[],qtypcs:[],qtymt:[],RCP:[],DP:[],proptype:[],isEnable:0,iscreditRequired:0,typeOfDispatch:'0'})
   const [SkuTypeList, setSkuTypeList] = useState([])
    const [SkuType, setSkuType] = useState([])
    const [BM,setBM]=useState([]) 
    const [BMoptions,setBMoptions]=useState([]); 
    const [skuproperties,setskuproperties]=useState([])
    const [is_skuselected,setskuselected]=useState(false)
    const [propertyoptions,setpropertyoptions]=useState([]);
    const [rows,setrows]=useState([])


    const skuTypelist = async () => {
        var query = "model=sku_type_masters"
        const response = await postDataFromApi('masters/allMasters/findActiveAll', query);
        if (response && response.data.code && response.data.data != null) {
            setSkuType(response.data.data);
            var skutype = [];
            response.data.data.map((sku, i) => {
                var st = [];
                st['id'] = sku.id
                st['label'] = sku.skuTypeName
                skutype.push(st)
            })
            setSkuTypeList(skutype)
            console.log('employee data', response);
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
     
    function formdatavaluechange(e,elemnttype=""){
        var value=e.target.value.trimStart()
        if(elemnttype=="checkbox"){
            if(e.target.checked){
                value=1
            }
            else{
                value=0
            }
        }
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    } 
     
      function changedropdownvalue(type,e){
        if(e){
            if(type == 'paymentterms'){
               var values=[];
                    e.map((prop,i)=>{
                       var data= prop.id
                       values.push(data)
                    })
                    var value=values
            }else{
                var value=e.id
            }
        }else{
            var value=""
        }

        

        setFormData((formData) => ({
                ...formData,
                [type]:value,
        }));

        if(e){
            if(type == 'SKU'){
              getskuproperties(e.id)
            }
        }else{
            getskuproperties()
             
        }
        
        
    }

     const getskuproperties = async (id) => {
                setskuselected(false)
                var query = "skuId="+id
                const response = await postDataFromApi('masters/allMasters/getSkuPropertyList', query);
                if(response && response.data.code && response.data.data!=null){
                    setskuproperties(response.data.data);
                    setskuselected(true)
                    console.log('SKU properties',response.data.data);
                    var dddata=[];
                    response.data.data.map((prop,i)=>{
                        var signleprpdd=[]
                        if(prop.dropdownData){
                            prop.dropdownData.map((dd,i)=>{
                                signleprpdd.push({'label':dd.dropdownName,'id':dd.id})
                            })
                        }
                        dddata[prop.skuPropertiesMastersId]=signleprpdd
                    })
                    setpropertyoptions(dddata)
                    setFormData((formData) => ({
                        ...formData,
                        stockcheck:[],
                        qtypcs:[],
                        qtymt:[],
                        RCP:[],
                        DP:[],
                        proptype:[],

                    }));

                    setTimeout(function(){
                        getrows()
                    },200)

                }
    }
   
    function addrow(){
       getrows()
    } 

    const getrows = async () => {
        
            
            /*if(is_skuselected){*/
                setrows([...rows,{stockcheck: 1 ,qtypcs :44 , qtymt : 55 ,RCP: 555,DP: 87 }])
                console.log({rows});

           /* }*/
            
            
    }    

    const changeafterdropdownvalue=(e,val,name,type)=>{
       
        if(val){
           var values=formdata[type]
           values[name]=val.id
           
        }else{
            var values=formdata[type]
            values[name]=""
        }
        
        setFormData((formData) => ({
            ...formData,
            values,
        }));

    }    
   const handleClickAdd = async (id) =>{
    }
    const orderchange=(e,index,type)=>{
        var values=formdata[type]
        values[e.target.name]=e.target.value
        setFormData((formData) => ({
            ...formData,
            values,
        }));
    } 

    useEffect(() => {
        skuTypelist();
        getBM();
    }, []);


	return (
        <Container>
        
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dump Stock' },
                    ]}
                />
            </div>
            <ValidatorForm  onError={() => null}>
                <Grid container spacing={3}>
                     <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <AutoComplete
                            className="required"
                            fullWidth
                            options={SkuTypeList}
                            // getOptionLabel={(option) => option.label}
                            onChange={(event, value) => changedropdownvalue('SKU', value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Product Group"
                                    variant="outlined"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                    value={formdata.id}
                                    name="id"
                                />
                            )}
                        />          
                      <AutoComplete
                                        fullWidth
                                        options={batchptions}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => changedropdownvalue('zone',value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Batch"
                                                variant="outlined"
                                                fullWidth
                                                validators={["required"]}
                                                errorMessages={["this field is required"]}
                                                value={formdata.batch}
                                                name="batch"
                                            />
                                        )}
                             />
                       
                        <TextField
                                    className="required"
                                    id="remark"
                                    label="Remark"
                                    type="text"
                                    fullWidth
                                    name="remark"
                                    value={formdata.remark || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    validators={['required' ,'matchRegexp:^[a-zA-Z][[^a-zA-Z ]+$']}
                                    errorMessages={['this field is required','Only Characters allowed']}
                                    multiline
                                    rows={3}
                                />     
                    </Grid>
                    
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                      <AutoComplete
                                        fullWidth
                                        options={batchptions}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => changedropdownvalue('zone',value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Zone"
                                                variant="outlined"
                                                fullWidth
                                                validators={["required"]}
                                                errorMessages={["this field is required"]}
                                                value={formdata.batch}
                                                name="batch"
                                            />
                                        )}
                             />
                             <AutoComplete
                                    fullWidth
                                   
                                    options={BMoptions}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('BMId',value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="BM"
                                            variant="outlined"
                                            fullWidth
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                            value={formdata.BMId}
                                            name="BMId"
                                        />
                                    )}
                                />        
                      
                    </Grid>
                </Grid>    
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Button   variant="outlined" type="submit" color="primary">
                            Save
                        </Button>
                </Grid>
            </ValidatorForm> 
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>       
                <table id="customdatatable" className="table table-hover table-bordered nowrap">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            {skuproperties.map((skuproperties, index) => (
                                <th>{skuproperties.label}</th>
                            ))}  
                            <th></th>
                            <th>Zone No</th>
                            <th>Batch No</th>
                            <th>available qty</th>
                            <th>dump qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((rows, index) => (
                        <tr key={index}>
                                 {" "}
                                <td>{index+1}</td>
                            {skuproperties.map((skuproperties,indexinner) => (
                                    <td className="dropdowntd"><AutoComplete
                                            options={propertyoptions[skuproperties.skuPropertiesMastersId]}
                                            getOptionLabel={(option) => option.label}
                                            onChange={(e,value,name,type) => changeafterdropdownvalue(e,value,'proptype_'+skuproperties.skuPropertiesMastersId+'_'+index,'proptype')}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label={skuproperties.label}
                                                    variant="outlined"
                                                    
                                                    value={formdata.proptype['proptype_'+skuproperties.skuPropertiesMastersId+'_'+index]!== undefined ? formdata.proptype['proptype_'+skuproperties.skuPropertiesMastersId+'_'+index] : '' }
                                                    name={'proptype_'+skuproperties.skuPropertiesMastersId+'_'+index}
                                                />
                                            )}
                                 /></td>
                                  ))}  
                                  <td className="addbtn"><Button  variant="outlined"
                                            color="primary" onClick={()=>handleClickAdd(index)}>Checkstock</Button>
                                    </td>
                                    <td><TextField
                                    isEnable
                                        disabled={formdata.isEnable['isEnable_'+index]!== 1 ? 'disabled' : '' }
                                        className="required"
                                        id="stockcheck"
                                        label="stockcheck"
                                        type="text"
                                        fullWidth
                                        name={'stockcheck_'+index}
                                        value={formdata.stockcheck['stockcheck_'+index]!== undefined ? formdata.stockcheck['stockcheck_'+index] : '' }
                                        onChange={(e)=>orderchange(e,index,'stockcheck')}
                                        
                                    /></td>
                                        
                            <td>12</td>
                            <td>12</td>
                            <td>100</td>
                            <td>120</td>
                        {" "}
                                </tr>
                            ))}  
                    </tbody>
                </table>
            </Grid>
        </Container>
    )
}

export default AppTable