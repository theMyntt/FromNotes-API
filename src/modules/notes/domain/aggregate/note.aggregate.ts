import { UUID } from '@utils/uuid.utils'

type TNoteModel = {
  id?: string
  title: string
  text: string
  createdBy: string
  createdAt?: Date
  updatedAt?: Date
}

export class NoteAggregate {
  readonly id: string
  title: string
  text: string
  createdBy: string
  createdAt: Date
  updatedAt: Date

  constructor(dto: TNoteModel) {
    this.id = dto.id || UUID.generate()
    this.title = dto.title
    this.text = dto.text
    this.createdBy = dto.createdBy
    this.createdAt = dto.createdAt || new Date()
    this.updatedAt = new Date()
  }
}
