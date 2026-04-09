@echo off
set STRAPI_URL=http://localhost:1337
set UPLOADS_DIR=backend\public\uploads

echo 🚀 Starting Media Restoration (Batch)...

:: Member Photos
echo 🔍 Restoring Members...
curl -X POST -F "files=@%UPLOADS_DIR%\Pak_Eko_Kurnianto_fbc2864bd0.jpg" -F "refId=2" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
curl -X POST -F "files=@%UPLOADS_DIR%\Pak_Deni_Nursani_9a2cdce66b.jpg" -F "refId=4" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
curl -X POST -F "files=@%UPLOADS_DIR%\Pak_Andri_558a8e7e61.jpg" -F "refId=6" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
curl -X POST -F "files=@%UPLOADS_DIR%\Bu_Siti_Marfuah_264e3601d0.jpg" -F "refId=8" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
curl -X POST -F "files=@%UPLOADS_DIR%\Pak_Asep_Mulyadi_bb1fda702f.jpg" -F "refId=18" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
curl -X POST -F "files=@%UPLOADS_DIR%\Bu_Susi_f8b964e413.jpg" -F "refId=12" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
curl -X POST -F "files=@%UPLOADS_DIR%\Pak_Elton_0b34c2e401.jpg" -F "refId=14" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
curl -X POST -F "files=@%UPLOADS_DIR%\Pak_Agus_Andi_0433b19e1a.jpg" -F "refId=16" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
curl -X POST -F "files=@%UPLOADS_DIR%\Pak_Iman_Lestariyono_b9a24c9ce2.jpg" -F "refId=20" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
curl -X POST -F "files=@%UPLOADS_DIR%\Pak_Susanto_91c1d3348b.jpg" -F "refId=22" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload
:: Ahmad Rahmat Purnama (placeholder if no file found)
:: curl -X POST -F "files=@%UPLOADS_DIR%\..." -F "refId=10" -F "ref=api::member.member" -F "field=foto" %STRAPI_URL%/api/upload

echo ✨ Done.
