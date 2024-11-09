import { Suspense, FunctionComponent } from 'react';

import Loader from './Loader';

const Loadable = (Component: FunctionComponent<any>) => (props: any) => (
	<Suspense fallback={<Loader />}>
		<Component {...props} />
	</Suspense>
);

export default Loadable;
