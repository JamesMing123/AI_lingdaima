import mitt from 'mitt';
import type { Emitter } from 'mitt';
import type { StreamingEvent, StreamingMessage, ConversationSession } from '../../types/conversation';
import { getWsBaseUrl } from './utils';

type StreamingPayload =
  | ({ event: 'message' } & StreamingMessage)
  | ({ event: 'history' } & { sessions: ConversationSession[] })
  | ({ event: 'error' } & { message: string })
  | ({ event: 'open' } & Record<string, never>);

type StreamingClientEvents = {
  message: StreamingPayload & { event: 'message' };
  history: StreamingPayload & { event: 'history' };
  error: StreamingPayload & { event: 'error' };
  open: StreamingPayload & { event: 'open' };
};

export class StreamingClient {
  private emitter: Emitter<StreamingClientEvents>;
  private socket?: WebSocket;

  constructor() {
    this.emitter = mitt<StreamingClientEvents>();
    this.connect();
  }

  on<T extends keyof StreamingClientEvents>(event: T, handler: (payload: StreamingClientEvents[T]) => void) {
    this.emitter.on(event, handler);
  }

  send(event: StreamingEvent) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('Streaming socket is not ready');
      return;
    }
    this.socket.send(JSON.stringify(event));
  }

  private connect() {
    const url = getWsBaseUrl();
    this.socket = new WebSocket(`${url}/ws/conversation`);

    this.socket.addEventListener('open', () => {
      this.emitter.emit('open', { event: 'open' } as StreamingClientEvents['open']);
    });

    this.socket.addEventListener('message', (event) => {
      const payload = JSON.parse(event.data.toString()) as StreamingPayload;
      this.emitter.emit(payload.event as StreamingPayload['event'], payload as never);
    });

    this.socket.addEventListener('close', () => {
      setTimeout(() => this.connect(), 1500);
    });
  }
}
