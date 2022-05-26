import React from 'react'
import { useSelector } from "react-redux"
import { Redirect, Route } from 'react-router-dom'
function ProtectedRoute({ component: Component, ...rest }) {
    const { user, isAuthenticated, loading } = useSelector(state => state.user)

    return (
        <React.Fragment>
            if(!loading && (
            <Route
                {...rest}
                render={(props) => {
                    if (!isAuthenticated) {
                        return <Redirect to="/login" />
                    }
                    return <Component {...props} />
                }}
            />
            ))
        </React.Fragment>
    )
}

export default ProtectedRoute