import { FaHome } from 'react-icons/fa';

const Error = () => {
	return (
		<div>
			<div>
				<div className="container">
					<div className="row col-xs-12">
						<div className="container">
							<div className="row">
								<div className="col-xs-12">
									<h4>Something is wrong</h4>
								</div>
								<div className="col-xs-12">
									<p>The page you are looking was moved, removed, renamed, or might never exist! </p>
								</div>
								<div className="col-xs-12">
									<button>
										<FaHome style={{ fontSize: '1.3rem', marginRight: 0.75 }} /> Home
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Error;
