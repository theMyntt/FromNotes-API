import { HttpException } from '@nestjs/common'

export class NotFoundError extends HttpException {
  constructor(item: string) {
    super(`We not found any ${item}`, 404)
  }
}
