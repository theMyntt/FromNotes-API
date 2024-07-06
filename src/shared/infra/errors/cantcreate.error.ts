import { HttpException } from '@nestjs/common'

export class CantCreateError extends HttpException {
  constructor(item: string) {
    super(`We cant create ${item}`, 500)
  }
}
