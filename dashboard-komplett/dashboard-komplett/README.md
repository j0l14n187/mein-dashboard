# Dein Dashboard – kostenlos mit GitHub Pages

Eine responsive, statische Website mit Navigation für **Home**, **Kalender**, **Erinnerungen**, **Stundenplan**, **Email**, **Microsoft Teams** und **IServ**. Auf dem iPad wird die Navigation als Leiste am unteren Rand angezeigt. Die Oberfläche folgt einem dunklen Glasstil mit monochromen Anthrazit- und Grautönen, Systemschrift und einem 8-Punkt-Abstandsraster. Grün dient nur als Statusfarbe.

Auf **Home** findest du außerdem eine App-Übersicht mit direkten Öffnen-Buttons für GMX, Apple Kalender, Apple Erinnerungen, Teams, IServ und WebUntis. Externe Dienste öffnen aus Sicherheits- und Kompatibilitätsgründen in einem eigenen Browser-Tab. Einbetten im Dashboard klappt nur, wenn der jeweilige Anbieter es erlaubt.

Beim Start erscheint ein E-Mail-/Passwort-Login über Supabase Auth. Neue Nutzer können sich registrieren; die E-Mail-Bestätigung ist bei der Registrierung einmalig. Bei späteren Anmeldungen reicht das Passwort. Vorhandene Magic-Link-Nutzer können über **Passwort vergessen?** ein Passwort festlegen. Die Seite ist weiterhin statisch: der Login schützt die Dashboard-Oberfläche, aber nicht sensible Informationen, die fest in den HTML/JS-Dateien stehen. Notizen und Aufgaben bleiben lokal im Browser und werden durch Supabase nicht synchronisiert oder verschlüsselt.

### Supabase-Anmeldung einrichten

Die Projekt-URL und der Publishable key sind bereits in `app.js` eingetragen. Der Publishable key ist für Browser-Code vorgesehen; **niemals** einen Secret key, `service_role`-Key oder das Postgres-Passwort in `app.js` eintragen.

1. In Supabase unter **Authentication → Sign In / Providers → Email** E-Mail-Anmeldung aktivieren. In den Auth-Einstellungen muss **Confirm email** aktiviert bleiben, damit neue Nutzer ihre Adresse bei der Registrierung einmalig bestätigen.
2. Unter **Authentication → URL Configuration** die Website-Adresse als **Site URL** setzen. Bei **Redirect URLs** zusätzlich die vollständige Cloudflare-Pages-Adresse erlauben, zum Beispiel `https://DEIN-PROJEKT.pages.dev/**`. Für lokale Tests kannst du `http://localhost:8000/**` hinzufügen.
3. Unter **Authentication → Sign In / Providers → Email** prüfen, dass E-Mail-Anmeldung aktiviert ist.
4. Öffne die Dashboard-Adresse. Für ein neues Konto wähle **Neues Konto erstellen**, gib E-Mail und Passwort ein und bestätige die Adresse über den einmaligen Link in der E-Mail. Danach kannst du dich mit E-Mail und Passwort anmelden. Für ein vorhandenes Magic-Link-Konto wähle **Passwort vergessen?**, um ein Passwort festzulegen.

Supabase’ eingebauter SMTP-Versand ist nur zum Testen gedacht: Er versendet nur an Team-E-Mail-Adressen und ist stark begrenzt. Für Bestätigungs- und Passwort-Reset-E-Mails an beliebige Adressen brauchst du einen eigenen SMTP-Maildienst.

Der Auth-Login ist keine vollständige Zugriffssperre für die statischen Dateien: Wer die öffentliche Website kennt, kann HTML und JavaScript abrufen. Für echte Sperrung der gesamten Website aktiviere zusätzlich Cloudflare Access. Private Daten sollten nicht in den statischen Dateien stehen; für gespeicherte Daten wären sichere Datenbankregeln (RLS) erforderlich.

### Cloudflare Pages mit echtem Zugriffsschutz

Wenn du Cloudflare Pages nutzt, kannst du **Cloudflare Access** vor die Website schalten:

1. Im Cloudflare-Dashboard dein Pages-Projekt öffnen und **Settings → General → Enable access policy** aktivieren.
2. Danach in **Zero Trust → Access → Applications** die Richtlinie für deine `pages.dev`-Adresse öffnen.
3. Eine **Allow**-Regel anlegen, die nur deine eigene E-Mail-Adresse zulässt (zum Beispiel mit Einmalcode per E-Mail).
4. Die Seite in einem privaten Browserfenster prüfen: Ohne Anmeldung darf das Dashboard nicht erscheinen.

Access schützt den Aufruf des Dashboards. Es meldet dich nicht automatisch bei GMX, Apple, Teams, WebUntis oder IServ an. Dafür gelten weiterhin die jeweiligen Konten und Anmeldungen.

## 1. Apple-Kalender vorbereiten

