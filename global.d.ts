declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_GATEWAY_URL: string;
    }
  }
}
