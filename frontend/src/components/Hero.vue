<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-banner">
        <div class="banner-slide">
          <img src="https://pks.id/img/logo-pks.png" alt="PKS" class="banner-pks-logo" />
          <div class="banner-content">
            <h1 class="hero-title">Fraksi PKS<br/><span>DPRD Kota Bandung</span></h1>
            <p class="hero-desc">Berkhidmat untuk Rakyat, Membangun Kota Bandung yang Bermartabat</p>
            <div class="banner-actions">
              <router-link to="/anggota" class="btn btn-primary">Kenali Wakil Rakyat <i class="fas fa-arrow-right"></i></router-link>
              <router-link to="/kontak" class="btn btn-outline-blue">Sampaikan Aspirasi</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding: 20px 0 0;
}
.hero-banner {
  background: linear-gradient(135deg, #F07A1E 0%, #f5a623 50%, #F07A1E 100%);
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  min-height: 420px;
  animation: heroBannerIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes heroBannerIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.hero-banner::before {
  content: '';
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/></svg>') repeat;
  background-size: 80px;
  pointer-events: none;
}
.banner-slide {
  display: flex; align-items: center; justify-content: center;
  padding: 60px 50px; position: relative; z-index: 1;
  gap: 50px;
}
.banner-pks-logo {
  width: 180px; height: auto;
  filter: brightness(0) invert(1);
  opacity: 0.9;
  animation: float 4s ease-in-out infinite, logoEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
@keyframes logoEnter {
  from {
    opacity: 0;
    transform: scale(0.7) rotate(-10deg);
  }
  to {
    opacity: 0.9;
    transform: scale(1) rotate(0deg);
  }
}
.banner-content { max-width: 550px; color: white; }
.hero-title {
  font-size: 2.8rem; color: white; margin-bottom: 16px;
  font-weight: 800; line-height: 1.15;
  animation: heroTextIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}
.hero-title span { font-weight: 400; font-size: 2rem; }
.hero-desc {
  font-size: 1.05rem; opacity: 0.9; margin-bottom: 30px; line-height: 1.7;
  animation: heroTextIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
}
.banner-actions {
  display: flex; gap: 16px; flex-wrap: wrap;
  animation: heroTextIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}
@keyframes heroTextIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.btn-outline-blue {
  background: transparent; border: 2px solid white; color: white;
}
.btn-outline-blue:hover {
  background: white; color: var(--pks-orange);
}

@media (max-width: 768px) {
  .banner-slide { flex-direction: column; text-align: center; padding: 40px 24px; gap: 20px; }
  .banner-pks-logo { width: 120px; }
  .hero-title { font-size: 2rem; }
  .hero-title span { font-size: 1.4rem; }
  .banner-actions { justify-content: center; }
}
</style>
