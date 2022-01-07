import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Spinner from '../layout/Spinner'
const PrivateRoute = ({
    auth: { isAuthenticated, loading }, component: Component
}) => {

    if (loading) return < Spinner />
    if (!isAuthenticated) return <Navigate to="/login" />
    return <Component />;
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
