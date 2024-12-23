import { agent } from 'supertest';

declare global {
  var testRequest: ReturnType<typeof agent>;
}

export {};
