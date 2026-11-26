# token-leiste

Claude-Code-Mod: Eine kleine Leiste direkt über dem Eingabefeld zeigt

- **Tokens gesamt** (über alle Sitzungen gespeichert) und die Tokens der aktuellen Sitzung
- **Tageslimit (5h)**: das 5-Stunden-Rate-Limit-Fenster als Balken mit Prozent und Reset-Zeit
- **Wochenlimit**: das 7-Tage-Fenster als Balken

Die Balken färben sich ab 70 % gelb und ab 90 % rot. Die Limit-Werte kommen von Claude Code selbst und sind nur mit einem Claude-Abo verfügbar.

## Nutzung

```
claude --plugin-dir mods/token-leiste
```
