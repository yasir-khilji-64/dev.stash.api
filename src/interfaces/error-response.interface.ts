import { MessageResponse } from './message-response.interface';

export interface ErrorResponse extends MessageResponse {
  stack?: string;
}
