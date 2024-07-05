export interface IMapperContract<Entity, Aggregate> {
  toDomain: (dto: Entity) => Aggregate
  toPersistance: (dto: Aggregate) => Entity
}
