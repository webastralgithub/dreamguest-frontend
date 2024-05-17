import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../features/user/userAuth';

const GuestRoute = ({ Component }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { jwtToken, isOTPAuthenticated } = useSelector(state => state.userAuth);

    useEffect(() => {
        if (location.pathname === '/verify-otp' && jwtToken && !isOTPAuthenticated) {
            return;
        }

        if (location.pathname === '/verify-otp' && !jwtToken) {
            navigate('/');
            return;
        }

        if (jwtToken && !isOTPAuthenticated) {
            dispatch(clearAuth());
            return;
        }

        if (isOTPAuthenticated) {
            navigate('/dashboard');
            return;
        }
    }, [location.pathname]);


    return <Component />;
}

export default GuestRoute;
