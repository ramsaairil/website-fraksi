<template>
  <div class="page-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Berita Aspirasi</h1>
      <p>Berita terkait aspirasi warga yang telah diperjuangkan oleh Fraksi PKS.</p>
    </div></section>
    <section class="container page-content">
      <div v-if="articles.length === 0" class="empty-state" data-reveal="fade-up">
        <i class="fas fa-bullhorn"></i>
        <p>Belum ada berita aspirasi.</p>
        <p class="empty-hint">Tambahkan konten melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>
      <div v-else class="news-list">
        <router-link :to="`/berita/${a.documentId}`" class="news-item" v-for="(a, index) in articles" :key="a.id" data-reveal="fade-up" :data-reveal-delay="index * 100">
          <div class="news-thumb">
            <img v-if="getImageUrl(a)" :src="getImageUrl(a)" :alt="getField(a, 'title')" />
            <div v-else class="img-placeholder"><i class="fas fa-image"></i></div>
          </div>
          <div class="news-body">
            <span class="cat-badge">Aspirasi</span>
            <h3>{{ getField(a, 'title') }}</h3>
            <p>{{ getField(a, 'excerpt') }}</p>
            <span class="news-time"><i class="far fa-clock"></i> {{ formatDate(getField(a, 'date') || getField(a, 'createdAt')) }}</span>
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
    const data = await api.getArticlesByCategory('Berita Aspirasi')
    articles.value = data || []
  } catch (e) {
    console.error('Failed to fetch aspirasi-berita:', e)
  } finally {
    loading.value = false
  }
})

const getField = (a, field) => a?.[field] || a?.attributes?.[field] || ''
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
.news-list { display: flex; flex-direction: column; gap: 16px; }
.news-item { display: flex; gap: 20px; background: white; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); transition: var(--transition); cursor: pointer; }
.news-item:hover { box-shadow: var(--shadow-md); transform: translateX(4px); }
.news-thumb { width: 220px; min-width: 220px; min-height: 160px; background: var(--pks-navy); overflow: hidden; }
.news-thumb img { width: 100%; height: 100%; object-fit: cover; }
.img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 2rem; }
.news-body { padding: 20px 24px 20px 0; flex: 1; }
.cat-badge { background: var(--pks-orange); color: white; padding: 3px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
.news-body h3 { font-size: 1.1rem; color: var(--pks-navy); margin: 10px 0 8px; line-height: 1.4; }
.news-body p { font-size: 0.88rem; color: var(--pks-text-muted); line-height: 1.6; }
.news-time { font-size: 0.78rem; color: var(--pks-text-muted); display: flex; align-items: center; gap: 5px; margin-top: 10px; }
.empty-state { text-align: center; padding: 80px 20px; color: var(--pks-text-muted); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }
@media (max-width: 576px) { .news-item { flex-direction: column; } .news-thumb { width: 100%; min-height: 180px; } .news-body { padding: 20px; } .banner-box h1 { font-size: 2rem; } }
</style>
