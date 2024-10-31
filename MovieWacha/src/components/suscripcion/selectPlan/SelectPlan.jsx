import React from 'react'
import PropTypes from 'prop-types'
import "./SelectPlan.css"
import { useNavigate } from 'react-router-dom'

const SelectPlan = () => {
  const navigate = useNavigate()

  const navigateClick = () => navigate("/confirmPlan")
  return (
    <div className="plan-page">
      <h2>Elección de plan</h2>
      <p>Podrás cambiarlo o cancelarlo en cualquier momento.</p>

      <div className="plan-card">
        <h3>Movie Wacha Premium</h3>
        <h4 className="plan-price">ARS$2</h4>
        <button className="select-plan-button" onClick={navigateClick}>SELECCIONAR PLAN</button>
        <ul className="plan-features">
          <li>Acceso a todas las películas y series sin anuncios</li>
          <li>La mejor calidad de video y audio (hasta 4K UHD y HDR; Dolby Atmos)</li>
          <li>Pantallas ilimitadas</li>
        </ul>
      </div>
    </div>
  )
}

SelectPlan.propTypes = {}

export default SelectPlan