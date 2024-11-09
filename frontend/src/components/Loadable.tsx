import { Suspense, FunctionComponent } from 'react';

import Loader from '~/components/Loader';

const Loadable =
	<P extends object>(Component: FunctionComponent<P>) =>
	(props: P) => (
		<Suspense fallback={<Loader />}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
