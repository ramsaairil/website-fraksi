<template>
  <div class="page-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Pandangan Fraksi</h1>
      <p>Sikap dan pandangan resmi Fraksi PKS DPRD Kota Bandung terhadap kebijakan strategis.</p>
    </div></section>
    <section class="container page-content">
      <div v-if="views.length === 0" class="empty-state" data-reveal="fade-up">
        <i class="fas fa-landmark"></i>
        <p>Belum ada pandangan fraksi.</p>
        <p class="empty-hint">Tambahkan konten melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>
      <div v-else class="views-list">
        <router-link :to="`/berita/${v.documentId}`" class="view-card" v-for="(v, index) in views" :key="v.id" data-reveal="fade-left" :data-reveal-delay="index * 100">
          <div class="view-topic">{{ getCategory(v) || 'Fraksi PKS' }}</div>
          <h3>{{ getField(v, 'title') }}</h3>
          <p>{{ getField(v, 'excerpt') }}</p>
          <div class="view-footer">
            <span class="view-session" v-if="getField(v, 'session')"><i class="fas fa-landmark"></i> {{ getField(v, 'session') }}</span>
            <span class="view-date"><i class="far fa-calendar-alt"></i> {{ formatDate(getField(v, 'date') || getField(v, 'createdAt')) }}</span>
          </div>
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
const views = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await api.getArticlesByCategory('Pandangan Fraksi')
    views.value = data || []
  } catch (e) {
    console.error('Failed to fetch pandangan-fraksi:', e)
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
.views-list { display: flex; flex-direction: column; gap: 20px; }
.view-card { background: white; border-radius: var(--radius); padding: 30px; box-shadow: var(--shadow-sm); transition: var(--transition); border-left: 5px solid var(--pks-navy); }
.view-card:hover { box-shadow: var(--shadow-md); transform: translateX(4px); }
.view-topic { display: inline-block; background: var(--pks-navy); color: white; padding: 3px 14px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; }
.view-card h3 { font-size: 1.15rem; color: var(--pks-navy); margin-bottom: 8px; line-height: 1.4; }
.view-card p { font-size: 0.9rem; color: var(--pks-text-muted); line-height: 1.6; }
.view-footer { display: flex; gap: 24px; margin-top: 16px; padding-top: 14px; border-top: 1px solid #f3f4f6; }
.view-footer span { font-size: 0.78rem; color: var(--pks-text-muted); display: flex; align-items: center; gap: 5px; }
.view-footer i { color: var(--pks-orange); }
.empty-state { text-align: center; padding: 80px 20px; color: var(--pks-text-muted); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }
@media (max-width: 576px) { .banner-box h1 { font-size: 2rem; } .view-footer { flex-direction: column; gap: 6px; } }
</style>
