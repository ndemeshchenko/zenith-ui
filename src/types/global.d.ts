export {}

declare global {
  interface Window {
    _env_: {
      VITE_ZENITH_ENDPOINT?: string
      VITE_ZENITH_API_TOKEN?: string
      [key: string]: any
    }
  }
}
