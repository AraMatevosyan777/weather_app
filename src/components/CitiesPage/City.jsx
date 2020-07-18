import React, { useState } from 'react'
import m from './cities.module.css'

import { NavLink } from 'react-router-dom'

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
                    <div>
                        <button onClick={() => onCityDelete(city.id)}>Delete</button>
                        <button onClick={() => setEditMode(true)}>Edit</button>
                    </div>
                </>
                :<>
                    <input value={currentName} onChange={(e) => setCurrentName(e.currentTarget.value)} />
                    <button onClick={() => update(currentName, city.id)}>save</button>
                </>

            }

        </div>
    )
}

export default City
