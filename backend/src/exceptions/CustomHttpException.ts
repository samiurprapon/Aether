export class CustomHttpException extends Error {
	public status: number;
	public message: string;
	public custom: unknown;

	constructor(status: number, message: string, cutom: unknown) {
		super(message);
		this.status = status;
		this.message = message;
		this.custom = cutom;
	}
}
