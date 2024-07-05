import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ForbiddenError } from '@errors/forbidden.error'
import { UUID } from '@utils/uuid.utils'

@Injectable()
export class AuthMiddleware implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const auth = request.headers.authorization
    if (!auth) {
      throw new ForbiddenError()
    }

    const token = auth.replace('Bearer ', '').trim()
    if (!token) {
      throw new ForbiddenError()
    }

    const isValid = UUID.validate(token)
    if (!isValid) {
      throw new ForbiddenError()
    }

    return true
  }
}
