import { lazy } from 'react';

import LayoutMotion from '../components/LayoutMotion';
import Loadable from '../components/Loadable';
import MinimalLayout from '../layouts/MinimalLayout';
import GuestGuard from '../utils/guards/GuestGuard';

const Landing = Loadable(lazy(() => import('../pages/landng')));
const Login = Loadable(lazy(() => import('../pages/login')));
const Signup = Loadable(lazy(() => import('../pages/signup')));

const PublicRoutes = {
	path: '/',
	element: (
		<LayoutMotion>
			<GuestGuard>
				<MinimalLayout />
			</GuestGuard>
		</LayoutMotion>
	),
	children: [
		{
			path: '/',
			element: <Landing />,
		},
		{
			path: '/login',
			element: <Login/>
		},
		{
			path: '/signup',
			element: <Signup/>
		}
	],
};

export default PublicRoutes;
