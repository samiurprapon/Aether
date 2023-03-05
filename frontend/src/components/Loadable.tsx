import { Suspense } from 'react';

import Loader from './Loader';
import { FunctionComponent } from 'react';

const Loadable = (Component: FunctionComponent<any>) => (props: any) =>
	(
		<Suspense fallback={<Loader />}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
