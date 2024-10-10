import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persister } from './store';
import { ConfigProvider } from './contexts/ConfigContext';

import './styles/globals.css';

const container: any = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persister}>
			<ConfigProvider>
				<BrowserRouter basename={'/'}>
					<App />
				</BrowserRouter>
			</ConfigProvider>
		</PersistGate>
	</Provider>
);
