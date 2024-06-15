try {
    Get-Command spicetify -ErrorAction Stop
    Write-Output "Spicetify is already installed. Skipping Spicetify installation..." 
} catch {
    Write-Output "Spicetify not found. Installing Spicetify..."
    iwr -useb https://raw.githubusercontent.com/spicetify/cli/main/install.ps1 | iex
    iwr -useb https://raw.githubusercontent.com/spicetify/marketplace/main/resources/install.ps1 | iex
}

$lyrixedUrl = "https://github.com/Nuzair46/Lyrixed/releases/latest/download/lyrixed.zip"
$targetDir = Join-Path -Path $env:APPDATA -ChildPath "spicetify\CustomApps"

if (-not (Test-Path -Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
}

$zipFile = Join-Path -Path $targetDir -ChildPath "lyrixed.zip"

Invoke-WebRequest -Uri $lyrixedUrl -OutFile $zipFile

Expand-Archive -Path $zipFile -DestinationPath $targetDir -Force

Remove-Item -Path $zipFile

Write-Output "Lyrixed has been successfully downloaded and extracted to $targetDir"

Write-Output "Applying Lyrixed with Spicetify..."
spicetify config custom_apps lyrixed
spicetify apply
