import { lazy } from 'react';

import LayoutMotion from '../components/LayoutMotion';
import Loadable from '../components/Loadable';
import MinimalLayout from '../layouts/MinimalLayout';
import GuestGuard from '../utils/guards/GuestGuard';

const Landing = Loadable(lazy(() => import('../pages/landng')));
const Login = Loadable(lazy(() => import('../pages/login')));

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
		}
	],
};

export default PublicRoutes;
