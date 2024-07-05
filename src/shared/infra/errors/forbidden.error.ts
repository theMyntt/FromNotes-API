import { HttpException } from '@nestjs/common'

export class ForbiddenError extends HttpException {
  constructor() {
    super('You cant access this route', 403)
  }
}
