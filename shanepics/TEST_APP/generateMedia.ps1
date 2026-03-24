# Folder paths
$base = "content"
$folders = @("images","audio","video")
$jsArray = @()

foreach ($folder in $folders) {
    $files = Get-ChildItem "$base\$folder" -File
    foreach ($file in $files) {
        # Determine type for HTML
        $type = if ($folder -eq "images") {"image"} elseif ($folder -eq "audio") {"audio"} else {"video"}
        # Simple flow assignment: morning/evening for demo
        $flow = ""
        if ($type -eq "audio") {
            if ($file.Name -match "morning") { $flow = "morning-flow" }
            elseif ($file.Name -match "evening") { $flow = "evening-flow" }
        } elseif ($type -eq "image") {
            if ($file.Name -match "morning") { $flow = "morning-flow" }
            elseif ($file.Name -match "evening") { $flow = "evening-flow" }
        }

        $jsArray += "{ type: '$type', file: '$($file.Name)', flow: '$flow' }"
    }
}

# Output JS array
$jsContent = "const mediaFiles = [`n" + ($jsArray -join ",`n") + "`n];"
Set-Content -Path "$base\mediaFiles.js" -Value $jsContent -Encoding UTF8
Write-Host "mediaFiles.js generated in content folder."
