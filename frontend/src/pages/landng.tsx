import { Container, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const LandingPage = () => {
	return (
		<Container sx={{ paddingX: 0 }}>
			<Typography variant='h3'>
				<FormattedMessage id='name' />
			</Typography>
		</Container>
	);
};

export default LandingPage;
