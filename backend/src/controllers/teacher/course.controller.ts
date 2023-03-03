import { Request, Response } from 'express';

export async function create(req: Request, res: Response) {
	const { name, section, code, semester } = req.body;

	console.log(`'${name}' is trying to create a course with section '${section}', code '${code}', and semester '${semester}'`);

	return res.status(201).json({
		message: 'Course created successfully!',
	});
}

export async function getCourses(req: Request, res: Response) {
	const { archive } = req.query;

	console.log(`Get courses which are '${archive ? 'Archived' : 'Not Archived'}'`);

	return res.status(200).json({
		message: 'Courses fetched successfully!',
	});
}

export async function update(req: Request, res: Response) {
	const { courseId, name, section, code, semester } = req.body;

	console.log(` courseId: '${courseId}' name: '${name}', secion:  '${section}', courseCode: '${code}', and semester: '${semester}'`);

	return res.status(200).json({
		message: 'Course updated successfully!',
	});
}

export async function setArchive(req: Request, res: Response) {
	const { archive, courseId } = req.body;

	console.log(` '${courseId}' '${archive ? 'Archive' : 'Unarchive'}' course`);

	return res.status(200).json({
		message: 'Course archived successfully!',
	});
}

export async function remove(req: Request, res: Response) {
	const { courseId } = req.body;

	console.log(`'${courseId}' is removed`);

	return res.status(200).json({
		message: 'Course removed successfully!',
	});
}
