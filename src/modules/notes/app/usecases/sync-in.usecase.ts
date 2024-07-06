import { IUseCaseContract } from '@domain/contracts/usecase.contract'
import { TResultRoot } from '@domain/core/result.core'
import { NoteAggregate } from '@modules/notes/domain/aggregate/note.aggregate'
import { SyncInNoteDTO } from '@modules/notes/infra/dto/sync-in.dto'
import { Inject } from '@nestjs/common'
import { NoteService } from '../services/note.service'
import { NoteMapper } from '@modules/notes/domain/mapper/note.mapper'
import { CantCreateError } from '@errors/cantcreate.error'

export class NotesSyncInUseCase
  implements IUseCaseContract<SyncInNoteDTO, TResultRoot>
{
  constructor(
    @Inject(NoteService)
    private readonly service: NoteService,
    @Inject('I_NOTE_MAPPER')
    private readonly mapper: NoteMapper
  ) {}
  async run(dto: SyncInNoteDTO): Promise<TResultRoot> {
    const entity = new NoteAggregate({
      text: dto.text,
      title: dto.title,
      createdBy: dto.createdBy
    })

    const persistance = this.mapper.toPersistance(entity)

    if (!(await this.service.create(persistance))) {
      throw new CantCreateError('this note')
    }

    return {
      message: 'Succefully created',
      statusCode: 201
    }
  }
}
