import { HttpException } from '@nestjs/common'

export class ConflictError extends HttpException {
  constructor(item: string) {
    super(`The ${item} already exists`, 409)
  }
}
