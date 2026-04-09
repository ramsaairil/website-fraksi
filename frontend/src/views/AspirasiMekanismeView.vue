<template>
  <div class="page-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Mekanisme Aspirasi</h1>
      <p>Tata cara penyampaian aspirasi masyarakat kepada Fraksi PKS DPRD Kota Bandung.</p>
    </div></section>
    <section class="container page-content">
      <div class="steps-grid">
        <div class="step-card" v-for="(s, i) in steps" :key="i" data-reveal="fade-up" :data-reveal-delay="i * 100">
          <div class="step-number">{{ i + 1 }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
        </div>
      </div>
      <div class="content-card cta-box" data-reveal="zoom">
        <h2>Siap Menyampaikan Aspirasi?</h2>
        <p>Gunakan form aspirasi online kami untuk menyampaikan pendapat, keluhan, atau saran Anda.</p>
        <router-link to="/aspirasi/form" class="btn btn-primary">Isi Form Aspirasi <i class="fas fa-arrow-right"></i></router-link>
      </div>
    </section>
  </div>
</template>
<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
useScrollReveal()
const steps = [
  { title: 'Sampaikan Aspirasi', desc: 'Warga dapat menyampaikan aspirasi melalui form online, surat, email, atau datang langsung ke kantor Fraksi PKS.' },
  { title: 'Verifikasi & Kategorisasi', desc: 'Tim sekretariat fraksi akan memverifikasi dan mengkategorikan aspirasi berdasarkan bidang terkait.' },
  { title: 'Disposisi ke Anggota', desc: 'Aspirasi didisposisi kepada anggota fraksi sesuai komisi dan bidang keahliannya.' },
  { title: 'Pembahasan Internal', desc: 'Aspirasi dibahas dalam rapat internal fraksi untuk menentukan langkah tindak lanjut.' },
  { title: 'Tindak Lanjut', desc: 'Fraksi menyalurkan aspirasi dalam rapat komisi, paripurna, atau hearing dengan pemerintah kota.' },
  { title: 'Pelaporan', desc: 'Hasil tindak lanjut dilaporkan kembali kepada warga sebagai bentuk transparansi dan akuntabilitas.' },
]
</script>
<style scoped>
.page-banner { padding: 20px 0; }
.banner-box { background: var(--pks-navy); color: white; border-radius: var(--radius); padding: 50px 40px; text-align: center; }
.banner-box h1 { font-size: 2.5rem; color: white; margin-bottom: 12px; }
.banner-box p { opacity: .8; max-width: 600px; margin: 0 auto; }
.page-content { padding: 40px 0 50px; }
.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
.step-card { background: white; border-radius: var(--radius); padding: 30px; box-shadow: var(--shadow-sm); text-align: center; transition: var(--transition); }
.step-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.step-number { width: 50px; height: 50px; background: var(--pks-orange); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.3rem; margin: 0 auto 16px; font-family: 'Montserrat', sans-serif; }
.step-card h3 { font-size: 1rem; color: var(--pks-navy); margin-bottom: 8px; }
.step-card p { font-size: 0.85rem; color: var(--pks-text-muted); line-height: 1.6; }
.content-card { background: white; border-radius: var(--radius); padding: 40px; box-shadow: var(--shadow-sm); text-align: center; }
.cta-box h2 { font-size: 1.5rem; color: var(--pks-navy); margin-bottom: 12px; }
.cta-box p { color: var(--pks-text-muted); margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto; }
@media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 576px) { .steps-grid { grid-template-columns: 1fr; } .banner-box h1 { font-size: 2rem; } }
</style>
