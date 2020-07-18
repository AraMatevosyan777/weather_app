import React from 'react'
import m from './nav.module.css'
import { connect } from 'react-redux'
import { setToggle } from '../../redux/weatherReducer'

const Toggle = ({toggle,setToggle}) => {
    return (
        <div className={m.toggle}>
            <input name='toggle' type="radio" value='celsius' onChange={() => setToggle(true)} checked={toggle} />&deg;C
            <input name='toggle' type="radio" value='fahrenheit' onChange={() => setToggle(false)} />&deg;F
        </div>
    )
}
const mapStateToProps = (state) => ({
    toggle: state.weather.toggle
})
export default connect(mapStateToProps,{setToggle})(Toggle)
