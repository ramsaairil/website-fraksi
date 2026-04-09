/**
 * Script to restore media assets for members using standard Node.js fetch
 * node scripts/restore-media.js
 */
const fs = require('fs');
const path = require('path');
const { Blob } = require('buffer');

const STRAPI_URL = 'http://localhost:1337';
const UPLOADS_DIR = path.join(__dirname, '../backend/public/uploads');

const photoMappings = [
  { pattern: /Eko/i, nameSnippet: 'EKO KURNIANTO' },
  { pattern: /Deni/i, nameSnippet: 'DENI NURSANI' },
  { pattern: /Andri/i, nameSnippet: 'ANDRI RUSMANA' },
  { pattern: /Siti/i, nameSnippet: 'SITI MARFUAH' },
  { pattern: /Asep/i, nameSnippet: 'ASEP MULYADI' },
  { pattern: /Susi/i, nameSnippet: 'SUSI SULASTRI' },
  { pattern: /Elton/i, nameSnippet: 'ELTON AGUS MARJAN' },
  { pattern: /Agus_Andi/i, nameSnippet: 'AGUS ANDI SETYAWAN' },
  { pattern: /Iman/i, nameSnippet: 'IMAN LESTARIYONO' },
  { pattern: /Susanto/i, nameSnippet: 'SUSANTO TRIYOGO ADIPUTRO' },
];

async function main() {
  console.log('🚀 Starting Media Restoration (Native Fetch)...\n');

  if (!fs.existsSync(UPLOADS_DIR)) {
    console.error('❌ Uploads directory not found at', UPLOADS_DIR);
    return;
  }

  const files = fs.readdirSync(UPLOADS_DIR).filter(f => 
    !f.startsWith('thumbnail_') && !f.startsWith('small_') && 
    !f.startsWith('medium_') && !f.startsWith('large_') && 
    (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'))
  );

  console.log(`📂 Found ${files.length} original images in uploads folder.\n`);

  // 1. Get all members
  let members = [];
  try {
    const res = await fetch(`${STRAPI_URL}/api/members`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    members = body.data;
    console.log(`👥 Found ${members.length} members in database.\n`);
  } catch (e) {
    console.error('❌ Failed to fetch members. Is Strapi running?', e.message);
    return;
  }

  for (const mapping of photoMappings) {
    const member = members.find(m => m.nama.includes(mapping.nameSnippet));
    if (!member) {
      console.log(`⏩ Skipping ${mapping.nameSnippet} (Member not found in DB)`);
      continue;
    }

    const matchingFile = files.find(f => mapping.pattern.test(f));
    if (!matchingFile) {
      console.log(`❓ No matching file for ${member.nama}`);
      continue;
    }

    console.log(`📤 Uploading and linking ${matchingFile} for ${member.nama}...`);

    try {
      const filePath = path.join(UPLOADS_DIR, matchingFile);
      const fileBuffer = fs.readFileSync(filePath);
      const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
      
      const formData = new FormData();
      formData.append('files', blob, matchingFile);
      formData.append('refId', member.id.toString());
      formData.append('ref', 'api::member.member');
      formData.append('field', 'foto');

      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const errBody = await uploadRes.text();
        throw new Error(`HTTP ${uploadRes.status}: ${errBody}`);
      }

      console.log(`✅ Successfully linked ${matchingFile} to ${member.nama}\n`);
    } catch (e) {
      console.error(`❌ Failed to upload ${matchingFile}:`, e.message);
    }
  }

  console.log('✨ Restoration Complete.');
}

main();
