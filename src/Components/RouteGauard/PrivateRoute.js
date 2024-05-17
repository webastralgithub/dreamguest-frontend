import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth, updateRedirection } from '../../features/user/userAuth'

const PrivateRoute = ({ Component }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { jwtToken, shouldRedirectToLogin } = useSelector(state => state.userAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (shouldRedirectToLogin) {
            dispatch(updateRedirection());
            navigate('/');
        }

        if (!jwtToken) {
            navigate('/');
            return;
        }

        const decodedToken = jwtDecode(jwtToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime ) {
            dispatch(clearAuth());
            navigate('/');
            return;
        }
        // if(decodedToken.roleId != 1){
        //     dispatch(clearAuth());
        //     navigate('/');
        //     return;   
        // }
   

    }, [location.pathname, shouldRedirectToLogin]);

    return <Component />;
}

export default PrivateRoute;
