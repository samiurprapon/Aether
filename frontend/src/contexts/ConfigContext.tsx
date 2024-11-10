import { createContext, ReactNode } from 'react';

import defaultConfig from '~/config';
import useLocalStrorage from '~/hooks/useLocalStorage';

const initialState = {
	...defaultConfig,
	onChangeMode: (mode: string) => {
		console.log(mode);
	},
	onChangeLocale: (locale: string) => {
		console.log(locale);
	},
};

const ConfigContext = createContext(initialState);

function ConfigProvider({ children }: { children: ReactNode }) {
	const [config, setConfig] = useLocalStrorage('initialState', defaultConfig);

	const onChangeMode = (mode: string) => {
		setConfig({
			...config,
			mode,
		});
	};

	const onChangeLocale = (locale: string) => {
		setConfig({
			...config,
			locale,
		});
	};

	return (
		<ConfigContext.Provider
			value={{
				...config,
				onChangeMode,
				onChangeLocale,
			}}>
			{children}
		</ConfigContext.Provider>
	);
}

export { ConfigProvider, ConfigContext };
