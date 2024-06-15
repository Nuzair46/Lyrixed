# Lyrixed

[![Discord](https://discord.com/api/guilds/807273906872123412/widget.png)](https://discord.gg/eYudMwgYtY) <img src="https://img.shields.io/github/downloads/Nuzair46/Lyrixed/total.svg" />

![](resource/preview.png)

Lyrixed is a Spicetify custom app to bring back the lyrics feature to Spotify desktop app for freemium users.

## Installation

Windows: 
 - In your Powershell, Run:
    ```powershell
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-Expression "& { $(Invoke-WebRequest -UseBasicParsing 'https://raw.githubusercontent.com/Nuzair46/Lyrixed/main/install.ps1') }"
    ```
MacOS/Linux:
- In your terminal, Run:
  ```bash
  curl -fsSL https://raw.githubusercontent.com/Nuzair46/Lyrixed/main/install.sh | sh
  ```

## Uninstallation
- In your terminal, Run:
  ```
  spicetify config custom_apps lyrixed-
  spicetify apply
  ```
## Note

- Feel free to open issue for fixes and features or contact on Discord.
