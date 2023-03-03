import fs from 'fs';
import { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const { name, version, description } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const options: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: `${name} API Documentation`,
			version: version,
			description: description,
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['./src/routes/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const UIConfig = {
	customSiteTitle: 'Aether API Documentation',
	customCss: '.swagger-ui .topbar { display: none }',
	customfavIcon: '/fav.ico',
};

export default (app: Express): void => {
	// swagger Page
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, UIConfig));

	// docs in json format
	app.get('/docs.json', (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
};
