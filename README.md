# Dein Dashboard – kostenlos mit GitHub Pages

Eine responsive, statische Website mit Navigation für **Home**, **Kalender**, **Erinnerungen**, **Stundenplan**, **Email**, **Microsoft Teams** und **IServ**. Auf dem iPad wird die Navigation als Leiste am unteren Rand angezeigt. Die Oberfläche folgt einem dunklen Glasstil mit monochromen Anthrazit- und Grautönen, Systemschrift und einem 8-Punkt-Abstandsraster. Grün dient nur als Statusfarbe.

Beim Start erscheint eine einfache persönliche Login-Maske für Julian Koch. Die Anmeldung bleibt bis zum Schließen des Browser-Tabs aktiv; **Abmelden** beendet sie. **Achtung:** Das ist nur eine Bedienungssperre. Bei einer statischen GitHub-Pages-Seite kann jeder den clientseitigen Code untersuchen oder umgehen. Stelle dort keine privaten Daten ein und verwende diese Maske nicht als echten Zugriffsschutz. Für echte Vertraulichkeit brauchst du einen passwortgeschützten Host oder eine serverseitige Anmeldung.

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
