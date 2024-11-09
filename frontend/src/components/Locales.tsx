import { useState, useEffect, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import useConfig from '~/hooks/useConfig';

const loadLocaleData = (locale: string) => {
	switch (locale) {
		case 'bn':
			return import('~/utils/locales/bn.json');
		default:
			return import('~/utils/locales/en.json');
	}
};

const Locales = ({ children }: { children: ReactNode }) => {
	const { locale } = useConfig();
	const [messages, setMessages] = useState<Record<string, string>>({});

	useEffect(() => {
		loadLocaleData(locale).then((d: { default: Record<string, string> }) => {
			setMessages(d.default);
		});
	}, [locale]);

	return (
		<>
			{messages && (
				<IntlProvider locale={locale} defaultLocale="en" messages={messages}>
					{children}
				</IntlProvider>
			)}
		</>
	);
};

export default Locales;
