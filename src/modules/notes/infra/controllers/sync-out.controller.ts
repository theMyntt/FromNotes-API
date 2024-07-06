import { IControllerContract } from '@domain/contracts/controller.contract'
import { AuthMiddleware } from '@middlewares/auth.middleware'
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common'
import { SyncOutNoteDTO } from '../dto/sync-out.dto'
import { TNotesResponse } from '@modules/notes/app/types/find.type'
import { NotesSyncOutUseCase } from '@modules/notes/app/usecases/sync-out.usecase'

export type TSyncOutNotes = {
  personalNotes: Array<TNotesResponse>
  lastNotes: Array<TNotesResponse>
  page: number
  total: number
}

@Controller('v1/note')
@UseGuards(AuthMiddleware)
export class NotesSyncOutController
  implements IControllerContract<SyncOutNoteDTO, TSyncOutNotes>
{
  constructor(
    @Inject('I_SYNC_OUT_USECASE')
    private readonly useCase: NotesSyncOutUseCase
  ) {}

  @Get('sync-out')
  async perform(@Query() dto: SyncOutNoteDTO): Promise<TSyncOutNotes> {
    return await this.useCase.run(dto)
  }
}
