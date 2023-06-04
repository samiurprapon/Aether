import Locales from './components/Locales';
import Routes from './routes';

// landing page components
import Nav from './components/Nav';

const App = () => (
	<Locales>
		<Nav/>
		<Routes />
	</Locales>
);

export default App;
