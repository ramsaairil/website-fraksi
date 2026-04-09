<template>
  <div class="page-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Galeri Foto</h1>
      <p>Dokumentasi kegiatan Fraksi PKS DPRD Kota Bandung.</p>
    </div></section>
    <section class="container page-content">
      <div v-if="photos.length === 0" class="empty-state" data-reveal="zoom">
        <i class="fas fa-images"></i>
        <p>Belum ada foto.</p>
        <p class="empty-hint">Tambahkan foto melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>
      <div v-else class="gallery-grid">
        <div class="gallery-item" v-for="(item, index) in photos" :key="item.id" data-reveal="zoom" :data-reveal-delay="index * 80">
          <img v-if="getImageUrl(item)" :src="getImageUrl(item)" :alt="item.title" />
          <div class="gallery-overlay"><p>{{ item.title }}</p><span>{{ formatDate(item.date || item.createdAt) }}</span></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import api, { STRAPI_URL } from '../services/api'

useScrollReveal()
const photos = ref([])

onMounted(async () => {
  try {
    const data = await api.getGalleries({ 'filters[type][$eq]': 'foto', sort: 'createdAt:desc' })
    photos.value = data || []
  } catch (e) {
    console.error('Failed to fetch photos:', e)
  }
})

const getImageUrl = (item) => {
  const img = item?.media || item?.attributes?.media
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
.gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.gallery-item { position: relative; border-radius: var(--radius); overflow: hidden; cursor: pointer; aspect-ratio: 4/3; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.gallery-item:hover img { transform: scale(1.05); }
.gallery-overlay { position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(to top, rgba(0,34,68,0.9), transparent); padding: 30px 16px 14px; color: white; }
.gallery-overlay p { font-size: 0.9rem; font-weight: 600; }
.gallery-overlay span { font-size: 0.75rem; opacity: 0.7; }
.empty-state { text-align: center; padding: 80px 20px; color: var(--pks-text-muted); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }
@media (max-width: 768px) { .gallery-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 576px) { .gallery-grid { grid-template-columns: 1fr; } .banner-box h1 { font-size: 2rem; } }
</style>
