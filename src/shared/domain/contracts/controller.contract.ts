export interface IControllerContract<Input, Output> {
  perform(dto: Input): Promise<Output>
}
