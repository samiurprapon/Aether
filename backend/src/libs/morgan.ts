import morgan, { Options } from 'morgan';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (options?: Options<any, any>, format?: string) => {
	return morgan(
		format
			? format
			: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms',
		options,
	);
};
