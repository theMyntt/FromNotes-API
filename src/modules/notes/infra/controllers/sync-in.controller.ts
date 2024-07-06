import { IControllerContract } from '@domain/contracts/controller.contract'
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common'
import { SyncInNoteDTO } from '../dto/sync-in.dto'
import { TResultRoot } from '@domain/core/result.core'
import { AuthMiddleware } from '@middlewares/auth.middleware'
import { NoteService } from '@modules/notes/app/services/note.service'
import { NoteAggregate } from '@modules/notes/domain/aggregate/note.aggregate'
import { NoteMapper } from '@modules/notes/domain/mapper/note.mapper'
import { CantCreateError } from '@errors/cantcreate.error'
import { NotesSyncInUseCase } from '@modules/notes/app/usecases/sync-in.usecase'

@Controller('v1/note')
@UseGuards(AuthMiddleware)
export class NotesSyncInController
  implements IControllerContract<SyncInNoteDTO, TResultRoot>
{
  constructor(
    @Inject('I_SYNC_IN_USECASE')
    private readonly useCase: NotesSyncInUseCase
  ) {}

  @Post('sync-in')
  async perform(@Body() dto: SyncInNoteDTO): Promise<TResultRoot> {
    return await this.useCase.run(dto)
  }
}
