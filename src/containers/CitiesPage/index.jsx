import React, { useState } from 'react'
import m from './index.module.css'
import { connect } from 'react-redux'
import { onCityDelete, addCity } from '../../redux/cities/actions'
import PropTypes from 'prop-types';
import { cityType } from '../../types'
import City from '../../components/City';
import CityModal from '../../Modals/CityModal/index';
import citiesJson from 'cities.json'

const Cities = ({ cities, addCity, onCityDelete }) => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const add = (e) => {
        if (name.trim()) {
            e.preventDefault()
            let cityName = name[0].toUpperCase() + name.slice(1);
            const jsonFilter = citiesJson.filter(item => {
                if (cityName === item.name) {
                    return item
                }
            })
            if (jsonFilter.length) {
                const stateFilter = cities.filter(item => {
                    if (cityName === item.name) {
                        return item
                    }
                })
                if(!stateFilter.length){
                    let city = {
                        name: cityName,
                        id: Date.now()
                    }
                    addCity(city)
                    setName('')
                }else{
                    setError('City is already added')
                }
                
            } else {
                setError('City is not defined')
            }
        } else {
            e.preventDefault()
        }
    }

    return (
        <div className={m.cities}>
            <form onSubmit={add} className={m.input}>
                <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                <button >Add City +</button>
            </form>
            <div className={m.inner}>
                {cities.length === 0
                    ? <div className={m.empty}>empty...</div>
                    : cities.map(city =>
                        <City key={city.id}
                            city={city}
                            onCityDelete={onCityDelete} />)
                }
            </div>
            {error &&
                <CityModal error={error} setError={()=>setError('')}/>
            }    
        </div>
    )
}

Cities.propTypes = {
    cities: PropTypes.arrayOf(PropTypes.shape(cityType)),
    addCity: PropTypes.func,
    onCityDelete: PropTypes.func,
}

const mapStateToProps = (state) => ({
    cities: state.cities.cities
})

export default connect(mapStateToProps, { addCity, onCityDelete })(Cities)
