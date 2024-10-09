import { JwtPayload } from 'jsonwebtoken';

export interface ITokenPayload extends JwtPayload {
	id: string;

	// To Do: other fields
}
