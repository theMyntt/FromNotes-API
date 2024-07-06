import { IUseCaseContract } from '@domain/contracts/usecase.contract'
import { TResultRoot } from '@domain/core/result.core'
import { SyncInUserDTO } from '@modules/user/infra/dto/sync-in.dto'
import { Inject } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { UserAggregate } from '@modules/user/domain/aggregate/user.aggregate'
import { UserMapper } from '@modules/user/domain/mapper/user.mapper'
import { CantCreateError } from '@errors/cantcreate.error'

export class UserSyncInUseCase
  implements IUseCaseContract<SyncInUserDTO, TResultRoot>
{
  constructor(
    @Inject(UserService)
    private readonly service: UserService,
    @Inject('I_USER_MAPPER')
    private readonly mapper: UserMapper
  ) {}

  async run(dto: SyncInUserDTO): Promise<TResultRoot> {
    const entity = new UserAggregate({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: dto.password
    })

    const persistance = this.mapper.toPersistance(entity)

    const go = await this.service.create(persistance)
    if (!go) {
      throw new CantCreateError('user')
    }

    return {
      message: 'User successfuly created',
      statusCode: 201
    }
  }
}
