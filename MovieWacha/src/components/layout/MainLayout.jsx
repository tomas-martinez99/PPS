import React from 'react'
import PropTypes from 'prop-types'
import Header from '../header/Header'

const MainLayout = ({children}) => {
    return (
      <div>
          <Header/>
          {children}
  
      </div>
    )
  }
  
  MainLayout.propTypes = {}
  
  export default MainLayout