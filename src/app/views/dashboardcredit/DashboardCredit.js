import React,{useEffect,useState} from "react";
import style from 'Assets/css/style.css'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import SimpleTable from '../material-kit/tables/SimpleTable'
import PaginationTable from '../material-kit/tables/PaginationTable'
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
import {postDataFromApi,getDataFromApi,putDataFromApi,orderStatuses} from '../../services/CommonService';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';

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
    const navigate = useNavigate()
	const [orderListing,setorderListing]=useState([])

	const getorderListing = async () => {
                var query = ""
                const response = await postDataFromApi('order/orderListing', query);
                if(response && response.data.code && response.data.data!=null){
                    setorderListing(response.data.data);
                    console.log('orderListing',response);
                }
    }

    const getdatatable = async () => {
        
        $(document).ready(function () {
	        setTimeout(function(){
	        $('#customdatatable').DataTable();
	         } ,1000);
	    });
        
    }

    useEffect(() => {
        getorderListing();
        getdatatable();
    }, []);
    
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard Credit' },
                    ]}
                />
            </div>
             <Box width="100%" overflow="auto" className="box_shadow">
            
		            <table id="customdatatable" className="table table-hover table-bordered">
		                <thead>
		                    <tr>
		                        <th>Sr No.</th>
		                        <th>Dealer/customer</th>
		                        <th>Yard</th>
	                            <th>Product Group</th>
	                            <th>Createddate</th>
	                            <th>Status</th>
		                        <th>Action</th>
		                    </tr>
		                </thead>
		                <tbody>
		                    {orderListing.map((order, index) => (
		                        <tr key={index}>
		                            <td align="left">
		                                {index+1}
		                            </td>
	                                <td align="left">
	                                    {order.delear}
	                                </td>
		                            <td align="left">
		                                {order.nameOfYard}
		                            </td>
	                                <td align="left">
	                                    {order.skuTypeName}
	                                </td>
	                                <td align="left">
	                                {moment(order.createdAt).format('DD-MM-Y')}
	                                 
	                                </td>
	                                
									<td align="left"> {order.statusForSystem != "" ? orderStatuses[order.statusForSystem] : ''}</td>
		                            <td>
	                                    {/* <Tooltip title="Edit">
	    	                                <IconButton onClick={() => navigate('/order/edit/'+order.id)}>
	    	                                    <Icon color="primary">edit</Icon>
	    	                                </IconButton>
	                                    </Tooltip> */}
	                                    
	                                    {order.statusForSystem==1 || order.statusForSystem==2 ?
	                                    '' : <Tooltip title="Status"><IconButton onClick={() => navigate('/dashboard/credit/changestatus/'+order.id)}>
	                                        <Icon color="primary">check</Icon>
	                                    </IconButton></Tooltip>}
	                                   
		                           </td>
		                        </tr>
		                    ))}
		                </tbody>
		            </table>
		        </Box>
        </Container>
    )
}

export default AppTable