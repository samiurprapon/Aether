import { Link } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from '../config/constant';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';


const ErrorWrapper = styled('div')({
	maxWidth: 380,
	margin: '0 auto',
	textAlign: 'center',
});

const ErrorCard = styled(Card)({
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});


const Error = () => {
	const theme = useTheme();

	return (
		<ErrorCard>
			<CardContent>
				<Grid container justifyContent='center' spacing={gridSpacing}>
					<Grid item xs={12}>
						<ErrorWrapper>
							<Grid container spacing={gridSpacing}>
								<Grid item xs={12}>
									<Typography variant='h4' component='div'>
										Something is wrong
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant='body2'>
										The page you are looking was moved, removed, renamed, or might never exist!{' '}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Button variant='contained' size='large' component={Link} to={'/'}>
										<HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
									</Button>
								</Grid>
							</Grid>
						</ErrorWrapper>
					</Grid>
				</Grid>
			</CardContent>
		</ErrorCard>
	);
};

export default Error;
