import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import PublicRoutes from '~/routes/public';
import Loadable from '~/components/Loadable';

const Error = Loadable(lazy(() => import('../pages/error')));

export default function Routes() {
	return useRoutes([PublicRoutes, { path: '*', element: <Error /> }]);
}
