import { IUseCaseContract } from '@domain/contracts/usecase.contract'
import { TSyncOutNotes } from '@modules/notes/infra/controllers/sync-out.controller'
import { SyncOutNoteDTO } from '@modules/notes/infra/dto/sync-out.dto'
import { NoteService } from '../services/note.service'
import { Inject } from '@nestjs/common'

export class NotesSyncOutUseCase
  implements IUseCaseContract<SyncOutNoteDTO, TSyncOutNotes>
{
  constructor(
    @Inject(NoteService)
    private readonly service: NoteService
  ) {}
  async run(dto: SyncOutNoteDTO): Promise<TSyncOutNotes> {
    const limit = parseInt(dto.limit)
    const page = parseInt(dto.page)

    const personalNotes = await this.service.find({
      filters: [
        {
          field: 'createdBy',
          value: dto.user
        }
      ],
      limit,
      page
    })

    const lastNotes = await this.service.find({
      filters: [],
      limit: 3,
      page: 1
    })

    return {
      personalNotes: personalNotes.notes,
      lastNotes: lastNotes.notes,
      page,
      total: lastNotes.total
    }
  }
}
