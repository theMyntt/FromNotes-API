import { IUseCaseContract } from '@domain/contracts/usecase.contract'
import { TUserResponse } from '@modules/user/infra/controllers/sync-out.controller'
import { SyncOutUserDTO } from '@modules/user/infra/dto/sync-out.dto'
import { Inject } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { UUID } from '@utils/uuid.utils'
import { NotFoundError } from '@errors/notfound.error'

export class UserSyncOutUseCase
  implements IUseCaseContract<SyncOutUserDTO, TUserResponse>
{
  constructor(
    @Inject(UserService)
    private readonly service: UserService
  ) {}

  async run(dto: SyncOutUserDTO): Promise<TUserResponse> {
    const response = await this.service.find({
      limit: 1,
      page: 1,
      filters: [
        {
          field: 'email',
          value: dto.email
        },
        {
          field: 'password',
          value: dto.password
        }
      ]
    })

    if (!response.users[0]) {
      throw new NotFoundError('user')
    }

    return {
      id: response.users[0]._id,
      name: response.users[0].name,
      token: UUID.generate()
    }
  }
}
