<template>
  <div class="page-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Tindak Lanjut Aspirasi</h1>
      <p>Laporan hasil tindak lanjut aspirasi yang telah disampaikan warga.</p>
    </div></section>
    <section class="container page-content">
      <div v-if="items.length === 0" class="empty-state" data-reveal="fade-up">
        <i class="fas fa-clipboard-check"></i>
        <p>Belum ada laporan tindak lanjut aspirasi.</p>
        <p class="empty-hint">Tambahkan konten melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>
      <div v-else class="timeline">
        <div class="timeline-item" v-for="(t, index) in items" :key="t.id" :class="t.status" data-reveal="fade-left" :data-reveal-delay="index * 120">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-header">
              <span class="status-badge" :class="t.status">{{ t.statusText || t.status }}</span>
              <span class="timeline-date">{{ formatDate(t.date || t.createdAt) }}</span>
            </div>
            <h3>{{ t.title }}</h3>
            <p>{{ t.description || t.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import api from '../services/api'

useScrollReveal()
const items = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await api.getFollowups()
    items.value = data || []
  } catch (e) {
    console.error('Failed to fetch followups:', e)
  } finally {
    loading.value = false
  }
})

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
.timeline { position: relative; padding-left: 40px; }
.timeline::before { content: ''; position: absolute; left: 15px; top: 0; bottom: 0; width: 3px; background: #e5e7eb; }
.timeline-item { position: relative; margin-bottom: 24px; }
.timeline-dot { position: absolute; left: -33px; top: 24px; width: 16px; height: 16px; border-radius: 50%; border: 3px solid var(--pks-orange); background: white; z-index: 1; }
.timeline-item.done .timeline-dot { background: var(--pks-orange); }
.timeline-item.progress .timeline-dot { background: #3b82f6; border-color: #3b82f6; }
.timeline-card { background: white; border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow-sm); }
.timeline-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.status-badge { padding: 3px 14px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; }
.status-badge.done { background: #dcfce7; color: #16a34a; }
.status-badge.progress { background: #dbeafe; color: #2563eb; }
.status-badge.pending { background: #fef3c7; color: #d97706; }
.timeline-date { font-size: 0.75rem; color: var(--pks-text-muted); }
.timeline-card h3 { font-size: 1rem; color: var(--pks-navy); margin-bottom: 6px; }
.timeline-card p { font-size: 0.88rem; color: var(--pks-text-muted); line-height: 1.6; }
.empty-state { text-align: center; padding: 80px 20px; color: var(--pks-text-muted); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }
@media (max-width: 576px) { .banner-box h1 { font-size: 2rem; } }
</style>
