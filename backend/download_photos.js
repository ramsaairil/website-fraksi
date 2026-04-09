const fs = require('fs');
const path = require('path');
const https = require('https');

const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const members = [
  { name: 'Eko', url: 'https://dprd.bandung.go.id/storage/profil/eko-kurnianto-w-s-t-m-pmat.jpg' },
  { name: 'Deni', url: 'https://dprd.bandung.go.id/storage/profil/h-deni-nursani-s-pd-i.jpg' },
  { name: 'Andri', url: 'https://dprd.bandung.go.id/storage/profil/h-andri-rusmana-s-pd-i-m-a-p.jpg' },
  { name: 'Siti', url: 'https://dprd.bandung.go.id/storage/profil/siti-marfuah-ss-s-pd-m-pd.jpg' },
  { name: 'Ahmad', url: 'https://dprd.bandung.go.id/storage/profil/ahmad-rahmat-purnama-a-md.jpg' },
  { name: 'Susi', url: 'https://dprd.bandung.go.id/storage/profil/drg-susi-sulastri.jpg' },
  { name: 'Elton', url: 'https://dprd.bandung.go.id/storage/profil/elton-agus-marjan-s-e.jpg' },
  { name: 'Agus', url: 'https://dprd.bandung.go.id/storage/profil/h-agus-andi-setyawan-s-pd-i.jpg' },
  { name: 'Asep', url: 'https://dprd.bandung.go.id/storage/profil/h-asep-mulyadi-s-h.jpg' },
  { name: 'Iman', url: 'https://dprd.bandung.go.id/storage/profil/h-iman-lestariyono-s-si-s-h.jpg' },
  { name: 'Susanto', url: 'https://dprd.bandung.go.id/storage/profil/susanto-triyogo-adiputro-s-st-m-t.jpg' }
];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        resolve(); // If fails to download (e.g. 404), just ignore
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log('Downloading fallback profile photos...');
  for (const m of members) {
    const filePath = path.join(uploadDir, `${m.name}_official.jpg`);
    if (!fs.existsSync(filePath)) {
      await downloadFile(m.url, filePath);
      console.log(`Downloaded ${m.name}`);
    } else {
      console.log(`${m.name} fallback photo already exists`);
    }
  }
}

run();
