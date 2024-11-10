const LoaderContainer = {
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	zIndex: 5000,
} as const;

const LinearProgress = {
	width: '100%',
	height: '4px',
	backgroundColor: '#e0e0e0',
	position: 'relative',
	overflow: 'hidden',
} as const;

const ProgressBar = {
	width: '50%',
	height: '100%',
	backgroundColor: '#3f51b5',
	position: 'absolute',
	left: 0,
	top: 0,
	animation: 'progress 2s infinite',
} as const;

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
