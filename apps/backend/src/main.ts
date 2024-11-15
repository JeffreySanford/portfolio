import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { from, of, map, switchMap } from 'rxjs';
import * as fs from 'fs';

function bootstrap() {
  const isDev = process.env.NODE_ENV !== 'production';

  // Load SSL options for development
  const httpsOptions = isDev
    ? {
        key: fs.readFileSync(join(process.cwd(), '.self-signed-certs', 'key.pem')),
        cert: fs.readFileSync(join(process.cwd(), '.self-signed-certs', 'cert.pem')),
      }
    : undefined;

  // Create the Nest application as an observable
  const app$ = from(NestFactory.create(AppModule, { httpsOptions }));

  // Reactive flow for app setup
  app$
    .pipe(
      // Configure Swagger
      switchMap((app) => {
        const config = new DocumentBuilder()
          .setTitle('Backend API')
          .setDescription('API documentation for the backend service')
          .setVersion('1.0')
          .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, document);

        // Enable CORS
        app.enableCors();

        // Start the application
        return from(app.listen(3000)).pipe(map(() => app));
      }),
      // Log success messages
      map((app) => {
        console.log(
          `Application is running on: ${
            isDev ? 'https://localhost:3000' : 'http://localhost:3000'
          }`
        );
        console.log(`API Docs available at: https://localhost:3000/api/docs`);
        return app;
      })
    )
    .subscribe({
      error: (err) => {
        console.error('Error during bootstrap:', err);
      },
    });
}

bootstrap();
