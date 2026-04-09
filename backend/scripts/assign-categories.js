const http = require('http');

/**
 * Script to assign the "Berita" category to all articles that don't have a category.
 * This fixes the issue where category-filtered pages show empty results.
 * 
 * Usage: node scripts/assign-categories.js <admin-email> <admin-password>
 */

function httpRequest(method, reqPath, data, token) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = {
      hostname: '127.0.0.1',
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

async function main() {
  console.log('============================================');
  console.log('  Assign Categories to Articles');
  console.log('============================================\n');

  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('Usage: node scripts/assign-categories.js <email> <password>');
    process.exit(1);
  }

  // 1. Login to Strapi admin
  console.log('🔐 Login ke Strapi Admin...');
  const loginRes = await httpRequest('POST', '/admin/login', { email, password });
  if (loginRes.status !== 200) {
    console.error('❌ Login gagal:', loginRes.data);
    process.exit(1);
  }
  const token = loginRes.data.data.token;
  console.log('✅ Login berhasil!\n');

  // 2. Get all categories
  console.log('📋 Mengambil daftar kategori...');
  const catRes = await httpRequest('GET', '/api/categories', null, token);
  if (catRes.status !== 200) {
    console.error('❌ Gagal mengambil kategori:', catRes.data);
    process.exit(1);
  }
  const categories = catRes.data.data;
  console.log(`   Ditemukan ${categories.length} kategori:`);
  categories.forEach(c => console.log(`   - ${c.name} (documentId: ${c.documentId})`));

  // Find the "Berita" category
  const beritaCat = categories.find(c => c.name === 'Berita');
  if (!beritaCat) {
    console.error('❌ Kategori "Berita" tidak ditemukan!');
    process.exit(1);
  }
  console.log(`\n   ✅ Menggunakan kategori "Berita" (id: ${beritaCat.id}, documentId: ${beritaCat.documentId})\n`);

  // 3. Get all articles  
  console.log('📰 Mengambil semua artikel...');
  const artRes = await httpRequest('GET', '/api/articles?populate=category&pagination[pageSize]=100', null, token);
  if (artRes.status !== 200) {
    console.error('❌ Gagal mengambil artikel:', artRes.data);
    process.exit(1);
  }
  const articles = artRes.data.data;
  console.log(`   Ditemukan ${articles.length} artikel\n`);

  // 4. Filter articles without category
  const uncategorized = articles.filter(a => !a.category);
  console.log(`   ${uncategorized.length} artikel tanpa kategori\n`);

  if (uncategorized.length === 0) {
    console.log('✅ Semua artikel sudah memiliki kategori!');
    return;
  }

  // 5. Update each article with the "Berita" category via Content Manager API
  const CM_BASE = '/content-manager/collection-types/api::article.article';
  let success = 0;
  let failed = 0;

  for (let i = 0; i < uncategorized.length; i++) {
    const article = uncategorized[i];
    console.log(`[${i + 1}/${uncategorized.length}] ${article.title.substring(0, 70)}`);

    try {
      // Update article with category relation
      const updateRes = await httpRequest(
        'PUT',
        `${CM_BASE}/${article.documentId}`,
        {
          category: beritaCat.documentId
        },
        token
      );

      if (updateRes.status === 200) {
        console.log(`   ✅ Kategori "Berita" ditambahkan`);

        // Re-publish the article
        const pubRes = await httpRequest(
          'POST',
          `${CM_BASE}/${article.documentId}/actions/publish`,
          { documentId: article.documentId },
          token
        );
        if (pubRes.status === 200) {
          console.log(`   ✅ Artikel di-publish ulang`);
        } else {
          console.log(`   ⚠️  Publish status: ${pubRes.status}`);
        }
        success++;
      } else {
        console.log(`   ❌ Gagal update (${updateRes.status}): ${JSON.stringify(updateRes.data?.error || updateRes.data).substring(0, 150)}`);
        failed++;
      }
    } catch (e) {
      console.log(`   ❌ Error: ${e.message}`);
      failed++;
    }
    console.log('');
  }

  console.log(`============================================`);
  console.log(`  Selesai!`);
  console.log(`  ✅ Berhasil: ${success}`);
  console.log(`  ❌ Gagal:    ${failed}`);
  console.log(`============================================`);
  
  // Verify
  console.log('\n🔍 Verifikasi...');
  const verifyRes = await httpRequest('GET', '/api/articles?populate=category&pagination[pageSize]=100', null, token);
  if (verifyRes.status === 200) {
    const withCat = verifyRes.data.data.filter(a => a.category);
    const withoutCat = verifyRes.data.data.filter(a => !a.category);
    console.log(`   Artikel dengan kategori: ${withCat.length}`);
    console.log(`   Artikel tanpa kategori: ${withoutCat.length}`);
  }
}

main().catch(console.error);
