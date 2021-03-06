import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {

  console.info(`0.0.0.0:${process.env.PORT}, ${process.env.MONGODB_URI}`);

  const app = await NestFactory.create(AppModule, {
    logger: true
  });

  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));

  const config = new DocumentBuilder()
    .setTitle('Core Service')
    .setDescription('Services that provides the functionalities to handle users and their permissions')
    .setContact('Matías Ramirez', 'https://github.com/matigastirami', 'matigastirami@gmail.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
