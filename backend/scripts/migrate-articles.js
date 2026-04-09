const http = require('http');
const https = require('https');
const path = require('path');

// ==========================================
// DATA: 10 Artikel dari bandung.pks.id
// ==========================================
const articles = [
  {
    title: "Ketua DPRD Bandung Dorong Tahun Kedua Farhan Jadi Tahun Akselerasi",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-03-12T12:39:00.000Z",
    excerpt: "Ketua DPRD Kota Bandung Asep Mulyadi memberikan sejumlah rekomendasi strategis kepada Wali Kota Bandung Muhammad Farhan dalam memasuki tahun kedua masa kepemimpinannya.",
    content: `Ketua DPRD Kota Bandung Asep Mulyadi memberikan sejumlah rekomendasi strategis kepada Wali Kota Bandung Muhammad Farhan dalam memasuki tahun kedua masa kepemimpinannya. DPRD berharap pemerintah kota dapat lebih menitikberatkan pada pelaksanaan program secara teknis agar hasil pembangunan lebih terasa bagi masyarakat.\n\nAsep mengatakan, pada tahun kedua pemerintahan saat ini, pemerintah kota perlu menggeser fokus dari tahap perencanaan dan wacana menuju eksekusi program yang lebih konkret di lapangan.\n\n\u201cDi tahun kedua ini kami merekomendasikan agar wali kota lebih fokus pada eksekusi teknis daripada sekadar wacana, sehingga program yang dirancang dapat memberikan dampak nyata bagi masyarakat,\u201d ujarnya.\n\nSelain itu, DPRD juga menekankan pentingnya memperkuat sinergi antara pemerintah kota dan lembaga legislatif dalam penyusunan kebijakan maupun penganggaran.\n\nAsep berharap tahun kedua kepemimpinan Farhan dapat menjadi momentum percepatan pembangunan di Kota Bandung.\n\n\u201cKami ingin tahun kedua ini menjadi tahun akselerasi bagi Bandung yang lebih maju dan memberikan manfaat nyata bagi masyarakat,\u201d kata Asep.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVXg6n-05JESRhNxdeW6ASKo_HL5sxO5lHdhT55rZseTcRsLj1v3nwcye1THGIW4vE6IQHGuhI4ebkPeBLEfO7XK9jinpKai7VhjqOX6k2dXph20JQJQInkBSB7QH4i4EFCZPjJgTUFo5NezRuxbZ38jMWYIIsipVV9FTL2znMNgeufs7J_3jfkpLnn0c/s800/WALIKOTA-BANDUNG-FARHAN.jpg",
    imageFilename: "walikota-bandung-farhan.jpg"
  },
  {
    title: "DPRD Soroti Efektivitas APBD di Tahun Pertama Farhan",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-03-12T12:33:00.000Z",
    excerpt: "Ketua DPRD Kota Bandung Asep Mulyadi menyoroti efektivitas penggunaan APBD dalam satu tahun kepemimpinan Wali Kota Bandung Muhammad Farhan.",
    content: `Ketua DPRD Kota Bandung Asep Mulyadi menyoroti efektivitas penggunaan Anggaran Pendapatan dan Belanja Daerah (APBD) dalam satu tahun kepemimpinan Wali Kota Bandung Muhammad Farhan. Ia menilai pengelolaan anggaran daerah perlu terus dievaluasi agar benar-benar berpihak pada kepentingan masyarakat.\n\n\u201cSerapan yang tinggi tidak ada gunanya jika kualitas pekerjaannya rendah karena terburu-buru mengejar tenggat waktu,\u201d ujar Asep.\n\nDPRD mengingatkan agar alokasi anggaran daerah tetap berfokus pada kebutuhan dasar masyarakat yaitu sektor pendidikan, kesehatan, dan infrastruktur dasar.\n\nDPRD mendorong agar evaluasi program dilakukan secara menyeluruh sehingga setiap kegiatan yang dibiayai APBD benar-benar relevan dengan kebutuhan masyarakat serta arah pembangunan Kota Bandung ke depan.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5KlHylfnRl5uYcGfeWPmB7JRwCa7ZkWLb2PMqIYFDVBKhjYroiTDnha0hSRErVL7LRxRyfd8pMgEKcAIg4BFP1L3-LdKCQWdfnHTvFvPj7SeAjl9UmV1Q-BIo9EC-T6l3mWQO3ldLt31Ld8ZmtkwJJnlNJ9U-Zz2-Wllh_UeXH8Yg05tRkaQ-m1fyBbs/s800/kabel-jalan.jpg",
    imageFilename: "kabel-jalan.jpg"
  },
  {
    title: "Evaluasi DPRD, Belum Ada Terobosan Besar Atasi Macet, Banjir, dan Sampah di Bandung",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-03-12T12:06:00.000Z",
    excerpt: "Ketua DPRD Kota Bandung Asep Mulyadi menilai sejumlah persoalan klasik perkotaan masih menjadi tantangan utama dalam satu tahun kepemimpinan Wali Kota Bandung Muhammad Farhan.",
    content: `Ketua DPRD Kota Bandung Asep Mulyadi menilai sejumlah persoalan klasik perkotaan masih menjadi tantangan utama dalam satu tahun kepemimpinan Wali Kota Bandung Muhammad Farhan. Tiga isu yang menjadi perhatian utama adalah kemacetan, banjir, dan pengelolaan sampah.\n\n\u201cPemkot perlu lebih berani melakukan desentralisasi pengolahan sampah di tingkat kewilayahan, bukan hanya mengandalkan TPA,\u201d ujar Asep.\n\n\u201cUpaya memang sudah ada, tetapi belum terlihat terobosan yang bersifat game changer. Rakyat membutuhkan solusi yang terasa langsung dalam kehidupan sehari-hari,\u201d kata dia.\n\nDPRD juga mengingatkan agar lebih waspada terhadap potensi tekanan ekonomi dan mendorong penguatan ketahanan pangan kota melalui program urban farming yang lebih terintegrasi.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFcXgF_jdbZElkDa6fk7pukeIgMejBkOCeCwbyO18GqQHIqRUFYwJYdw9UzGPGVjNgFYXoL6hRibtWjudcOeW6nqWQAjD1T4mgZcKVDjL7VHtN6pelp2fLnpdYLK7OjiOBG84jYCi7hyIa572tCIMMRxzzPaVMTXTykgVoJbJu39syki8IAjFsW-yRo0c/s800/sampah_menumpuk.jpg",
    imageFilename: "sampah-menumpuk.jpg"
  },
  {
    title: "DPRD Nilai Setahun Kepemimpinan Farhan Erwin Belum Tunjukkan Dampak Signifikan",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-03-12T11:57:00.000Z",
    excerpt: "Ketua DPRD Kota Bandung Asep Mulyadi menyampaikan evaluasi terhadap satu tahun kepemimpinan Wali Kota Bandung Muhammad Farhan bersama Wakil Wali Kota Erwin.",
    content: `Ketua DPRD Kota Bandung Asep Mulyadi menyampaikan evaluasi terhadap satu tahun kepemimpinan Wali Kota Bandung Muhammad Farhan bersama Wakil Wali Kota Erwin. DPRD menilai pemerintahan saat ini telah menunjukkan iktikad baik dalam membangun komunikasi dengan berbagai pemangku kepentingan.\n\n\u201cKami tidak ingin pembangunan hanya bersifat seremonial. Target-target makro seperti pengurangan angka pengangguran dan kemiskinan harus menjadi kompas utama,\u201d katanya.\n\nDPRD menilai masih ada sejumlah sektor yang memerlukan percepatan, di antaranya pembangunan infrastruktur jalan serta penataan pasar tradisional.\n\n\u201cKami akan terus mengingatkan dan menagih janji-janji politik tersebut agar benar-benar diterjemahkan menjadi kebijakan nyata yang dirasakan manfaatnya oleh warga Kota Bandung,\u201d ujar Asep.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghli9O5oZ67oHscOAhQKoeD-PxIPVXeZdU5EXVE99tP6D_wzAtJxNteXU4ZxzcByAkdIsBeUn7D0mSuYIRxE-kfOTQBO8Y_L7DPTGq6X_6SbqH29FY83MergqolY-Ql2_jtbh0s9qjDiqH6vbZ_jgQYk2wK4nTLMo7CLSb5gH6HfCW5GxEoNvrbpfkTIo/s800/1740110499-jumat2.jpeg",
    imageFilename: "dprd-setahun-farhan.jpeg"
  },
  {
    title: "Tragedi Bantargebang, Fraksi PKS DPRD Bandung Dorong Reformasi Pengelolaan Sampah",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-03-09T14:18:00.000Z",
    excerpt: "Ketua Fraksi PKS DPRD Kota Bandung, Eko Kurnianto, menyampaikan duka cita mendalam atas peristiwa longsor sampah di TPST Bantargebang.",
    content: `Ketua Fraksi PKS DPRD Kota Bandung, Eko Kurnianto, menyampaikan duka cita mendalam atas peristiwa longsor sampah yang terjadi di TPST Bantargebang dan menimbulkan korban jiwa.\n\n\u201cKondisi ini menunjukkan bahwa model pengelolaan sampah yang terlalu bertumpu pada penimbunan di TPA memiliki keterbatasan,\u201d ujar Eko, Senin (9/3/2026).\n\nFraksi PKS mendorong beberapa langkah strategis: memperkuat kebijakan pengurangan sampah dari sumber, mempercepat pengembangan teknologi pengolahan sampah, melakukan evaluasi menyeluruh, dan memperkuat kolaborasi antar pemangku kepentingan.\n\n\u201cPeristiwa di Bantargebang harus menjadi pelajaran bagi semua kota, termasuk Bandung, agar transformasi sistem pengelolaan sampah dapat dilakukan lebih cepat dan lebih terarah,\u201d katanya.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgiTqI30jUS6GH_1nhRCq5Gl7lJiSBJ4LnvbNYTOOK3WY0dfdQgifMTkaA7PLBhtjZ0sTUTTeW3fOkJOGLdJ2H7DbG515C5skSO6JwtUlSXpi6451C3c2Aayn-WJIN9_-DBs5PTrcJi6kna8-79Bn3oyVl5LKszoqN3WBidjkfVLVN6jPkE3eO5UVXT77Y/s800/6957abdf7fb7d.jpg",
    imageFilename: "tragedi-bantargebang.jpg"
  },
  {
    title: "Bandung Siapkan Grand Design Kependudukan 20 Tahun, Soroti TFR 1,83 dan Ancaman Ageing City",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-03-03T14:23:00.000Z",
    excerpt: "Rencana Peraturan Daerah Grand Design Pembangunan Kependudukan (GDPK) kota Bandung saat ini masih tahap fasilitasi di provinsi Jawa Barat.",
    content: `Rencana Peraturan Daerah Grand Design Pembangunan Kependudukan (GDPK) kota Bandung saat ini masih tahap fasilitasi di provinsi Jawa Barat. Anggota pansus 11, Eko Kurnianto menyampaikan dalam waktu dekat ini pihaknya menunggu hasil dari fasilitasi tersebut.\n\nEko menjabarkan bahwa GDPK ini perencanaan besar pembangunan kependudukan kota Bandung 20 tahun kedepan yang meliputi kebijakan jumlah penduduk, mobilitas, kualitas kependudukan, ketahanan keluarga dan administrasi kependudukan.\n\nKota Bandung saat ini aging city. TFR kota Bandung 1,83 padahal idealnya 2.\n\n\u201cJadi GDPK itu dua puluh tahun makanya yang mendesak untuk segera dijabarkan adalah peta jalan lima tahun oleh dinas-dinas sehingga visi kependudukan 20 tahun kedepan bisa tercapai,\u201d tutupnya.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9sJv-7q5LHCkoEGyLtQuAbHHALk2TGtmiXh5kAT0BJQbAIF2LS9vO1Mg7rpHJpKOqLn0fTGtFES-6CjLITRg7o1aDmbtmxd5LT5oUJEatppNuaSTt90PzJRem0cZ6tslZpqL1lQUT0S7pwU7ctwWqHUyDLgHIuLP9W3NSrd0lseAkZ6rmCTGQ3qb_jz4/s800/grand-design-kependudukan.jpg",
    imageFilename: "grand-design-kependudukan.jpg"
  },
  {
    title: "Bandung Perkuat Edukasi Gaya Hidup Sehat dari Sekolah, Kampanye GGL Dimulai",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-03-03T14:19:00.000Z",
    excerpt: "Pemkot Bandung bersama IAKMI memperkuat upaya pencegahan penyakit tidak menular dengan kampanye pola makan sehat bagi pelajar melalui gerakan Ayo Kurangi GGL.",
    content: `Pemkot Bandung bersama Ikatan Ahli Kesehatan Masyarakat Indonesia (IAKMI) memperkuat upaya pencegahan penyakit tidak menular dengan kampanye pola makan sehat bagi pelajar.\n\n\u201cGerakan ini fokus pada anak-anak sekolah. Dari sinilah pendidikan kesehatan dimulai agar mereka tumbuh dengan kesadaran menjalani gaya hidup sehat sejak dini,\u201d ujar Farhan, Senin (2/3/2026).\n\nKetua DPRD Kota Bandung, Asep Mulyadi mengapresiasi langkah ini. \u201cApa yang kita lakukan hari ini akan berpengaruh besar dalam 20 sampai 30 tahun ke depan,\u201d kata Asep.\n\n\u201cTidak cukup hanya sosialisasi. Harus ada pengaturan terhadap makanan dengan kandungan gula dan garam tinggi agar lingkungan sekolah benar-benar mendukung pola hidup sehat,\u201d tegas Asep Mulyadi.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiuAOWCi1T0Y0sDBMjURVhR8ih1LWQdx8s6jHTPgLX4yE94W-St0t0BHrYmotkp_be6gygivcB_m9BqD2bVtLvSQp8W0Q377IRwdZkUUTw683HMK8d-KVkKPtkMq9Sisu8NNhOjIGu_BihUA1yDkhSMMEDiKEY-KH2H9KSLb4yf46ljd4Ux7Jmg5r7Pktw/s800/kampanye-ggl.jpg",
    imageFilename: "kampanye-ggl.jpg"
  },
  {
    title: "DPRD Matangkan Raperda Trantibum Kota Bandung",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-03-02T14:14:00.000Z",
    excerpt: "DPRD Kota Bandung sedang membahas Raperda tentang Penyelenggaraan Ketertiban Umum, Ketentraman, dan Perlindungan Masyarakat.",
    content: `DPRD Kota Bandung sedang membahas Rancangan Peraturan Daerah (Raperda) tentang Penyelenggaraan Ketertiban Umum, Ketentraman, dan Perlindungan Masyarakat.\n\nAnggota Pansus 13 Andri Rusmana mengatakan substansi materi terdiri atas 63 pasal dalam 18 bab.\n\n\u201cSaat ini kami fokus mendalami substansi materi. Beberapa aspek sudah kami bahas, seperti tertib jalan dan angkutan jalan, tertib sosial, serta tertib kesehatan,\u201d ujarnya, Senin (2/3/2026).\n\n\u201cWalaupun cakupan materinya luas, kami berkomitmen menyusun regulasi yang tidak hanya tegas dalam penegakan, tetapi juga menjamin perlindungan masyarakat dan keadilan sosial,\u201d tegasnya.\n\n\u201cKami ingin perda ini benar-benar menjadi solusi atas persoalan ketertiban umum di Kota Bandung secara menyeluruh,\u201d pungkasnya.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6HUr0I7D49YztTF1xRNu0n728Rf6yLsrxYCsIvocmzcdqsuWo31O5GIrlxfpMWHaytgqrGdGEqshq2x0DTwW3gEOAZBR-x1OA7JdhFLEViEvadpkaDVL_jcQ_xfLDnyuTNav9FnI7WfGX-DYxCCvETz7Nn549MCzox3DL9cgmRRq2_k5WHARKqU9QOCQ/s800/andri.jpg",
    imageFilename: "andri-rusmana.jpg"
  },
  {
    title: "Raperda Kesejahteraan Sosial Kota Bandung Berubah Total, Pansus 12 Siapkan Perda Baru",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-02-28T14:01:00.000Z",
    excerpt: "DPRD Kota Bandung melalui Pansus 12 tengah memfasilitasi Raperda tentang Penyelenggaraan dan Penanganan Kesejahteraan Sosial ke Pemerintah Provinsi Jawa Barat.",
    content: `DPRD Kota Bandung melalui Panitia Khusus (Pansus) 12 tengah memfasilitasi Rancangan Peraturan Daerah (Raperda) tentang Penyelenggaraan dan Penanganan Kesejahteraan Sosial.\n\n\u201cKarena perubahan sudah di atas 50 persen, maka disepakati perda lama dicabut dan diganti dengan perda yang baru,\u201d ujar Ketua Pansus 12, Iman Lestariyono.\n\nTiga poin utama: penguatan LKS, pengaturan PUB, serta Undian Gratis Berhadiah (UGB).\n\nPansus 12 juga melakukan studi banding ke Jakarta, termasuk ke Kementerian Sosial Republik Indonesia.\n\n\u201cMudah-mudahan tidak lebih dari satu bulan sudah bisa disahkan,\u201d pungkas Iman.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgwqnzTRG379i1bmfZksHVlb-CFYCnsYK-bmMdxNm6_KPbYMLSkWxI6AhBlzGTgpQ1jrUwvpVm12FCi0E2vzXF96j4NYoOOn9m1OZS9w8J-p5BvI0ngQfNqciXT0m06KRipBToueMhEzq9FLJCdtyqsP36c_GHM9mR8yXkPKNVR8ZJ-Vz7P7N2-dts2SQ4/s800/raperda-kessos.jpg",
    imageFilename: "raperda-kessos.jpg"
  },
  {
    title: "Pansus 12 DPRD Kota Bandung Rampungkan Raperda Penyelenggaraan Kesejahteraan Sosial",
    author: "Ahmad Farid Fakhrullah",
    date: "2026-02-25T12:10:00.000Z",
    excerpt: "Panitia Khusus (Pansus) 12 DPRD Kota Bandung telah merampungkan pembahasan Raperda tentang Penyelenggaraan Kesejahteraan Sosial.",
    content: `Panitia Khusus (Pansus) 12 DPRD Kota Bandung telah merampungkan pembahasan Rancangan Peraturan Daerah (Raperda) tentang Penyelenggaraan Kesejahteraan Sosial.\n\nAnggota Pansus 12, Susanto Triyogo Adiputro mengatakan secara substansi pembahasan telah selesai, tinggal menunggu tahapan harmonisasi dan evaluasi.\n\nRaperda ini memiliki ruang lingkup komprehensif mencakup tanggung jawab pemerintah daerah, penyelenggaraan kesejahteraan sosial, kelembagaan LKS, pengaturan PUB, UGB, perizinan, pembinaan, pengawasan, dan pembiayaan.\n\n\u201cRegulasi ini diharapkan mampu menciptakan tata kelola penyelenggaraan kesejahteraan sosial yang lebih tertib, transparan, dan akuntabel,\u201d pungkasnya.`,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEguw3j0xdOahXAHK7x7I86BB8Fv7V7l_inalin5ALdqV7hiPjwoODSU9YpncyewVQMBfP-KiyXwGmk3Axt8RfFakij0z1Qjc54dv0ypB2sD4iHquzx4LVD0cVvjk_5G8af04XePVHnmhsKf14_mJcI_yLbo9L9GccHLxz1staJqn8lsUoJ4gDlF_WgW4VM/s800/pansus-12-kessos.jpg",
    imageFilename: "pansus-12-kessos.jpg"
  }
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Download failed: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function httpRequest(method, reqPath, data, token) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = {
      hostname: 'localhost',
      port: 1337,
      path: reqPath,
      method: method,
      headers: headers,
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

function uploadImage(fileBuffer, filename, token) {
  return new Promise((resolve, reject) => {
    const boundary = '----FormBoundary' + Date.now().toString(16);
    const ext = path.extname(filename).toLowerCase();
    const mimeMap = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
    const mime = mimeMap[ext] || 'image/jpeg';

    const header = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${filename}"\r\nContent-Type: ${mime}\r\n\r\n`
    );
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([header, fileBuffer, footer]);

    const req = http.request({
      hostname: 'localhost',
      port: 1337,
      path: '/upload',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
        'Authorization': `Bearer ${token}`,
      },
    }, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(responseBody) });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseBody });
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ==========================================
// MAIN
// ==========================================
async function main() {
  console.log('============================================');
  console.log('  Migrasi Artikel + Gambar ke Strapi');
  console.log('  Sumber: bandung.pks.id');
  console.log('============================================\n');

  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('Usage: node migrate-articles.js <email> <password>');
    process.exit(1);
  }

  // 1. Login
  console.log('🔐 Login ke Strapi Admin...');
  const loginRes = await httpRequest('POST', '/admin/login', { email, password });
  if (loginRes.status !== 200) {
    console.error('❌ Login gagal:', loginRes.data);
    process.exit(1);
  }
  const token = loginRes.data.data.token;
  console.log('✅ Login berhasil!\n');

  const CM_BASE = '/content-manager/collection-types/api::article.article';
  let success = 0;
  let failed = 0;

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`[${i + 1}/${articles.length}] ${a.title.substring(0, 65)}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    // 2. Download gambar
    let fileId = null;
    if (a.imageUrl) {
      console.log(`   📥 Download gambar...`);
      try {
        const imageBuffer = await downloadImage(a.imageUrl);
        console.log(`      Berhasil (${(imageBuffer.length / 1024).toFixed(1)} KB)`);

        // 3. Upload gambar ke Strapi
        console.log(`   📤 Upload gambar ke Strapi...`);
        const uploadRes = await uploadImage(imageBuffer, a.imageFilename, token);

        if (uploadRes.status === 200 || uploadRes.status === 201) {
          const files = Array.isArray(uploadRes.data) ? uploadRes.data : [uploadRes.data];
          fileId = files[0]?.id;
          console.log(`      ✅ Upload berhasil (fileId: ${fileId})`);
        } else {
          console.log(`      ⚠️  Upload gagal (${uploadRes.status}), lanjut tanpa gambar`);
        }
      } catch (e) {
        console.log(`      ⚠️  Gagal download: ${e.message}, lanjut tanpa gambar`);
      }
    }

    // 4. Buat artikel
    console.log(`   📝 Buat artikel...`);
    const payload = {
      title: a.title,
      content: a.content,
      excerpt: a.excerpt,
      author: a.author,
      date: a.date,
    };
    if (fileId) payload.image = fileId;

    try {
      const res = await httpRequest('POST', CM_BASE, payload, token);

      if (res.status === 200 || res.status === 201) {
        const docId = res.data?.data?.documentId || res.data?.documentId;
        console.log(`      ✅ Artikel dibuat (documentId: ${docId})`);

        // 5. Publish artikel
        if (docId) {
          console.log(`   🚀 Publish artikel...`);
          const pubRes = await httpRequest(
            'POST',
            `${CM_BASE}/${docId}/actions/publish`,
            { documentId: docId },
            token
          );
          if (pubRes.status === 200) {
            console.log(`      ✅ Artikel dipublish`);
          } else {
            console.log(`      ⚠️  Publish status: ${pubRes.status}`);
          }
        }
        success++;
      } else {
        console.log(`      ❌ Gagal (${res.status}): ${JSON.stringify(res.data?.error || res.data).substring(0, 150)}`);
        failed++;
      }
    } catch (e) {
      console.log(`      ❌ Error: ${e.message}`);
      failed++;
    }

    console.log('');
  }

  console.log(`============================================`);
  console.log(`  Migrasi selesai!`);
  console.log(`  ✅ Berhasil: ${success}`);
  console.log(`  ❌ Gagal:    ${failed}`);
  console.log(`============================================`);
}

main().catch(console.error);
