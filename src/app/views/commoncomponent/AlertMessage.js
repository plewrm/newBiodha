import React,{useEffect,useState} from "react";
import style from 'Assets/css/style.css'


import SweetAlert from 'react-bootstrap-sweetalert';


export const AlertMessage = (props) => {
   
    const [states,setstates]=useState([]) 
    if(props.alerttype=="success"){
        return (
            <>
             {props.alert ? <SweetAlert
                success
                  title="Success!"
                  onConfirm={()=>props.confirm()}
                >
                  {props.alermessage}
                </SweetAlert> : "" }
                </>
        )
    }
    else{
        return (
        <>
             {props.alert ? <SweetAlert
                error
                  title="Error!"
                  onConfirm={()=>props.confirm()}
                >
                  {props.alermessage}
                </SweetAlert> : "" }
                </>
                )
    }
}


export default AlertMessage
