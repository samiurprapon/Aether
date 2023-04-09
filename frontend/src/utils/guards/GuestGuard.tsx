// import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const GuestGuard = ({ children }) => {
	// const { isLoggedIn, role } = useAuth();

	return children;
};

export default GuestGuard;
