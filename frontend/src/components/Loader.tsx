const LoaderContainer = {
	position: 'absolute' as 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	zIndex: 5000,
};

const LinearProgress = {
	width: '100%',
	height: '4px',
	backgroundColor: '#e0e0e0',
	position: 'relative' as 'relative',
	overflow: 'hidden' as 'hidden',
};

const ProgressBar = {
	width: '50%',
	height: '100%',
	backgroundColor: '#3f51b5',
	position: 'absolute' as 'absolute',
	left: 0,
	top: 0,
	animation: 'progress 2s infinite',
};

const keyframes = `
@keyframes progress {
	0% { left: -50%; }
	100% { left: 100%; }
}
`;

export default function Loader() {
	return (
		<div style={LoaderContainer}>
			<style>{keyframes}</style>
			<div style={LinearProgress}>
				<div style={ProgressBar}></div>
			</div>
		</div>
	);
}
