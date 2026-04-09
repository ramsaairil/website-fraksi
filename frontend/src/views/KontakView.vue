<template>
  <div class="kontak-view">
    <section class="container page-banner"><div class="banner-box">
      <h1>Sampaikan Aspirasi</h1>
      <p>Suarakan pendapat, keluhan, dan harapan Anda untuk Kota Bandung yang lebih baik.</p>
    </div></section>
    <section class="container kontak-content">
      <div class="kontak-grid">
        <div class="content-card form-card" data-reveal="fade-up">
          <h2><i class="fas fa-paper-plane"></i> Kirim Pesan</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group"><label>Nama Lengkap</label><input v-model="form.name" placeholder="Masukkan nama" required /></div>
              <div class="form-group"><label>Email</label><input type="email" v-model="form.email" placeholder="contoh@email.com" required /></div>
            </div>
            <div class="form-group"><label>Subjek</label><input v-model="form.subject" placeholder="Topik aspirasi" required /></div>
            <div class="form-group"><label>Pesan</label><textarea v-model="form.message" rows="5" placeholder="Tuliskan aspirasi Anda..." required></textarea></div>
            <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
            <button type="submit" class="btn btn-primary btn-full" :disabled="submitted || submitting">
              <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
              <i v-else-if="submitted" class="fas fa-check"></i>
              <i v-else class="fas fa-paper-plane"></i> 
              <span style="margin-left: 8px;">{{ submitted ? 'Terkirim!' : submitting ? 'Mengirim...' : 'Kirim Aspirasi' }}</span>
            </button>
          </form>
        </div>
        <div class="info-side">
          <div class="content-card info-item" v-for="(c, index) in contacts" :key="c.title" data-reveal="fade-right" :data-reveal-delay="index * 100">
            <div class="info-icon"><i :class="c.icon"></i></div>
            <div><h4>{{ c.title }}</h4><p v-html="c.text"></p></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import api from '../services/api'

useScrollReveal()
const submitted = ref(false)
const submitting = ref(false)
const errorMessage = ref('')
const form = ref({ name: '', email: '', subject: '', message: '' })

const handleSubmit = async () => { 
  submitting.value = true;
  errorMessage.value = '';
  try {
    await api.postAspiration(form.value);
    submitted.value = true; 
    setTimeout(() => { 
      submitted.value = false; 
      form.value = { name:'', email:'', subject:'', message:'' } 
    }, 5000);
  } catch (error) {
    console.error('Submission failed:', error);
    errorMessage.value = 'Terjadi kesalahan saat mengirim aspirasi. Silakan coba lagi.';
  } finally {
    submitting.value = false;
  }
}
const contacts = [
  { icon: 'fas fa-map-marker-alt', title: 'Alamat', text: 'Gedung DPRD Kota Bandung<br/>Jl. Sukabumi No.30, Bandung 40162' },
  { icon: 'fas fa-phone', title: 'Telepon', text: '(022) 7208171' },
  { icon: 'fas fa-envelope', title: 'Email', text: 'fraksi@bandung.pks.id' },
  { icon: 'fas fa-clock', title: 'Jam Operasional', text: 'Senin - Jumat<br/>08.00 - 16.00 WIB' },
]
</script>
<style scoped>
.page-banner { padding: 20px 0; }
.banner-box { background: var(--pks-navy); color: white; border-radius: var(--radius); padding: 50px 40px; text-align: center; }
.banner-box h1 { font-size: 2.5rem; color: white; margin-bottom: 12px; }
.banner-box p { opacity: .8; max-width: 600px; margin: 0 auto; }
.kontak-content { padding: 40px 0 50px; }
.kontak-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
.content-card { background: white; border-radius: var(--radius); padding: 30px; box-shadow: var(--shadow-sm); }
.form-card h2 { font-size: 1.3rem; color: var(--pks-navy); margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
.form-card h2 i { color: var(--pks-orange); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.88rem; color: var(--pks-navy); }
.form-group input, .form-group textarea { width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 10px; font-family: 'Poppins',sans-serif; font-size: 0.9rem; transition: var(--transition); background: var(--pks-bg); }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--pks-orange); box-shadow: 0 0 0 3px rgba(240,122,30,.1); }
.form-group textarea { resize: vertical; }
.btn-full { width: 100%; padding: 14px; font-size: 1rem; }
.btn-full:disabled { background: #22c55e; }
.info-side { display: flex; flex-direction: column; gap: 16px; }
.info-item { display: flex; align-items: flex-start; gap: 16px; }
.info-icon { width: 44px; height: 44px; min-width: 44px; background: var(--pks-orange); color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
.info-item h4 { font-size: 0.95rem; margin-bottom: 4px; }
.info-item p { font-size: 0.85rem; color: var(--pks-text-muted); line-height: 1.5; }
.error-msg { color: #ef4444; font-size: 0.85rem; margin-bottom: 16px; font-weight: 500; }
@media (max-width: 992px) { .kontak-grid { grid-template-columns: 1fr; } }
@media (max-width: 576px) { .form-row { grid-template-columns: 1fr; } .banner-box h1 { font-size: 2rem; } }
</style>
