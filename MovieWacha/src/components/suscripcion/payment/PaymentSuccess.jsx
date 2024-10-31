import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import { successPay } from '../../../services/MercadoPagoService';

const PaymentSuccess = () => {

    const { paymentId } = useParams();
   

    useEffect(() =>{
        successPay(paymentId)
    },)


  return (
    <div>PaymentSuccess</div>
  )
}

PaymentSuccess.propTypes = {}

export default PaymentSuccess