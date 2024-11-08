import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import "./ConfirmPlan.css"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { getPreferenceId } from '../../../services/MercadoPagoService';

const ConfirmPlan = () => {
    const [preferenceId, setPreferenceId] = useState(null)
    useEffect(() => {
        initMercadoPago('APP_USR-3c383fbd-93f1-4ec3-9ade-55292876b3a4');
        const fetchData = async () =>{
            try{
                const result = await getPreferenceId()
                setPreferenceId(result)
                console.log("paimen id en el comfirm", result)
            }catch(error){
                console.log(error.message)
            }
        }
        fetchData()
      }, []);
    
    return (
        <div className="plan-page-centered">
            <div className="plan-title">
                <h1>Tu plan</h1>
            </div>
            <div className="plan-card-centered">
                <h3>Movie Wacha Premium</h3>
                <p className="plan-price">ARS$1</p>
                <ul className="plan-features">
                    <li>Acceso a todas las películas y series sin anuncios</li>
                    <li>La mejor calidad de video y audio (hasta 4K UHD y HDR; Dolby Atmos)</li>
                    <li>Pantallas ilimitadas</li>
                </ul>
                    <div id="wallet_container">
                    <Wallet initialization={{ preferenceId:preferenceId }} />
                      
                    </div>
                <p className="other-payment-methods">Otros medios de pago</p>
            </div>
        </div>
    )
}

ConfirmPlan.propTypes = {}

export default ConfirmPlan