import { Request, Response } from 'express';

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	console.log(`'${email}' is trying to login with password '${password}'`);

	return res.status(200).json({ message: 'Login successful!' });
}

export async function register(req: Request, res: Response) {
	const { email, password, type } = req.body;

	console.log(`'${email}' is trying to register with password '${password}' and user type '${type}'`);

	return res.status(200).json({ message: 'Registration successful!' });
}

export async function deAuth(req: Request, res: Response) {

  console.log(`user is trying to de-authenticate`);

  return res.status(200).json({ message: 'Logout successful!' });
  
}