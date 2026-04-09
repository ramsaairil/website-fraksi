# PowerShell script to restore media assets for members using curl
# Usage: .\scripts\restore-media-curl.ps1

$STRAPI_URL = "http://localhost:1337"
$UPLOADS_DIR = "d:\Projek\Web Fraksi PKS DPRD Kota Bandung\backend\public\uploads"

# 1. Get member IDs
Write-Host "🔍 Fetching member IDs..."
try {
    $res = Invoke-RestMethod -Uri "$STRAPI_URL/api/members"
    $members = $res.data
    Write-Host "👥 Found $($members.Count) members."
} catch {
    Write-Host "❌ Failed to connect to Strapi. Make sure it is running at $STRAPI_URL"
    exit
}

# 2. File Mappings
$mappings = @(
    @("Eko", "EKO KURNIANTO"),
    @("Deni", "DENI NURSANI"),
    @("Andri", "ANDRI RUSMANA"),
    @("Siti", "SITI MARFUAH"),
    @("Asep", "ASEP MULYADI"),
    @("Susi", "SUSI SULASTRI"),
    @("Elton", "ELTON AGUS MARJAN"),
    @("Agus_Andi", "AGUS ANDI SETYAWAN"),
    @("Iman", "IMAN LESTARIYONO"),
    @("Susanto", "SUSANTO TRIYOGO ADIPUTRO")
)

# 3. Scan Uploads
$files = Get-ChildItem -Path $UPLOADS_DIR -Exclude "thumbnail_*", "small_*", "medium_*", "large_*" | Where-Object { $_.Extension -eq ".jpg" }
Write-Host "📂 Found $($files.Count) original images in uploads folder."

foreach ($map in $mappings) {
    $pattern = $map[0]
    $name = $map[1]
    
    $member = $members | Where-Object { $_.nama -match $name }
    if ($null -eq $member) { continue }

    $targetFile = $files | Where-Object { $_.Name -match $pattern } | Select-Object -First 1
    if ($null -eq $targetFile) { continue }

    Write-Host "📤 Uploading and linking $($targetFile.Name) for $($member.nama)..."
    
    # Use curl to upload
    & curl.exe -X POST -F "files=@$($targetFile.FullName)" -F "refId=$($member.id)" -F "ref=api::member.member" -F "field=foto" "$STRAPI_URL/api/upload"
    Write-Host "`n✅ Done.`n"
}

Write-Host "✨ Restoration process finished."
