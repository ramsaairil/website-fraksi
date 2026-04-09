<template>
  <div class="page-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Wawancara dan Opini</h1>
      <p>Pandangan dan opini anggota Fraksi PKS DPRD Kota Bandung terhadap isu-isu terkini.</p>
    </div></section>
    <section class="container page-content">
      <div v-if="articles.length === 0" class="empty-state" data-reveal="fade-up">
        <i class="fas fa-microphone-alt"></i>
        <p>Belum ada wawancara dan opini.</p>
        <p class="empty-hint">Tambahkan konten melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>
      <div v-else class="articles-list">
        <router-link :to="`/berita/${a.documentId}`" class="article-card" v-for="(a, index) in articles" :key="a.id" data-reveal="fade-right" :data-reveal-delay="index * 100">
          <div class="article-img">
            <img v-if="getImageUrl(a)" :src="getImageUrl(a)" :alt="getField(a, 'title')" />
            <div v-else class="img-placeholder"><i class="fas fa-image"></i></div>
          </div>
          <div class="article-body">
            <span class="article-tag">{{ getCategory(a) || 'Opini' }}</span>
            <h3>{{ getField(a, 'title') }}</h3>
            <p>{{ getField(a, 'excerpt') }}</p>
            <div class="article-meta">
              <span><i class="fas fa-user"></i> {{ getField(a, 'author') || 'Admin' }}</span>
              <span><i class="far fa-clock"></i> {{ formatDate(getField(a, 'date') || getField(a, 'createdAt')) }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import api, { STRAPI_URL } from '../services/api'

useScrollReveal()
const articles = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await api.getArticlesByCategory('Wawancara & Opini')
    articles.value = data || []
  } catch (e) {
    console.error('Failed to fetch wawancara-opini:', e)
  } finally {
    loading.value = false
  }
})

const getField = (a, field) => a?.[field] || a?.attributes?.[field] || ''
const getCategory = (a) => {
  const cat = a?.category || a?.attributes?.category
  if (typeof cat === 'object') return cat?.data?.attributes?.name || ''
  return cat || ''
}
const getImageUrl = (a) => {
  const img = a?.image || a?.attributes?.image
  if (img?.data?.attributes?.url) {
    const url = img.data.attributes.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }
  if (img?.url) {
    const url = img.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }
  return null
}
const formatDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
<style scoped>
.page-banner { padding: 20px 0; }
.banner-box { background: var(--pks-navy); color: white; border-radius: var(--radius); padding: 50px 40px; text-align: center; }
.banner-box h1 { font-size: 2.5rem; color: white; margin-bottom: 12px; }
.banner-box p { opacity: .8; max-width: 600px; margin: 0 auto; }
.page-content { padding: 40px 0 50px; }
.articles-list { display: flex; flex-direction: column; gap: 20px; }
.article-card { display: flex; gap: 20px; background: white; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); transition: var(--transition); }
.article-card:hover { box-shadow: var(--shadow-md); transform: translateX(4px); }
.article-img { width: 240px; min-width: 240px; min-height: 180px; background: var(--pks-navy); overflow: hidden; }
.article-img img { width: 100%; height: 100%; object-fit: cover; }
.img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 2rem; }
.article-body { padding: 22px 24px 22px 0; flex: 1; }
.article-tag { background: var(--pks-orange); color: white; padding: 3px 14px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; }
.article-body h3 { font-size: 1.1rem; color: var(--pks-navy); margin: 10px 0 8px; line-height: 1.4; }
.article-body p { font-size: 0.88rem; color: var(--pks-text-muted); line-height: 1.6; }
.article-meta { display: flex; gap: 20px; margin-top: 12px; }
.article-meta span { font-size: 0.78rem; color: var(--pks-text-muted); display: flex; align-items: center; gap: 5px; }
.empty-state { text-align: center; padding: 80px 20px; color: var(--pks-text-muted); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }
@media (max-width: 576px) { .article-card { flex-direction: column; } .article-img { width: 100%; min-height: 200px; } .article-body { padding: 20px; } .banner-box h1 { font-size: 2rem; } }
</style>
