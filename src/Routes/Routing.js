import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import routes from './publicRoutes'

const Routing = () => {
    return (
        <>
            {routes.map(route =>
                (<Route key={route.path} path={route.path} component={route.component} />)
            )}
            <Route exact path='/' render={() => <Redirect to='/weather' />} />
        </>
    )
}

export default Routing
