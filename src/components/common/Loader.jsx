import React from 'react'
import loader from '../../assets/images/loader.svg'
import m from './index.module.css'

const Loader = () => {
  return (
    <div className={m.loader}>
      <img src={loader} alt=""/>
    </div>
  )
}

export default Loader
