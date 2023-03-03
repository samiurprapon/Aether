import { Request, Response } from 'express';

export async function getCourses(req: Request, res: Response) {
	return res.status(200).json({
		message: 'Courses fetched successfully!',
	});
}

export async function enrollCourse(req: Request, res: Response) {
	const { enroll } = req.body;

	console.log(`Course code : '${enroll}'`);

	return res.status(200).json({
		message: 'Course enrolled successfully!',
	});
}

export async function dropCourse(req: Request, res: Response) {
	const { courseId, enrollId } = req.body;

	console.log(`Course code : '${courseId}', enrollId: '${enrollId}'`);

	return res.status(200).json({
		message: 'Course dropped successfully!',
	});
}
