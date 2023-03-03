import cors from 'cors';

export default function () {
	const corsOptions = {
		// credentials: true,
		origin: '*',
	};

	return cors(corsOptions);
}
