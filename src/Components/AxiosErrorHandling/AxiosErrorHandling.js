import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../features/user/userAuth';

const useAxiosWithAuthErrorHandling = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status === 401 && error.response.data.key === "token_expired") {
                    dispatch(clearAuth());
                    navigate('/');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [dispatch]);

    return axios;
};

export default useAxiosWithAuthErrorHandling;
