import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { lojaSchema } from './lojaSchema';

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(lojaSchema));
}
