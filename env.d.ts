declare namespace NodeJS {
    interface ProcessEnv {
        APP_NAME: string;
        TWITCH_CLIENT_ID: string;
        TWITCH_CLIENT_SECRET: string;
        EDGE_CONFIG: string;
        EDGE_CONFIG_ID: string;
        VERCEL_TOKEN: string;
    }
  }