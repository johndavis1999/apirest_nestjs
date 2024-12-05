import { ValidationPipe, BadRequestException } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  createExceptionFactory() {
    return (validationErrors = []) => {
      // Estructurar los errores en un objeto similar al formato de Laravel
      const formattedErrors = validationErrors.reduce((acc, err) => {
        acc[err.property] = Object.values(err.constraints || {});
        return acc;
      }, {} as Record<string, string[]>);

      return new BadRequestException({
        statusCode: 422,
        error: "Unprocessable Entity",
        message: "Validation failed",
        errors: formattedErrors, // Estructura como un objeto similar a Laravel
      });
    };
  }
}
