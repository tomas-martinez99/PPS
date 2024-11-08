import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useLocation  } from "react-router-dom";
import { successPay } from '../../../services/MercadoPagoService';
import { refreshSession } from '../../../services/apiServices';

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState(null);
  const location = useLocation();  // Obtiene el objeto location de React Router
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('payment_id');
        setPaymentId(id);
        if(paymentId){successPay(paymentId)
            console.log(paymentId)
        }
        console.log(paymentId,"no funciono")
        refreshSession()
        
    }, [location]);  // Se ejecuta cuando cambian los parámetros de la URL

  return (
    <div>PaymentSuccess</div>
  )
}

PaymentSuccess.propTypes = {}

export default PaymentSuccess