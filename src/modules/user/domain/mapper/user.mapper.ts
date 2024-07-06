import { IMapperContract } from '@domain/contracts/mapper.contract'
import { User } from '../../infra/schema/user.schema'
import { UserAggregate } from '../aggregate/user.aggregate'

export class UserMapper implements IMapperContract<User, UserAggregate> {
  toDomain(dto: User): UserAggregate {
    return new UserAggregate({
      id: dto._id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    })
  }

  toPersistance(dto: UserAggregate): User {
    return {
      _id: dto.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    }
  }
}
