<template>
  <div class="profil-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Profil Fraksi PKS</h1>
      <p>Mengenal lebih dekat Fraksi Partai Keadilan Sejahtera di DPRD Kota Bandung.</p>
    </div></section>

    <section class="container section-content">
      <div class="profil-grid">
        <div class="profil-main">
          <div class="content-card" data-reveal="fade-up">
            <h2>Visi</h2>
            <p class="vision">Mewujudkan Kota Bandung yang bermartabat, sejahtera, dan berkeadilan melalui tata kelola pemerintahan yang bersih, transparan, dan amanah.</p>
          </div>
          <div class="content-card" data-reveal="fade-up" data-reveal-delay="150">
            <h2>Misi</h2>
            <ul class="mission">
              <li v-for="(m, i) in missions" :key="m"><i class="fas fa-check-circle"></i> {{ m }}</li>
            </ul>
          </div>
        </div>
        <div class="profil-side">
          <div class="content-card stat-card" v-for="(s, index) in stats" :key="s.label" data-reveal="fade-left" :data-reveal-delay="index * 100">
            <span class="stat-num">{{ s.num }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
          <div class="content-card values-card" data-reveal="fade-left" data-reveal-delay="300">
            <h3>Nilai Perjuangan</h3>
            <div class="value-item" v-for="v in values" :key="v.title">
              <i :class="v.icon"></i> <span>{{ v.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
useScrollReveal()

const missions = [
  'Mendorong kebijakan pro-rakyat yang berpihak pada kepentingan masyarakat luas',
  'Mengawal anggaran daerah agar tepat sasaran dan bebas korupsi',
  'Memperjuangkan peningkatan kualitas pendidikan, kesehatan, dan kesejahteraan warga',
  'Menyerap aspirasi masyarakat secara aktif dan berkesinambungan',
  'Mendorong pembangunan infrastruktur yang merata dan berkelanjutan',
]
const stats = [
  { num: '11', label: 'Anggota Fraksi' },
  { num: '2024', label: 'Periode Mulai' },
  { num: '5', label: 'Komisi DPRD' },
]
const values = [
  { icon: 'fas fa-hands-praying', title: 'Amanah' },
  { icon: 'fas fa-scale-balanced', title: 'Keadilan' },
  { icon: 'fas fa-handshake', title: 'Kolaborasi' },
  { icon: 'fas fa-eye', title: 'Transparansi' },
]
</script>

<style scoped>
.page-banner { padding: 20px 0; }
.banner-box { background: var(--pks-navy); color: white; border-radius: var(--radius); padding: 50px 40px; text-align: center; }
.banner-box h1 { font-size: 2.5rem; color: white; margin-bottom: 12px; }
.banner-box p { opacity: .8; max-width: 600px; margin: 0 auto; }

.section-content { padding: 40px 0 50px; }
.profil-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
.content-card { background: white; border-radius: var(--radius); padding: 30px; box-shadow: var(--shadow-sm); margin-bottom: 20px; }
.content-card h2 { font-size: 1.4rem; color: var(--pks-orange); margin-bottom: 16px; }

.vision { font-size: 1.05rem; line-height: 1.8; color: var(--pks-text-muted); border-left: 3px solid var(--pks-orange); padding-left: 20px; }
.mission { display: flex; flex-direction: column; gap: 14px; }
.mission li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.95rem; }
.mission li i { color: var(--pks-orange); margin-top: 4px; }

.stat-card { text-align: center; }
.stat-num { display: block; font-size: 2.5rem; font-weight: 800; color: var(--pks-orange); font-family: 'Montserrat',sans-serif; }
.stat-label { font-size: 0.85rem; color: var(--pks-text-muted); }

.values-card h3 { font-size: 1.1rem; margin-bottom: 16px; color: var(--pks-navy); }
.value-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem; }
.value-item i { color: var(--pks-orange); width: 20px; }

@media (max-width: 992px) { .profil-grid { grid-template-columns: 1fr; } }
@media (max-width: 576px) { .banner-box h1 { font-size: 2rem; } }
</style>
