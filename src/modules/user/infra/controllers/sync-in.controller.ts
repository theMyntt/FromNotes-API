import { IControllerContract } from '@domain/contracts/controller.contract'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { SyncInUserDTO } from '../dto/sync-in.dto'
import { TResultRoot } from '@domain/core/result.core'
import { UserSyncInUseCase } from '@modules/user/app/usecases/sync-in.usecase'

@Controller('v1/user')
export class UserSyncInController
  implements IControllerContract<SyncInUserDTO, TResultRoot>
{
  constructor(
    @Inject('I_SYNC_IN_USECASE')
    private readonly useCase: UserSyncInUseCase
  ) {}

  @Post('sync-in')
  async perform(@Body() dto: SyncInUserDTO): Promise<TResultRoot> {
    return this.useCase.run(dto)
  }
}
