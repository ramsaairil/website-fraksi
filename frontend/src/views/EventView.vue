<template>
  <div class="page-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Event</h1>
      <p>Agenda dan kegiatan mendatang Fraksi PKS DPRD Kota Bandung.</p>
    </div></section>
    <section class="container page-content">
      <div v-if="events.length === 0" class="empty-state" data-reveal="fade-up">
        <i class="fas fa-calendar-alt"></i>
        <p>Belum ada event yang dijadwalkan.</p>
        <p class="empty-hint">Tambahkan event melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>
      <div v-else class="events-grid">
        <router-link :to="`/berita/${e.documentId}`" class="event-card" v-for="(e, index) in events" :key="e.id" data-reveal="fade-up" :data-reveal-delay="index * 100">
          <div class="event-date-box">
            <span class="event-day">{{ getDay(e.date || e.createdAt) }}</span>
            <span class="event-month">{{ getMonth(e.date || e.createdAt) }}</span>
          </div>
          <div class="event-info">
            <h3>{{ e.title }}</h3>
            <p><i class="far fa-calendar"></i> {{ formatDateFull(e.date || e.createdAt) }}</p>
            <p><i class="far fa-file-alt"></i> {{ e.excerpt || 'Acara penting Fraksi PKS' }}</p>
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
const events = ref([])

onMounted(async () => {
  try {
    const data = await api.getArticlesByCategory('Event')
    events.value = data || []
  } catch (e) {
    console.error('Failed to fetch events:', e)
  }
})

const getDay = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).getDate()
}

const getMonth = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', { month: 'short' })
}

const formatDateFull = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return isNaN(d) ? dateStr : d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB'
}
</script>
<style scoped>
.page-banner { padding: 20px 0; }
.banner-box { background: var(--pks-navy); color: white; border-radius: var(--radius); padding: 50px 40px; text-align: center; }
.banner-box h1 { font-size: 2.5rem; color: white; margin-bottom: 12px; }
.banner-box p { opacity: .8; max-width: 600px; margin: 0 auto; }
.page-content { padding: 40px 0 50px; }
.events-grid { display: flex; flex-direction: column; gap: 16px; }
.event-card { display: flex; gap: 24px; background: white; border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow-sm); transition: var(--transition); align-items: center; }
.event-card:hover { box-shadow: var(--shadow-md); transform: translateX(4px); }
.event-date-box { width: 80px; min-width: 80px; height: 80px; background: var(--pks-orange); color: white; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.event-day { font-size: 1.8rem; font-weight: 800; font-family: 'Montserrat',sans-serif; line-height: 1; }
.event-month { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
.event-info h3 { font-size: 1.05rem; color: var(--pks-navy); margin-bottom: 8px; }
.event-info p { font-size: 0.85rem; color: var(--pks-text-muted); display: flex; align-items: center; gap: 6px; margin-top: 4px; }
.event-info p i { color: var(--pks-orange); width: 16px; }
.empty-state { text-align: center; padding: 80px 20px; color: var(--pks-text-muted); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }
@media (max-width: 576px) { .banner-box h1 { font-size: 2rem; } .event-card { flex-direction: column; text-align: center; } .event-date-box { margin: 0 auto; } .event-info p { justify-content: center; } }
</style>
