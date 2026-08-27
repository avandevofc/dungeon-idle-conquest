Add-Type -AssemblyName System.Drawing

$pngPath = Join-Path $PSScriptRoot "..\public\sprites\castle.png"
$icoPath = Join-Path $PSScriptRoot "..\build\icon.ico"

New-Item -ItemType Directory -Force -Path (Split-Path $icoPath) | Out-Null

$img = [System.Drawing.Image]::FromFile($pngPath)
Write-Output "Source image: $($img.Width)x$($img.Height)"

$sizes = @(16, 32, 48, 64, 128, 256)
$bmps = @()
foreach ($s in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($s, $s)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $s, $s)
    $g.Dispose()
    $bmps += $bmp
}

# Save as ICO using the icon encoder
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/x-icon" }
if (-not $encoder) {
    # Fallback: use ICO encoder by GUID
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq [System.Guid]"b96b3cae-0728-11d3-9d7b-0000f81ef32e" }
}

# Build ICO manually
$ms = New-Object System.IO.MemoryStream
$writer = New-Object System.IO.BinaryWriter($ms)

# ICO header
$writer.Write([UInt16]0)       # Reserved
$writer.Write([UInt16]1)       # Type: ICO
$writer.Write([UInt16]$bmps.Count) # Count

$offset = 6 + ($bmps.Count * 16)

foreach ($bmp in $bmps) {
    $bmpMs = New-Object System.IO.MemoryStream
    $bmp.Save($bmpMs, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmpBytes = $bmpMs.ToArray()
    $bmpMs.Dispose()

    $w = if ($bmp.Width -ge 256) { 0 } else { $bmp.Width }
    $h = if ($bmp.Height -ge 256) { 0 } else { $bmp.Height }

    $writer.Write([byte]$w)              # Width
    $writer.Write([byte]$h)              # Height
    $writer.Write([byte]0)               # Color palette
    $writer.Write([byte]0)               # Reserved
    $writer.Write([UInt16]1)             # Color planes
    $writer.Write([UInt16]32)            # Bits per pixel
    $writer.Write([UInt32]$bmpBytes.Length) # Size of image data
    $writer.Write([UInt32]$offset)       # Offset

    $offset += $bmpBytes.Length
}

foreach ($bmp in $bmps) {
    $bmpMs = New-Object System.IO.MemoryStream
    $bmp.Save($bmpMs, [System.Drawing.Imaging.ImageFormat]::Png)
    $writer.Write($bmpMs.ToArray())
    $bmpMs.Dispose()
}

$icoBytes = $ms.ToArray()
$ms.Dispose()
$writer.Dispose()

[System.IO.File]::WriteAllBytes($icoPath, $icoBytes)
Write-Output "ICO saved to $icoPath ($($icoBytes.Length) bytes)"

foreach ($bmp in $bmps) { $bmp.Dispose() }
$img.Dispose()
