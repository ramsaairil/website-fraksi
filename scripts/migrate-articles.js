/**
 * Script migrasi 10 berita dari bandung.pks.id ke Strapi
 * Jalankan: node scripts/migrate-articles.js
 */

const STRAPI_URL = 'http://localhost:1337';

// Data 10 artikel yang di-scrape dari bandung.pks.id
const articles = [
  {
    title: "Pansus 12 DPRD Kota Bandung Rampungkan Raperda Penyelenggaraan Kesejahteraan Sosial",
    content: `Panitia Khusus (Pansus) 12 DPRD Kota Bandung telah merampungkan pembahasan Rancangan Peraturan Daerah (Raperda) tentang Penyelenggaraan Kesejahteraan Sosial.\n\nSaat ini, proses regulasi tersebut memasuki tahap konsultasi ke kementerian terkait serta evaluasi di Kementerian Hukum dan HAM (Kemenkumham).\n\nAnggota Pansus 12 DPRD Kota Bandung, Susanto Triyogo Adiputro mengatakan, secara substansi pembahasan telah selesai, tinggal menunggu tahapan harmonisasi dan evaluasi sebelum ditetapkan menjadi Peraturan Daerah (Perda).\n\n"Alhamdulillah secara pembahasan sudah selesai. Tinggal proses konsultasi ke kementerian dan selanjutnya evaluasi di Kemenkumham," ujarnya.\n\nMenurut Susanto Raperda ini memiliki ruang lingkup yang komprehensif, mencakup tanggung jawab dan wewenang pemerintah daerah, penyelenggaraan kesejahteraan sosial, kelembagaan Lembaga Kesejahteraan Sosial (LKS), pengaturan Pengumpulan Uang dan Barang (PUB), Undian Gratis Berhadiah (UGB), perizinan, sistem informasi, pembinaan, pengawasan, pemantauan, evaluasi hingga pembiayaan.\n\n"Regulasi ini disusun sebagai turunan dari sejumlah Peraturan Menteri Sosial (Permensos) terbaru agar implementasi di daerah memiliki dasar hukum yang kuat dan selaras dengan ketentuan nasional," ungkapnya.\n\nPolitisi PKS ini menjelaskan, untuk Lembaga Kesejahteraan Sosial (LKS), pengaturan dalam Raperda ini merupakan turunan dari Permensos Nomor 5 Tahun 2024. Fokus utamanya adalah penguatan pola monitoring dan evaluasi oleh Dinas Sosial di daerah terhadap operasional dan tata kelola LKS.\n\n"Regulasi ini diharapkan mampu menciptakan tata kelola penyelenggaraan kesejahteraan sosial yang lebih tertib, transparan, dan akuntabel, sekaligus melindungi kepentingan masyarakat," pungkasnya.`,
    excerpt: "Pansus 12 DPRD Kota Bandung telah merampungkan pembahasan Raperda tentang Penyelenggaraan Kesejahteraan Sosial. Proses regulasi kini memasuki tahap konsultasi ke kementerian terkait.",
    createdAt: "2026-02-25T12:10:00.000Z",
  },
  {
    title: "Raperda Kesejahteraan Sosial Kota Bandung Berubah Total, Pansus 12 Siapkan Perda Baru",
    content: `DPRD Kota Bandung melalui Panitia Khusus (Pansus) 12 tengah memfasilitasi Rancangan Peraturan Daerah (Raperda) tentang Penyelenggaraan dan Penanganan Kesejahteraan Sosial ke Pemerintah Provinsi Jawa Barat. Fasilitasi ini menjadi tahapan penting sebelum raperda tersebut disahkan menjadi peraturan daerah (perda).\n\nKetua Pansus 12, Iman Lestariyono menjelaskan, awalnya pembahasan hanya difokuskan pada perubahan kedua atas Peraturan Daerah Kota Bandung Nomor 24 Tahun 2012. Namun dalam perkembangannya, substansi yang harus diubah ternyata mencapai lebih dari 50 persen.\n\n"Karena perubahan sudah di atas 50 persen, maka disepakati perda lama dicabut dan diganti dengan perda yang baru. Ini bukan sekadar revisi, tetapi pembentukan regulasi baru," ujarnya.\n\nAda tiga poin utama yang menjadi fokus pembahasan dalam raperda tersebut. Pertama, penguatan dan pengaturan Lembaga Kesejahteraan Sosial (LKS). Kedua, pengaturan terkait Pengumpulan Uang dan Barang (PUB), serta ketiga mengenai Undian Gratis Berhadiah (UGB).\n\nSaat ini, raperda tersebut masih dalam tahap fasilitasi di tingkat provinsi. Pansus 12 menargetkan dalam waktu satu bulan ke depan regulasi tersebut sudah dapat disahkan dalam rapat paripurna.\n\n"Mudah-mudahan tidak lebih dari satu bulan sudah bisa disahkan," pungkas Iman.`,
    excerpt: "DPRD Kota Bandung melalui Pansus 12 memfasilitasi Raperda Kesejahteraan Sosial yang berubah total karena perubahan substansi melebihi 50 persen dari perda lama.",
    createdAt: "2026-02-28T09:00:00.000Z",
  },
  {
    title: "DPRD Matangkan Raperda Trantibum Kota Bandung",
    content: `DPRD Kota Bandung sedang membahas Rancangan Peraturan Daerah (Raperda) tentang Penyelenggaraan Ketertiban Umum, Ketentraman, dan Perlindungan Masyarakat. Regulasi ini disiapkan untuk memperkuat tata kelola kota supaya lebih tertib dan aman demi kebutuhan warga.\n\nPembahasan Raperda dipimpin langsung Panitia Khusus (Pansus) 13 DPRD Kota Bandung. Anggota Pansus 13 Andri Rusmana mengatakan, pembahasan Raperda ini sudah dilakukan bertahap dan intensif bersama sejumlah organisasi perangkat daerah (OPD).\n\n"Saat ini kami fokus mendalami substansi materi yang terdiri atas 63 pasal dalam 18 bab. Beberapa aspek sudah kami bahas, seperti tertib jalan dan angkutan jalan, tertib sosial, serta tertib kesehatan," ujarnya, Senin (2/3/2026).\n\nPembahasan turut melibatkan Satpol PP, Dinas Sosial, Dinas Kesehatan, DPMPTSP, Dinas Perdagangan dan Industri, Disbudpar, Bagian Hukum, serta tim penyusun naskah akademik.\n\n"Kami ingin perda ini benar-benar menjadi solusi atas persoalan ketertiban umum di Kota Bandung secara menyeluruh," pungkasnya.`,
    excerpt: "DPRD Kota Bandung membahas Raperda Ketertiban Umum dengan 63 pasal dalam 18 bab untuk memperkuat tata kelola kota yang lebih tertib dan aman.",
    createdAt: "2026-03-02T10:00:00.000Z",
  },
  {
    title: "Bandung Perkuat Edukasi Gaya Hidup Sehat dari Sekolah, Kampanye GGL Dimulai",
    content: `Pemerintah Kota (Pemkot) Bandung bersama Ikatan Ahli Kesehatan Masyarakat Indonesia (IAKMI) memperkuat upaya pencegahan penyakit tidak menular dengan menggelar kampanye pola makan sehat bagi pelajar melalui gerakan Ayo Kurangi Gula, Garam dan Lemak (GGL), agar Hidup Sehat, Kuat dan Pintar.\n\nProgram yang menargetkan anak-anak sekolah menjadi kelompok prioritas edukasi kesehatan. Pemkot Bandung menilai pembentukan kebiasaan makan sehat sejak usia dini menjadi langkah strategis untuk menekan risiko penyakit, diabetes, hipertensi, hingga obesitas di masa depan.\n\nWali Kota Bandung, Muhammad Farhan mengatakan kampanye pengurangan konsumsi gula, garam, dan lemak merupakan bagian dari pendekatan preventif pemerintah dalam membangun budaya hidup sehat masyarakat kota.\n\n"Gerakan ini fokus pada anak-anak sekolah. Dari sinilah pendidikan kesehatan dimulai agar mereka tumbuh dengan kesadaran menjalani gaya hidup sehat sejak dini," ujar Farhan saat ditemui usai kegiatan, Senin (2/3/2026).\n\nKetua DPRD Kota Bandung, Asep Mulyadi mengapresiasi langkah Pemkot Bandung yang mulai menaruh perhatian serius pada edukasi konsumsi pangan sehat bagi generasi muda.\n\n"Apa yang kita lakukan hari ini akan berpengaruh besar dalam 20 sampai 30 tahun ke depan, terutama terhadap kualitas kesehatan masyarakat," kata Asep.`,
    excerpt: "Pemkot Bandung bersama IAKMI menggelar kampanye Ayo Kurangi Gula, Garam dan Lemak (GGL) bagi pelajar untuk membangun budaya hidup sehat sejak dini.",
    createdAt: "2026-03-03T08:30:00.000Z",
  },
  {
    title: "Bandung Siapkan Grand Design Kependudukan 20 Tahun, Soroti TFR 1,83 dan Ancaman Ageing City",
    content: `Rencana Peraturan Daerah Grand Design Pembangunan Kependudukan (GDPK) kota Bandung saat ini masih tahap fasilitasi di provinsi Jawa Barat.\n\nAnggota pansus 11, Eko Kurnianto menyampaikan dalam waktu dekat ini pihaknya menunggu hasil dari fasilitasi tersebut.\n\n"Nanti kita menyesuaikan dari fasilitasi itu, ada koreksi atau tidak. Kalau tidak ada bisa maju disahkan, kalau ada koreksi ada pembahasan di pansus," jelasnya.\n\nEko menjabarkan bahwa GDPK ini perencanaan besar pembangunan kependudukan kota Bandung 20 tahun kedepan mirip dengan RPJP kota Bandung tapi khusus atau fokus di bidang Kependudukan yang meliputi pembahasan kebijakan jumlah penduduk, mobilitas atau sebaran penduduk, kebijakan meningkatkan kualitas kependudukan, ketahanan keluarga dan administrasi kependudukan.\n\nPertama desain kependudukan seperti apa kedepan, karena kota Bandung saat ini aging city atau penduduknya lebih banyak orang tua daripada anak muda.\n\n"Kalau tingkat kelahiran rendah maka satu masa seperti negara Jepang, Bandung diisi orang tua. Hari ini TFR (total fertility rate) kota Bandung 1,83 padahal idealnya 2," paparnya.\n\n"Jadi kan GDPK itu dua puluh tahun makanya yang mendesak untuk segera dijabarkan adalah peta jalan lima tahun, road map per lima tahun oleh dinas-dinas sehingga visi kependudukan 20 tahun kedepan bisa tercapai," tutupnya.`,
    excerpt: "Kota Bandung menyiapkan Grand Design Pembangunan Kependudukan 20 tahun ke depan, menyoroti TFR 1,83 dan ancaman aging city.",
    createdAt: "2026-03-05T11:00:00.000Z",
  },
  {
    title: "Tragedi Bantargebang, Fraksi PKS DPRD Bandung Dorong Reformasi Pengelolaan Sampah",
    content: `Ketua Fraksi PKS DPRD Kota Bandung, Eko Kurnianto, menyampaikan duka cita mendalam atas peristiwa longsor sampah yang terjadi di TPST Bantargebang dan menimbulkan korban jiwa. Menurutnya, kejadian tersebut menjadi pengingat penting bahwa persoalan pengelolaan sampah di kota-kota besar tidak hanya berkaitan dengan isu lingkungan, tetapi juga menyangkut keselamatan manusia.\n\nEko menilai, peristiwa tersebut harus menjadi refleksi bagi berbagai daerah, termasuk Kota Bandung, untuk terus memperbaiki sistem pengelolaan sampah yang ada.\n\n"Kondisi ini menunjukkan bahwa model pengelolaan sampah yang terlalu bertumpu pada penimbunan di TPA memiliki keterbatasan. Karena itu perlu ada transformasi kebijakan yang lebih sistematis dalam pengelolaan sampah," ujar Eko, Senin (9/3/2026).\n\nFraksi PKS mendorong beberapa langkah strategis:\n\nPertama, memperkuat kebijakan pengurangan sampah dari sumber dengan memastikan program pemilahan sampah berjalan efektif di tingkat RW.\n\nKedua, mempercepat pengembangan teknologi pengolahan sampah di tingkat kota.\n\nKetiga, melakukan evaluasi menyeluruh terhadap sistem pengelolaan sampah Kota Bandung.\n\nKeempat, memperkuat kolaborasi antara pemerintah daerah, DPRD, sektor swasta, komunitas lingkungan, serta masyarakat.\n\n"Peristiwa di Bantargebang harus menjadi pelajaran bagi semua kota, termasuk Bandung, agar transformasi sistem pengelolaan sampah dapat dilakukan lebih cepat dan lebih terarah," katanya.`,
    excerpt: "Fraksi PKS DPRD Bandung mendorong reformasi pengelolaan sampah pasca tragedi longsor sampah di Bantargebang, menekankan pentingnya transformasi dari sistem kumpul-angkut-buang.",
    createdAt: "2026-03-09T14:00:00.000Z",
  },
  {
    title: "DPRD Nilai Setahun Kepemimpinan Farhan Erwin Belum Tunjukkan Dampak Signifikan",
    content: `Ketua DPRD Kota Bandung Asep Mulyadi menyampaikan evaluasi terhadap satu tahun kepemimpinan Wali Kota Bandung Muhammad Farhan bersama Wakil Wali Kota Erwin. DPRD menilai pemerintahan saat ini telah menunjukkan iktikad baik dalam membangun komunikasi dengan berbagai pemangku kepentingan, meskipun dampak kebijakan belum sepenuhnya dirasakan secara luas oleh masyarakat.\n\n"Secara umum kami melihat ada niat baik dari pemerintah kota dalam membangun komunikasi dengan berbagai stakeholder. Namun satu tahun ini masih dalam tahap transisi dan penyesuaian ritme kerja birokrasi, sehingga hasilnya belum terlihat secara masif di lapisan masyarakat," ujar Asep.\n\nDPRD juga menekankan agar realisasi program pembangunan tetap mengacu pada dokumen perencanaan yang telah disepakati bersama, khususnya RPJMD.\n\n"Kami tidak ingin pembangunan hanya bersifat seremonial. Target-target makro seperti pengurangan angka pengangguran dan kemiskinan harus menjadi kompas utama dalam menjalankan program pembangunan," katanya.\n\n"Kami akan terus mengingatkan dan menagih janji-janji politik tersebut agar tidak sekadar menjadi retorika saat kampanye, tetapi benar-benar diterjemahkan menjadi kebijakan nyata yang dirasakan manfaatnya oleh warga Kota Bandung," ujar Asep.`,
    excerpt: "DPRD menilai satu tahun kepemimpinan Farhan-Erwin masih dalam fase transisi. Dampak kebijakan belum dirasakan luas oleh masyarakat.",
    createdAt: "2026-03-15T09:00:00.000Z",
  },
  {
    title: "Evaluasi DPRD, Belum Ada Terobosan Besar Atasi Macet, Banjir, dan Sampah di Bandung",
    content: `Ketua DPRD Kota Bandung Asep Mulyadi menilai sejumlah persoalan klasik perkotaan masih menjadi tantangan utama dalam satu tahun kepemimpinan Wali Kota Bandung Muhammad Farhan. Tiga isu yang menjadi perhatian utama adalah kemacetan, banjir, dan pengelolaan sampah yang dinilai belum sepenuhnya tertangani secara tuntas.\n\nAsep menyebut tiga persoalan tersebut sebagai "tiga dosa besar" yang selama ini membayangi kualitas hidup warga Kota Bandung.\n\n"Pemkot perlu lebih berani melakukan desentralisasi pengolahan sampah di tingkat kewilayahan, bukan hanya mengandalkan TPA. Dengan begitu, volume sampah yang dibuang ke TPA bisa berkurang secara signifikan," ujar Asep.\n\n"Upaya memang sudah ada, tetapi belum terlihat terobosan yang bersifat game changer. Rakyat membutuhkan solusi yang terasa langsung dalam kehidupan sehari-hari," kata dia.\n\nDPRD juga mengingatkan Pemerintah Kota Bandung agar lebih waspada terhadap potensi tekanan ekonomi terkait fluktuasi harga pangan global yang dapat memicu inflasi di tingkat lokal. DPRD mendorong penguatan ketahanan pangan kota melalui program urban farming yang lebih terintegrasi.`,
    excerpt: "Ketua DPRD menyoroti kemacetan, banjir, dan sampah sebagai 'tiga dosa besar' Bandung yang belum tertangani tuntas di tahun pertama kepemimpinan Farhan.",
    createdAt: "2026-03-18T10:30:00.000Z",
  },
  {
    title: "DPRD Soroti Efektivitas APBD di Tahun Pertama Farhan",
    content: `Ketua DPRD Kota Bandung Asep Mulyadi menyoroti efektivitas penggunaan Anggaran Pendapatan dan Belanja Daerah (APBD) dalam satu tahun kepemimpinan Wali Kota Bandung Muhammad Farhan. Ia menilai pengelolaan anggaran daerah perlu terus dievaluasi agar benar-benar berpihak pada kepentingan masyarakat.\n\n"Serapan yang tinggi tidak ada gunanya jika kualitas pekerjaannya rendah karena terburu-buru mengejar tenggat waktu," ujar Asep.\n\nDPRD mengingatkan agar alokasi anggaran daerah tetap berfokus pada kebutuhan dasar masyarakat dengan tiga pilar utama: pendidikan, kesehatan, dan infrastruktur dasar.\n\nPada sektor pendidikan, DPRD mendorong penambahan ruang kelas maupun pembangunan sekolah baru. Di sektor kesehatan, pemerintah kota diminta memastikan layanan rumah sakit dapat diakses tanpa hambatan administratif. Pembangunan infrastruktur dasar seperti jalan dan fasilitas publik juga harus tetap menjadi perhatian utama.\n\nDPRD mendorong agar evaluasi program dilakukan secara menyeluruh sehingga setiap kegiatan yang dibiayai APBD benar-benar relevan dengan kebutuhan masyarakat serta arah pembangunan Kota Bandung ke depan.`,
    excerpt: "DPRD menyoroti efektivitas penggunaan APBD Kota Bandung dan mendorong fokus anggaran pada tiga pilar utama: pendidikan, kesehatan, dan infrastruktur dasar.",
    createdAt: "2026-03-22T08:00:00.000Z",
  },
  {
    title: "Ketua DPRD Bandung Dorong Tahun Kedua Farhan Jadi Tahun Akselerasi",
    content: `Ketua DPRD Kota Bandung Asep Mulyadi memberikan sejumlah rekomendasi strategis kepada Wali Kota Bandung Muhammad Farhan dalam memasuki tahun kedua masa kepemimpinannya. DPRD berharap pemerintah kota dapat lebih menitikberatkan pada pelaksanaan program secara teknis agar hasil pembangunan lebih terasa bagi masyarakat.\n\nAsep mengatakan, pada tahun kedua pemerintahan saat ini, pemerintah kota perlu menggeser fokus dari tahap perencanaan dan wacana menuju eksekusi program yang lebih konkret di lapangan.\n\n"Di tahun kedua ini kami merekomendasikan agar wali kota lebih fokus pada eksekusi teknis daripada sekadar wacana, sehingga program yang dirancang dapat memberikan dampak nyata bagi masyarakat," ujarnya.\n\nSelain itu, DPRD juga menekankan pentingnya memperkuat sinergi antara pemerintah kota dan lembaga legislatif dalam penyusunan kebijakan maupun penganggaran.\n\nIa menilai hambatan anggaran tidak seharusnya menjadi alasan klasik yang menghambat realisasi program pembangunan.\n\n"Kami ingin tahun kedua ini menjadi tahun akselerasi bagi Bandung yang lebih maju dan memberikan manfaat nyata bagi masyarakat," kata Asep.`,
    excerpt: "Ketua DPRD Bandung merekomendasikan Wali Kota Farhan untuk fokus pada eksekusi teknis di tahun kedua agar pembangunan lebih terasa bagi masyarakat.",
    createdAt: "2026-03-27T09:30:00.000Z",
  },
];

