import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix( 'Api' );
  
  app.useGlobalPipes( 
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors = []) => {
        const errors = validationErrors
        .map(error => error.constraints ? Object.values(error.constraints) : [])
        .flat();
        return new BadRequestException(errors[0]); 
      },
    })    
   );

   const config = new DocumentBuilder()
   .setTitle('Backend Logs')
   .setDescription('API Para Backend Logs')
   .setVersion('1.0')
   .addTag('Aplicación Logs')
   .build();

   const swaggerCustomOptions = {
    customCss:`body {
          background-color: #ffffff;
    }
   
    .swagger-ui .topbar .topbar-wrapper .link svg {
      display: none;
    }
    .swagger-ui .topbar {
      background: linear-gradient(to bottom,  #ffffff,#808080);
    }
    .swagger-ui .topbar-wrapper .link  {
      background-image: url('https://www.bancounion.com.do/wp-content/uploads/2022/06/banco-union-logo-1-300x54.png');
      background-size: contain;
      background-repeat: no-repeat;
      height: 80px; /* Establece la altura deseada */
      width: 80px; /* Establece el ancho deseado */
    }`
    
  }
  
  
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('Api/docs', app, document,swaggerCustomOptions);

  app.enableCors();
  await app.listen(8028);

}
bootstrap();
