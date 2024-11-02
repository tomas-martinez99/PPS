import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useLocation  } from "react-router-dom";
import { successPay } from '../../../services/MercadoPagoService';

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState(null);
  const location = useLocation();  // Obtiene el objeto location de React Router

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('payment_id');
        setPaymentId(id);
        
        successPay(paymentId)
    }, [location.search]);  // Se ejecuta cuando cambian los parámetros de la URL

  return (
    <div>PaymentSuccess</div>
  )
}

PaymentSuccess.propTypes = {}

export default PaymentSuccess