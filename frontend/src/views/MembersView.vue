<script setup>
import { ref, onMounted } from 'vue'
import MemberCard from '../components/MemberCard.vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import api from '../services/api'

useScrollReveal()

const members = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await api.getMembers({ sort: 'createdAt:asc' })
    members.value = data || []
  } catch (e) {
    console.error('Failed to fetch members:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="members-view">
    <section class="container page-banner">
      <div class="banner-box">
        <h1>Anggota Fraksi PKS</h1>
        <p>Mengenal lebih dekat para wakil rakyat dari Fraksi PKS di DPRD Kota Bandung periode 2024-2029.</p>
      </div>
    </section>

    <section class="container members-section">
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i> Memuat data anggota...
      </div>

      <div v-else-if="members.length === 0" class="empty-state" data-reveal="fade-up">
        <i class="fas fa-users"></i>
        <p>Belum ada data anggota.</p>
        <p class="empty-hint">Tambahkan anggota melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>

      <div v-else class="members-grid">
        <div v-for="(member, index) in members" :key="member.id || member.nama" data-reveal="fade-up" :data-reveal-delay="index * 80">
          <MemberCard :member="member" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-banner { padding: 20px 0; }
.banner-box {
  background: linear-gradient(135deg, var(--pks-navy) 0%, #003366 50%, #001a33 100%);
  color: white;
  border-radius: 20px;
  padding: 55px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.banner-box::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(240, 122, 30, 0.12) 0%, transparent 70%);
  pointer-events: none;
}
.banner-box h1 {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 12px;
  position: relative;
}
.banner-box p {
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.members-section { padding: 40px 0 60px; }
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 30px;
}

.loading-state, .empty-state { text-align: center; padding: 80px 20px; color: var(--pks-text-muted); }
.loading-state i { font-size: 1.8rem; color: var(--pks-orange); }
.empty-state i { font-size: 3.5rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.empty-hint { font-size: 0.85rem; margin-top: 8px; }

@media (max-width: 768px) {
  .banner-box { padding: 40px 24px; }
  .banner-box h1 { font-size: 1.8rem; }
  .members-grid { gap: 20px; }
}
</style>
