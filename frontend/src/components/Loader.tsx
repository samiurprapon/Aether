import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoaderContainer = styled('div')({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	zIndex: 5000,
});

export default function Loader() {
	return (
		<LoaderContainer>
			<LinearProgress color='primary' />
		</LoaderContainer>
	);
}
