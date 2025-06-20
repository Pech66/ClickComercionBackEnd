import { HttpException, HttpStatus } from '@nestjs/common';

export class validacionError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
