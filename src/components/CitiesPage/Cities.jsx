import React, { useState } from 'react'
import m from './cities.module.css'
import { connect } from 'react-redux'
import { addCity, onCityDelete, updateCity } from '../../redux/citiesReducer'
import City from './City'

const Cities = ({ cities, addCity, onCityDelete, updateCity }) => {
    const [name, setName] = useState('')

    const add = () => {
        if (name.trim()) {
            let city = {
                name: name,
                id: Date.now()
            }
            addCity(city)
            setName('')
        } else {
            alert('enter city name')
        }
    }

    

    return (
        <div className={m.cities}>
            <div className={m.input}>
                <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                <button onClick={add}>Add City +</button>
            </div>
            <div className={m.inner}>
                {cities.length === 0
                    ? <div className={m.empty}>empty...</div>
                    : cities.map(city => 
                    <City key={city.id} 
                        city={city}
                        onCityDelete={onCityDelete}
                        updateCity={updateCity}/>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cities: state.cities.cities
})

export default connect(mapStateToProps, { addCity, onCityDelete, updateCity })(Cities)
