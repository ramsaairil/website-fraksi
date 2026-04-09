<template>
  <div class="page-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Galeri Video</h1>
      <p>Video kegiatan dan dokumentasi Fraksi PKS DPRD Kota Bandung.</p>
    </div></section>
    <section class="container page-content">
      <div v-if="videos.length === 0" class="empty-state" data-reveal="zoom">
        <i class="fas fa-video"></i>
        <p>Belum ada video.</p>
        <p class="empty-hint">Tambahkan video melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>
      <div v-else class="video-grid">
        <a class="video-card" v-for="(v, index) in videos" :key="v.id" :href="v.link_video" target="_blank" data-reveal="zoom" :data-reveal-delay="index * 100">
          <div class="video-thumb" :style="getThumbnailStyle(v)">
            <i class="fas fa-play-circle play-icon"></i>
          </div>
          <div class="video-info">
            <h3>{{ v.title }}</h3>
            <span><i class="far fa-clock"></i> {{ formatDate(v.date || v.createdAt) }}</span>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import api, { STRAPI_URL } from '../services/api'

useScrollReveal()
const videos = ref([])

onMounted(async () => {
  try {
    const data = await api.getGalleries({ 'filters[type][$eq]': 'video', sort: 'createdAt:desc' })
    videos.value = data || []
  } catch (e) {
    console.error('Failed to fetch videos:', e)
  }
})

const getThumbnailStyle = (item) => {
  const img = item?.media || item?.attributes?.media
  if (img?.data?.attributes?.url) {
    const url = img.data.attributes.url
    return { backgroundImage: `url(${url.startsWith('http') ? url : STRAPI_URL + url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  if (img?.url) {
    const url = img.url
    return { backgroundImage: `url(${url.startsWith('http') ? url : STRAPI_URL + url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  return {}
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return isNaN(d) ? dateStr : d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
<style scoped>
.page-banner { padding: 20px 0; }
.banner-box { background: var(--pks-navy); color: white; border-radius: var(--radius); padding: 50px 40px; text-align: center; }
.banner-box h1 { font-size: 2.5rem; color: white; margin-bottom: 12px; }
.banner-box p { opacity: .8; max-width: 600px; margin: 0 auto; }
.page-content { padding: 40px 0 50px; }
.video-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.video-card { background: white; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); transition: var(--transition); cursor: pointer; }
.video-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.video-thumb { height: 200px; display: flex; align-items: center; justify-content: center; background: var(--pks-navy); }
.play-icon { font-size: 3.5rem; color: rgba(255,255,255,0.8); transition: var(--transition); }
.video-card:hover .play-icon { color: white; transform: scale(1.15); }
.video-info { padding: 18px; }
.video-info h3 { font-size: 0.95rem; color: var(--pks-navy); margin-bottom: 8px; line-height: 1.4; }
.video-info span { font-size: 0.78rem; color: var(--pks-text-muted); display: flex; align-items: center; gap: 5px; }
.empty-state { text-align: center; padding: 80px 20px; color: var(--pks-text-muted); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }
@media (max-width: 768px) { .video-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 576px) { .video-grid { grid-template-columns: 1fr; } .banner-box h1 { font-size: 2rem; } }
</style>
