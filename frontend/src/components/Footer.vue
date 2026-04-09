<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
useScrollReveal()
</script>

<template>
  <footer class="footer">
    <div class="container footer-main">
      <div class="footer-brand" data-reveal="fade-up">
        <div class="footer-logo-wrap">
          <img src="https://pks.id/img/logo-pks.png" alt="PKS" class="footer-logo" />
        </div>
      </div>

      <div class="footer-info" data-reveal="fade-up" data-reveal-delay="100">
        <p class="footer-org">Fraksi PKS DPRD</p>
        <p class="footer-name">Kota Bandung</p>
        <p class="footer-address">Gedung DPRD Kota Bandung | Jl. Sukabumi No.30, Kota Bandung, Jawa Barat 40162</p>
        <p class="footer-contact">Telp <a href="tel:0227208171">(022) 7208171</a>, E-Mail <a href="mailto:fraksi@bandung.pks.id">fraksi@bandung.pks.id</a></p>
      </div>

      <div class="footer-social" data-reveal="fade-up" data-reveal-delay="200">
        <p class="social-label">Kunjungi Akun Resmi di Media Sosial</p>
        <div class="social-icons">
          <a href="#"><i class="fab fa-youtube"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-tiktok"></i></a>
          <a href="#"><i class="fab fa-x-twitter"></i></a>
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Copyright &copy; 2026 · Website Fraksi PKS DPRD Kota Bandung</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--pks-navy);
  color: white;
  margin-top: 40px;
}
.footer-main {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 40px;
  padding: 50px 24px;
}
.footer-logo-wrap {
  background: white;
  padding: 20px;
  border-radius: 16px;
}
.footer-logo { width: 80px; display: block; }

.footer-org { font-size: 0.9rem; font-weight: 400; opacity: 0.8; }
.footer-name { font-size: 1.3rem; font-weight: 800; font-family: 'Montserrat',sans-serif; margin-bottom: 10px; }
.footer-address { font-size: 0.85rem; opacity: 0.7; margin-bottom: 4px; }
.footer-contact { font-size: 0.85rem; opacity: 0.7; }
.footer-contact a { color: var(--pks-orange); font-weight: 500; }
.footer-contact a:hover { text-decoration: underline; }

.footer-social { text-align: right; }
.social-label { font-size: 0.8rem; opacity: 0.6; margin-bottom: 14px; }
.social-icons { display: flex; gap: 12px; justify-content: flex-end; }
.social-icons a {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.15rem; color: white;
  background: rgba(255,255,255,0.1);
  transition: var(--transition);
}
.social-icons a:hover {
  background: var(--pks-orange); transform: translateY(-3px);
}

.footer-bottom {
  background: var(--pks-orange);
  padding: 14px 0;
  text-align: center;
}
.footer-bottom p { font-size: 0.8rem; font-weight: 500; }

@media (max-width: 992px) {
  .footer-main { grid-template-columns: 1fr; text-align: center; gap: 30px; }
  .footer-logo-wrap { margin: 0 auto; }
  .footer-social { text-align: center; }
  .social-icons { justify-content: center; }
}
</style>
