import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): string {
    return `Hello, ${message}`;
  }
}
