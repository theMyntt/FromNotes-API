import { IRepositoryContract } from '@domain/contracts/repository.contract'
import { Note } from '../schema/note.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

export class NoteRepository implements IRepositoryContract<Note, any> {
  constructor(
    @InjectModel(Note.name)
    private readonly model: Model<Note>
  ) {}

  async create(dto: Note): Promise<boolean> {
    try {
      await new this.model(dto).save()
      return true
    } catch {
      return false
    }
  }
  find: (dto?: Note) => Promise<any>
  delete: (dto: Note) => Promise<boolean>
}
