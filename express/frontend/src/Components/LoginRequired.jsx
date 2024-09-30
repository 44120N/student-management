import { Navigate } from 'react-router-dom';

const LoginRequired = ({ children }) => {
    const token = sessionStorage.getItem('token');
    return token && token!=="undefined" && token !==null ? children : <Navigate to="/login" />;
};

export default LoginRequired;
