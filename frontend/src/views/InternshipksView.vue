<template>
  <div class="page-view">
    <section class="container page-banner">
      <div class="banner-box">
        <h1>InternshipKS</h1>
        <p>Program Magang Fraksi PKS DPRD Kota Bandung</p>
      </div>
    </section>
    <section class="container page-content">
      <div class="empty-state" data-reveal="fade-up">
        <i class="fas fa-user-graduate"></i>
        <h2>Informasi Segera Hadir</h2>
        <p>Halaman pendaftaran dan informasi mengenai program InternshipKS akan diletakkan di sini.</p>
      </div>
    </section>
  </div>
</template>
<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
useScrollReveal()
</script>
<style scoped>
.page-banner { padding: 20px 0; }
.banner-box { background: var(--pks-navy); color: white; border-radius: var(--radius); padding: 50px 40px; text-align: center; }
.banner-box h1 { font-size: 2.5rem; color: white; margin-bottom: 12px; }
.banner-box p { opacity: .8; max-width: 600px; margin: 0 auto; }
.page-content { padding: 40px 0 50px; }
.empty-state { text-align: center; padding: 80px 20px; background: white; border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.empty-state i { font-size: 3.5rem; color: var(--pks-orange); margin-bottom: 20px; display: block; }
.empty-state h2 { color: var(--pks-navy); margin-bottom: 12px; font-size: 1.5rem; }
.empty-state p { color: var(--pks-text-muted); }
@media (max-width: 576px) { 
  .banner-box h1 { font-size: 2rem; } 
}
</style>
