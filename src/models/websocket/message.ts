export interface IMessageModel {
  greeting?: string
}
export class MessageModel implements IMessageModel {
  readonly greeting: string
}