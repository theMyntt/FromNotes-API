import { UUID } from '@utils/uuid.utils'

export class UserAggregate {
  readonly id: string
  name: string
  email: string
  phone: string
  password: string
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(dto: UserAggregate) {
    this.id = dto.id || UUID.generate()
    this.name = dto.name
    this.email = dto.email
    this.phone = dto.phone
    this.password = dto.password
    this.createdAt = dto.createdAt || new Date()
    this.updatedAt = dto.updatedAt || new Date()
  }
}
