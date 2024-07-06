import { IControllerContract } from '@domain/contracts/controller.contract'
import { SyncOutUserDTO } from '../dto/sync-out.dto'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { UserSyncOutUseCase } from '@modules/user/app/usecases/sync-out.usecase'

export type TUserResponse = {
  id: string
  name: string
  token: string
}

@Controller('v1/user')
export class UserSyncOutController
  implements IControllerContract<SyncOutUserDTO, TUserResponse>
{
  constructor(
    @Inject('I_SYNC_OUT_USECASE')
    private readonly useCase: UserSyncOutUseCase
  ) {}

  @Post('sync-out')
  async perform(@Body() dto: SyncOutUserDTO): Promise<TUserResponse> {
    return await this.useCase.run(dto)
  }
}
