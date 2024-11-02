import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import "./ConfirmPlan.css"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const ConfirmPlan = () => {

    useEffect(() => {
        initMercadoPago('APP_USR-3c383fbd-93f1-4ec3-9ade-55292876b3a4');
        
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
                    <Wallet initialization={{ preferenceId:"2029783441-ffba5d31-690e-44f1-9b13-12e46e8b36b2" }} >
                        Ir a mercado pago
                    </Wallet>
                    </div>
                <p className="other-payment-methods">Otros medios de pago</p>
            </div>
        </div>
    )
}

ConfirmPlan.propTypes = {}

export default ConfirmPlan