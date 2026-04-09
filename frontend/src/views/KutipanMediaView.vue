<template>
  <div class="page-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Kutipan Media</h1>
      <p>Liputan media mengenai kegiatan dan pandangan Fraksi PKS DPRD Kota Bandung.</p>
    </div></section>
    <section class="container page-content">
      <div v-if="media.length === 0" class="empty-state" data-reveal="fade-up">
        <i class="fas fa-quote-left"></i>
        <p>Belum ada kutipan media.</p>
        <p class="empty-hint">Tambahkan konten melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>
      <div v-else class="media-grid">
        <router-link :to="`/berita/${m.documentId}`" class="media-card" v-for="(m, index) in media" :key="m.id" data-reveal="fade-up" :data-reveal-delay="index * 100">
          <div class="media-source"><i class="fas fa-newspaper"></i> {{ getField(m, 'source') || 'Liputan Media' }}</div>
          <h3>{{ getField(m, 'title') }}</h3>
          <p>{{ getField(m, 'excerpt') }}</p>
          <span class="media-date"><i class="far fa-clock"></i> {{ formatDate(getField(m, 'date') || getField(m, 'createdAt')) }}</span>
        </router-link>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import api from '../services/api'

useScrollReveal()
const media = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await api.getArticlesByCategory('Kutipan Media')
    media.value = data || []
  } catch (e) {
    console.error('Failed to fetch kutipan-media:', e)
  } finally {
    loading.value = false
  }
})

const getField = (a, field) => a?.[field] || a?.attributes?.[field] || ''
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
.media-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.media-card { background: white; border-radius: var(--radius); padding: 28px; box-shadow: var(--shadow-sm); transition: var(--transition); border-left: 4px solid var(--pks-orange); }
.media-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
.media-source { font-size: 0.78rem; font-weight: 700; color: var(--pks-orange); text-transform: uppercase; display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
.media-card h3 { font-size: 1rem; color: var(--pks-navy); margin-bottom: 8px; line-height: 1.4; }
.media-card p { font-size: 0.85rem; color: var(--pks-text-muted); line-height: 1.6; }
.media-date { font-size: 0.75rem; color: var(--pks-text-muted); display: flex; align-items: center; gap: 5px; margin-top: 12px; }
.empty-state { text-align: center; padding: 80px 20px; color: var(--pks-text-muted); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }
@media (max-width: 768px) { .media-grid { grid-template-columns: 1fr; } .banner-box h1 { font-size: 2rem; } }
</style>
