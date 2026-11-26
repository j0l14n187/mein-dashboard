export type Limit = { kind: string; percentUsed: number; resetsAt?: string }
export type Usage = { sessionTokens: number; totalTokens: number; limits: Limit[] }

declare module 'claude-code' {
  interface PluginState {
    'token-leiste': { usage: Usage }
  }
}
