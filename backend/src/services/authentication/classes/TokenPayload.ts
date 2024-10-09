import { ITokenPayload } from '@/services/authentication/interfaces/ITokenPayload';

export default class TokenPayload implements ITokenPayload {
	public id: string;

	// To Do: other fields

	constructor(props: ITokenPayload) {
		Object.assign(this, props);
	}
}
