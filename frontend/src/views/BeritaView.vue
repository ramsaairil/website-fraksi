<template>
  <div class="berita-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Berita & Kegiatan</h1>
      <p>Update terbaru dari aktivitas Fraksi PKS DPRD Kota Bandung.</p>
    </div></section>

    <section class="container berita-content">
      <div class="filter-bar" data-reveal="fade-up">
        <button v-for="cat in categories" :key="cat" :class="['filter-btn', { active: activeFilter === cat }]" @click="activeFilter = cat">{{ cat }}</button>
      </div>

      <div v-if="loading" class="loading-state"><i class="fas fa-spinner fa-spin"></i> Memuat berita...</div>

      <div v-else-if="filteredArticles.length === 0" class="empty-state" data-reveal="fade-up">
        <i class="fas fa-newspaper"></i>
        <p>Belum ada berita{{ activeFilter !== 'Semua' ? ` dalam kategori "${activeFilter}"` : '' }}.</p>
        <p class="empty-hint">Tambahkan artikel melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>

      <div v-else class="news-list">
        <router-link :to="`/berita/${a.documentId}`" class="news-item" v-for="(a, index) in filteredArticles" :key="a.id" data-reveal="fade-up" :data-reveal-delay="index * 80">
          <div class="news-thumb">
            <img v-if="getImageUrl(a)" :src="getImageUrl(a)" :alt="getField(a, 'title')" />
            <div v-else class="img-placeholder"><i class="fas fa-image"></i></div>
          </div>
          <div class="news-body">
            <span class="cat-badge" v-if="getCategory(a)">{{ getCategory(a) }}</span>
            <h3>{{ getField(a, 'title') }}</h3>
            <p>{{ getField(a, 'excerpt') }}</p>
            <div class="news-info">
              <span class="news-time"><i class="far fa-clock"></i> {{ formatDate(getField(a, 'date') || getField(a, 'createdAt')) }}</span>
              <span class="news-author" v-if="getField(a, 'author')"><i class="far fa-user"></i> {{ getField(a, 'author') }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api, { STRAPI_URL } from '../services/api'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const categories = ref(['Semua'])
const activeFilter = ref('Semua')
const articles = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [articlesData, categoriesData] = await Promise.all([
      api.getArticles({ sort: 'date:desc', populate: '*' }),
      api.getCategories()
    ])
    
    articles.value = articlesData || []
    if (categoriesData) {
      categories.value = ['Semua', ...categoriesData.map(c => c.name || c.attributes?.name)]
    }
  } catch (e) {
    console.error('Failed to fetch data:', e)
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
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const filteredArticles = computed(() => {
  if (activeFilter.value === 'Semua') return articles.value
  return articles.value.filter(a => getCategory(a) === activeFilter.value)
})
</script>

<style scoped>
.page-banner { padding: 20px 0; }
.banner-box { background: var(--pks-navy); color: white; border-radius: var(--radius); padding: 50px 40px; text-align: center; }
.banner-box h1 { font-size: 2.5rem; color: white; margin-bottom: 12px; }
.banner-box p { opacity: .8; max-width: 600px; margin: 0 auto; }
.berita-content { padding: 40px 0 50px; }
.filter-bar { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
.filter-btn { padding: 8px 22px; border-radius: 30px; border: 2px solid #ddd; background: white; cursor: pointer; font-weight: 600; font-family: 'Poppins',sans-serif; transition: var(--transition); color: var(--pks-text-muted); font-size: 0.85rem; }
.filter-btn:hover, .filter-btn.active { background: var(--pks-orange); color: white; border-color: var(--pks-orange); }
.news-list { display: flex; flex-direction: column; gap: 16px; }
.news-item { display: flex; gap: 20px; background: white; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); transition: var(--transition); cursor: pointer; }
.news-item:hover { box-shadow: var(--shadow-md); transform: translateX(4px); }
.news-thumb { width: 220px; min-width: 220px; min-height: 160px; overflow: hidden; }
.news-thumb img { width: 100%; height: 100%; object-fit: cover; }
.news-body { padding: 20px 24px 20px 0; flex: 1; }
.cat-badge { background: var(--pks-orange); color: white; padding: 3px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
.news-body h3 { font-size: 1.1rem; color: var(--pks-navy); margin: 10px 0 8px; line-height: 1.4; }
.news-body p { font-size: 0.88rem; color: var(--pks-text-muted); line-height: 1.6; }
.news-info { display: flex; align-items: center; gap: 16px; margin-top: 10px; flex-wrap: wrap; }
.news-time { font-size: 0.78rem; color: var(--pks-text-muted); display: flex; align-items: center; gap: 5px; }
.news-author { font-size: 0.78rem; color: var(--pks-navy); display: flex; align-items: center; gap: 5px; font-weight: 600; }
.loading-state, .empty-state { text-align: center; padding: 60px 20px; color: var(--pks-text-muted); }
.loading-state i { font-size: 1.5rem; color: var(--pks-orange); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }
.img-placeholder { width: 100%; height: 100%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #9ca3af; min-height: 160px; }
.img-placeholder i { font-size: 2rem; }
@media (max-width: 576px) { .news-item { flex-direction: column; } .news-thumb { width: 100%; min-height: 180px; } .news-body { padding: 20px; } .banner-box h1 { font-size: 2rem; } }
</style>
