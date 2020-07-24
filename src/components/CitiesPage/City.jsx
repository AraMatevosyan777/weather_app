import React, { useState } from 'react'
import m from './cities.module.css'
import remove from '../../assets/delete.svg'
import edit from '../../assets/edit.png'
import save from '../../assets/save.svg'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import { cityType } from '../../types'

const City = ({city, updateCity, onCityDelete}) => {
    const [editMode, setEditMode] = useState(false)
    const [currentName, setCurrentName] = useState(city.name)
    const update = (name, id) => {
        updateCity(name, id)
        setEditMode(false)
    }
    return (
        <div className={m.city} key={city.id}>
            {!editMode
                ?<>
                    <NavLink to={'/weather/' + city.name}>{city.name}</NavLink>
                    <div className={m.icons}>
                        <img className={m.icon} src={edit} alt="" onClick={() => setEditMode(true)}/>
                        <img className={m.icon} src={remove} alt="" onClick={() => onCityDelete(city.id)}/>
                    </div>
                </>
                :<>
                    <input value={currentName} autoFocus onChange={(e) => setCurrentName(e.currentTarget.value)} />
                    <img className={m.icon} src={save} alt="" onClick={() => update(currentName, city.id)}/>
                </>

            }

        </div>
    )
}

City.propTypes = {
    city: PropTypes.shape(cityType),
    onCityDelete: PropTypes.func,
    updateCity: PropTypes.func,
}

export default City
