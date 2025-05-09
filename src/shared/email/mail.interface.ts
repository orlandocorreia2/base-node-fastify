export interface MailInterface {
  send(data: any): Promise<void>;
}
