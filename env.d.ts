declare module 'cors';

declare namespace NodeJS {
    interface ProcessEnv {
    //   API_KEY: string;
    //   PORT?: string;
      MONGODB_URL?: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
  