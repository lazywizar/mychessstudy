import { agent } from 'supertest';

declare global {
  namespace NodeJS {
    interface Global {
      testRequest: ReturnType<typeof agent>;
    }
  }
}
