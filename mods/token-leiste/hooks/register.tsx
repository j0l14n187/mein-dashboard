import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, SessionRateLimit } from 'claude-code'

import type { Limit, Usage } from '../types'

const usage = atom({ plugin: 'token-leiste', key: 'usage' } as const, {
  sessionTokens: 0,
  totalTokens: 0,
  limits: [],
} as Usage)

const TOTAL_KEY = 'totalTokens'
const BAR_WIDTH = 16

const toLimits = (rl: SessionRateLimit[]): Limit[] =>
  rl.map(r => ({ kind: r.kind, percentUsed: r.percentUsed, resetsAt: r.resetsAt }))

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)} Mio` : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

const resetText = (iso?: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (x: number) => String(x).padStart(2, '0')
  return ` · Reset ${pad(d.getDate())}.${pad(d.getMonth() + 1)}. ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

async function refreshLimits($: EngineInterface) {
  const u = await $.session.usage()
  await update($, usage, v => ({ ...v, limits: toLimits(u.rateLimits) }))
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const stored = Number((await $.store.get(TOTAL_KEY)) ?? 0)
    await update($, usage, v => ({ ...v, totalTokens: Math.max(v.totalTokens, stored) }))
    await refreshLimits($)
    return next(e)
  })

  // Tokens jedes Turns (Hauptchat und Subagenten) aufsummieren
  on('turn.complete', async ($, e, next) => {
    const u = e.usage
    if (u) {
      const n =
        u.input_tokens + u.output_tokens + u.cache_read_input_tokens + u.cache_creation_input_tokens
      let total = 0
      await update($, usage, v => {
        total = v.totalTokens + n
        return { ...v, sessionTokens: v.sessionTokens + n, totalTokens: total }
      })
      await $.store.set(TOTAL_KEY, total)
    }
    return next(e)
  })

  // Rate-Limit-Fenster werden vom Engine gepusht
  on('session.measure', async ($, e, next) => {
    await update($, usage, v => ({ ...v, limits: toLimits(e.rateLimits) }))
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const { Box, Text } = $.ui.resolve(e)
    const v = await read($, usage)

    const bar = (label: string, l: Limit | undefined) => {
      if (!l) {
        return (
          <Box key={label} flexDirection="row">
            <Text dimColor>{label}: noch keine Daten</Text>
          </Box>
        )
      }
      const pct = Math.max(0, Math.min(100, l.percentUsed))
      const filled = Math.round((pct / 100) * BAR_WIDTH)
      const color = pct >= 90 ? 'red' : pct >= 70 ? 'yellow' : 'green'
      return (
        <Box key={label} flexDirection="row" gap={1}>
          <Text dimColor>{label}</Text>
          <Box flexDirection="row">
            {filled > 0 ? (
              <Box key="f" width={filled} height={1} backgroundColor={color} />
            ) : null}
            {BAR_WIDTH - filled > 0 ? (
              <Box key="e" width={BAR_WIDTH - filled} height={1} backgroundColor="gray" />
            ) : null}
          </Box>
          <Text dimColor>
            {l.percentUsed}%{resetText(l.resetsAt)}
          </Text>
        </Box>
      )
    }

    const short = v.limits.find(l => l.kind === 'five_hour')
    const week = v.limits.find(l => l.kind === 'seven_day')

    return (
      <Box flexDirection="column">
        <Text dimColor>
          Tokens gesamt: {fmt(v.totalTokens)} (diese Sitzung: {fmt(v.sessionTokens)})
        </Text>
        {bar('Tageslimit (5h)', short)}
        {bar('Wochenlimit   ', week)}
      </Box>
    )
  })
}
