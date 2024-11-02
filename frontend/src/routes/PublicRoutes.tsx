import { lazy } from 'react';

import LayoutMotion from '../components/LayoutMotion';
import Loadable from '../components/Loadable';
import MinimalLayout from '../layouts/MinimalLayout';
import GuestGuard from '../utils/guards/GuestGuard';

const Landing = Loadable(lazy(() => import('../pages/landng')));
const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
const AuthPage = Loadable(lazy(() => import('../pages/AuthPage')));
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
			path: '/auth',
			element: <AuthPage />,
		},
		{
			path: '/dashboard',
			element: <Dashboard />,
		},
	],
};

export default PublicRoutes;
