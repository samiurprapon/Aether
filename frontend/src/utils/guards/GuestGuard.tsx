// import { useNavigate } from 'react-router-dom';

// import useAuth from '~/hooks/useAuth';

import { ReactNode } from 'react';

const GuestGuard = ({ children }: { children: ReactNode }) => {
	// const { isLoggedIn, role } = useAuth();

	return children;
};

export default GuestGuard;
