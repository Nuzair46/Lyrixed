#!/bin/bash

if command -v spicetify &> /dev/null
then
    echo "Spicetify is already installed. Skipping Spicetify installation..."
else
    echo "Spicetify not found. Installing Spicetify..."
    curl -fsSL https://raw.githubusercontent.com/spicetify/cli/main/install.sh | sh
    curl -fsSL https://raw.githubusercontent.com/spicetify/marketplace/main/resources/install.sh | sh
fi

lyrixedUrl="https://github.com/Nuzair46/Lyrixed/releases/latest/download/lyrixed.zip"
targetDir="$HOME/.spicetify/CustomApps/lyrixed"

mkdir -p "$targetDir"

zipFile="$targetDir/lyrixed.zip"
curl -L "$lyrixedUrl" -o "$zipFile"

unzip -o "$zipFile" -d "$targetDir"
rm "$zipFile"

echo "Lyrixed has been successfully downloaded and extracted to $targetDir"

echo "Applying Lyrixed with Spicetify..."
spicetify config custom_apps lyrixed
spicetify apply