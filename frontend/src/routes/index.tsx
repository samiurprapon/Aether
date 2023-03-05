import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import Loadable from '../components/Loadable';
const Error = Loadable(lazy(() => import('../pages/error')));

export default function Routes() {
	return useRoutes([
		{
			path: '/',
			element: <Error />,
		},
	]);
}
