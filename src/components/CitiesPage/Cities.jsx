import React, { useState } from 'react'
import m from './cities.module.css'
import { connect } from 'react-redux'
import { addCity, onCityDelete, updateCity } from '../../redux/citiesReducer'
import City from './City'
import PropTypes from 'prop-types';
import { cityType } from '../../types'

const Cities = ({ cities, addCity, onCityDelete, updateCity }) => {
    const [name, setName] = useState('')

    const add = (e) => {
        if (name.trim()) {
            e.preventDefault()
            let cityName = name[0].toUpperCase() + name.slice(1);
            let city = {
                name: cityName,
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
            <form onSubmit={add} className={m.input}>
                <input  type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                <button >Add City +</button>
            </form>
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

Cities.propTypes = {
    cities: PropTypes.arrayOf(PropTypes.shape(cityType)),
    addCity: PropTypes.func,
    onCityDelete: PropTypes.func,
    updateCity: PropTypes.func,
}

const mapStateToProps = (state) => ({
    cities: state.cities.cities
})

export default connect(mapStateToProps, { addCity, onCityDelete, updateCity })(Cities)
