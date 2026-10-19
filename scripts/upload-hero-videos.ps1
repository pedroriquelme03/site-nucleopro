# Requires: gh auth login
# Uploads public/hero/*.mp4 to GitHub Release tag "hero-videos"

$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

$files = @(
  "public/hero/cr-series.mp4",
  "public/hero/mc-series.mp4",
  "public/hero/profx.mp4"
)

foreach ($f in $files) {
  if (-not (Test-Path -LiteralPath $f)) {
    throw "Missing $f — copy the reduzidos MP4s into public/hero first."
  }
}

$exists = gh release view hero-videos 2>$null
if ($LASTEXITCODE -ne 0) {
  gh release create hero-videos `
    --title "Hero banner videos" `
    --notes "MP4s for the home hero carousel (kept out of git)." `
    @files
} else {
  gh release upload hero-videos @files --clobber
}

Write-Host "Done. URLs:"
Write-Host "https://github.com/pedroriquelme03/site-nucleopro/releases/download/hero-videos/cr-series.mp4"
Write-Host "https://github.com/pedroriquelme03/site-nucleopro/releases/download/hero-videos/mc-series.mp4"
Write-Host "https://github.com/pedroriquelme03/site-nucleopro/releases/download/hero-videos/profx.mp4"
