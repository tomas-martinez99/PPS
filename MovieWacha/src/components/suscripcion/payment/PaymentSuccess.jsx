import React, { useEffect, useState,useContext } from 'react'
import PropTypes from 'prop-types'

import { useLocation, Link  } from "react-router-dom";
import { successPay } from '../../../services/MercadoPagoService';
import { refreshSession } from '../../../services/apiServices';
import { AuthenticationContext } from '../../../services/Authentication.context';


const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState(null);
  const location = useLocation();  // Obtiene el objeto location de React Router
  const { handleLogin } = useContext(AuthenticationContext);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('payment_id');
    setPaymentId(id);
  }, [location.search]);

  useEffect(() => {
    const fetchData= async ()=>{
      try{
      console.log("paiment id en el useefect", paymentId)
      if (paymentId) {
        await successPay(paymentId);
        const Token = await refreshSession();
         handleLogin(Token) 

      }}catch(error){
        console.log(error.message)
    }
    }
    fetchData()
    }, [paymentId]);

  return (
    <div>Pago Registrado <Link to="/">Volver al Inicio</Link> </div>
  )
}

PaymentSuccess.propTypes = {}

export default PaymentSuccess