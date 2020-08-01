import React from 'react'
import m from './index.module.css'
import remove from '../../assets/images/delete.svg'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import { cityType } from '../../types'

const City = ({ city, onCityDelete }) => {
    return (
        <div className={m.city} key={city.id}>
            <NavLink to={'/weather/' + city.name}>{city.name}</NavLink>
            <div className={m.icons}>
                <img className={m.icon} src={remove} alt="" onClick={() => onCityDelete(city.id)} />
            </div>
        </div>
    )
}

City.propTypes = {
    city: PropTypes.shape(cityType),
    onCityDelete: PropTypes.func,
}

export default City