1. Öffne auf einem Apple-Gerät **Kalender** und tippe neben dem gewünschten iCloud-Kalender auf **ⓘ**.
2. Aktiviere **Öffentlicher Kalender** und wähle **Link teilen** bzw. kopiere den Link. Die Bezeichnungen können je nach iOS-Version leicht abweichen.
3. **Wichtig:** Ein öffentlicher Kalenderlink kann von jeder Person geöffnet werden, die ihn kennt. Teile damit keinen Kalender mit sensiblen Terminen. Der Link ist wie ein Zugangsschlüssel zu den Kalenderdaten.
4. Im Dashboard ⚙ öffnen, den Link einfügen und **Speichern** drücken.

Eine Website auf GitHub Pages kann private iCloud-Daten nicht direkt lesen. Der Feed-Versuch kann außerdem an Browser-CORS scheitern. In diesem Fall exportiere/teile den Kalender als `.ics`-Datei und nutze **.ics-Datei auswählen**. Diese Datei wird im Browser verarbeitet und nicht hochgeladen. Die Dateiansicht ist eine Momentaufnahme; für aktuelle Daten erneut exportieren und auswählen. Es wird kein Apple-ID-Passwort abgefragt.

## WebUntis-Stundenplan

Öffne im Dashboard **Stundenplan** und wähle **WebUntis-.ics-Datei auswählen**, um eine aus WebUntis exportierte iCalendar-Datei zu laden. Der Import bleibt lokal im Browser; wähle eine neue Datei, wenn WebUntis den Plan aktualisiert hat. Die statische Website fragt keine WebUntis-Zugangsdaten ab. Eine automatische Verbindung hängt von der WebUntis-Konfiguration deiner Schule ab und sollte nur über eine sichere, eigene Serverlösung eingerichtet werden.

## Erinnerungen, Email und Schul-Dienste

- **Erinnerungen:** Die eigene Dashboard-Liste ist lokal. **Apple Erinnerungen öffnen** führt zu iCloud, wo du dich direkt bei Apple anmeldest. Eine statische Website kann Apple-Erinnerungen nicht auslesen oder synchronisieren.
- **Email:** **GMX Mail öffnen** führt zum GMX-Postfach. Ungelesene Nachrichten werden nicht in dieser Website angezeigt, weil ein sicherer direkter Zugriff eine geschützte GMX-Anbindung mit Server erfordern würde.
- **Microsoft Teams:** Der Menüpunkt öffnet Teams auf der offiziellen Microsoft-Seite.
- **IServ:** Trage unter IServ die vollständige HTTPS-Adresse deiner Schule ein. Die Website leitet dich dann zum offiziellen Schulserver weiter; Login und Inhalte bleiben bei IServ.

## 2. Repository auf GitHub anlegen

1. Melde dich bei [github.com](https://github.com) an und erstelle ein Repository, zum Beispiel `mein-dashboard`.
2. Für die kostenlose GitHub-Pages-Adresse muss das Repository öffentlich sein. Die Seite selbst ist dann öffentlich erreichbar. Verwende für Notizen und Aufgaben deshalb keine sensiblen Inhalte.
3. Lade `index.html`, `style.css` und `app.js` aus diesem Ordner in das Repository hoch. `README.md` kannst du ebenfalls mit hochladen.
   - Auf GitHub: **Add file → Upload files**, Dateien auswählen, unten **Commit changes**.
   - Alternativ die Dateien in ein lokales Repository kopieren und mit GitHub Desktop veröffentlichen.

## 3. GitHub Pages einschalten

1. Öffne im Repository **Settings → Pages**.
2. Bei **Build and deployment** als Quelle **Deploy from a branch** wählen.
3. Branch **main** und Ordner **/(root)** auswählen, dann **Save**.
4. Nach dem Build zeigt GitHub oben auf der Pages-Seite die Adresse an, meist `https://DEIN-NAME.github.io/mein-dashboard/`. Der erste Build kann kurz dauern.

## 4. Am iPad zum Home-Bildschirm hinzufügen

1. Öffne die GitHub-Pages-Adresse in **Safari**.
2. Tippe auf **Teilen** (Quadrat mit Pfeil nach oben).
3. Wähle **Zum Home-Bildschirm** und bestätige mit **Hinzufügen**.

## 5. Nutzung und Datenschutz

- Dashboard-To-dos, Notizen, Kalenderlink und IServ-Adresse werden in `localStorage` des Browsers gespeichert. Sie synchronisieren nicht automatisch zwischen PC und iPad und sind nicht verschlüsselt.
- Der gespeicherte Kalenderlink liegt ebenfalls lokal im Browser. Wer Zugriff auf das öffentliche Feed-URL hat, kann den Kalender lesen.
- GitHub Pages hostet die statischen Dateien kostenlos. Das Repository und die veröffentlichte Seite sollten als öffentlich betrachtet werden.
- Das Design lädt optionale Schriftarten von Google Fonts. Für komplett lokale Fonts kann die `@import`-Zeile in `style.css` entfernt werden; dann nutzt die Seite Systemschriften.
- Eine spätere private, automatische iCloud-Anbindung würde einen eigenen vertrauenswürdigen Backend-/OAuth-Dienst erfordern. Niemals das Apple-ID-Passwort in diese Website eintragen.
