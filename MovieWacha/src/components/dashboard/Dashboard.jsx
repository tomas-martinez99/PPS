import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthenticationContext } from '../../services/Authentication.context'

const Dashboard = () => {
  const {user} = useContext(AuthenticationContext)
  return (
    <div>
      {user && user.rol === 0 &&
        <div>Soy admin</div>
      } 
       {user && user.rol === 2 &&
        <div>Soy cliente</div>
      } 

    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard