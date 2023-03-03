import dotenv from 'dotenv';

import { createServer } from 'http';
import app from './app';
import swagger from './utils/swagger';

dotenv.config();

const server = createServer(app);

server.listen(process.env.APP_PORT, () => {
	console.log(`listening on ${process.env.APP_PORT}`);

	swagger(app);
});