async function createArticle(articleData) {
  const response = await fetch(`${STRAPI_URL}/api/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        title: articleData.title,
        content: articleData.content,
        excerpt: articleData.excerpt,
        createdAt: articleData.createdAt,
        publishedAt: articleData.createdAt,
      }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to create "${articleData.title}": ${response.status} - ${err}`);
  }

  return await response.json();
}

async function main() {
  console.log('=== Migrasi 10 Berita dari bandung.pks.id ke Strapi ===\n');

  // Check Strapi connection
  try {
    const check = await fetch(`${STRAPI_URL}/api/articles`);
    if (!check.ok) throw new Error(`Strapi API returned ${check.status}`);
    console.log('✓ Strapi backend connected\n');
  } catch (e) {
    console.error('✗ Cannot connect to Strapi at', STRAPI_URL);
    console.error('  Make sure Strapi is running: npm run dev (in backend folder)');
    process.exit(1);
  }

  let success = 0;
  let failed = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const date = new Date(article.createdAt).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    try {
      const result = await createArticle(article);
      const id = result?.data?.id || result?.data?.documentId || '?';
      console.log(`✓ [${i + 1}/10] ${article.title}`);
      console.log(`  ID: ${id} | Tanggal: ${date}\n`);
      success++;
    } catch (e) {
      console.error(`✗ [${i + 1}/10] ${article.title}`);
      console.error(`  Error: ${e.message}\n`);
      failed++;
    }
  }

  console.log('=== Selesai ===');
  console.log(`Berhasil: ${success} | Gagal: ${failed}`);
}

main();
