<script setup>
import { computed } from 'vue'
import { STRAPI_URL } from '../services/api'

const props = defineProps({ member: { type: Object, required: true } })

const nama = computed(() => props.member?.nama || props.member?.attributes?.nama || '')
const jabatan = computed(() => props.member?.jabatan || props.member?.attributes?.jabatan || 'Anggota')

const fotoUrl = computed(() => {
  const m = props.member
  // Strapi v5 / flat format
  const foto = m?.foto || m?.attributes?.foto
  
  if (!foto) {
    // Legacy fallback (foto_url string)
    const fallback = m?.foto_url || m?.attributes?.foto_url
    return fallback || null
  }

  // Handle Strapi v5 flattened media object
  if (foto.url) {
    return foto.url.startsWith('http') ? foto.url : `${STRAPI_URL}${foto.url}`
  }

  // Handle Strapi v4/v5 nested data.attributes
  if (foto.data?.attributes?.url) {
    const url = foto.data.attributes.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }

  return null
})

const initials = computed(() => {
  const n = nama.value
  if (!n) return '?'
  const parts = n.split(' ').filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0][0].toUpperCase()
})
</script>

<template>
  <router-link :to="`/anggota/${props.member.documentId}`" class="member-card" :aria-label="`Lihat profil ${nama}`">
    <!-- Decorative corner accent -->
    <div class="card-accent"></div>
    
    <!-- Image area -->
    <div class="member-img">
      <img v-if="fotoUrl" :src="fotoUrl" :alt="nama" loading="lazy" />
      <div v-else class="img-placeholder">
        <span class="initials">{{ initials }}</span>
      </div>

      <!-- Gradient overlay -->
      <div class="member-overlay">
        <div class="overlay-content">
          <span class="role-tag">
            <i class="fas fa-award role-icon"></i>
            {{ jabatan }}
          </span>
        </div>
      </div>

      <!-- Hover shine effect -->
      <div class="shine-effect"></div>
    </div>

    <!-- Info area -->
    <div class="member-info">
      <h3 class="member-name">{{ nama }}</h3>
      <div class="member-divider"></div>
      <p class="member-subtitle">
        <i class="fas fa-landmark subtitle-icon"></i>
        Fraksi PKS DPRD Kota Bandung
      </p>
      <span class="view-profile">
        Lihat Profil <i class="fas fa-arrow-right arrow-icon"></i>
      </span>
    </div>
  </router-link>
</template>

<style scoped>
.member-card {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 34, 68, 0.07);
  transition: all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

.member-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  border: 1px solid rgba(0, 34, 68, 0.06);
  pointer-events: none;
  z-index: 3;
  transition: border-color 0.4s ease;
}

.member-card:hover {
  transform: translateY(-10px);
  box-shadow:
    0 20px 50px rgba(0, 34, 68, 0.14),
    0 8px 20px rgba(240, 122, 30, 0.08);
}

.member-card:hover::before {
  border-color: rgba(240, 122, 30, 0.25);
}

/* Decorative accent corner */
.card-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, transparent 50%, rgba(240, 122, 30, 0.08) 50%);
  z-index: 2;
  transition: all 0.4s ease;
}

.member-card:hover .card-accent {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, transparent 50%, rgba(240, 122, 30, 0.12) 50%);
}

/* Image Section */
.member-img {
  height: 320px;
  overflow: hidden;
  position: relative;
  background: var(--pks-bg);
}

.member-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease;
  filter: saturate(0.92);
}

.member-card:hover .member-img img {
  transform: scale(1.08);
  filter: saturate(1.05);
}

/* Avatar placeholder with initials */
.img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #e8ecf1 0%, #d1d9e3 40%, #c4ceda 100%);
  position: relative;
  overflow: hidden;
}

.img-placeholder::before {
  content: '';
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(0, 34, 68, 0.04);
  bottom: -30px;
  right: -30px;
}

.img-placeholder::after {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(240, 122, 30, 0.06);
  top: -20px;
  left: -20px;
}

.initials {
  font-family: 'Montserrat', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  color: rgba(0, 34, 68, 0.15);
  letter-spacing: 2px;
  z-index: 1;
  transition: all 0.4s ease;
}

.member-card:hover .initials {
  color: rgba(0, 34, 68, 0.22);
  transform: scale(1.05);
}

/* Gradient overlay on image */
.member-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 60px 18px 16px;
  background: linear-gradient(
    to top,
    rgba(0, 26, 51, 0.92) 0%,
    rgba(0, 34, 68, 0.55) 45%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  z-index: 1;
}

.overlay-content {
  transform: translateY(4px);
  transition: transform 0.4s ease;
}

.member-card:hover .overlay-content {
  transform: translateY(0);
}

/* Role badge */
.role-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, var(--pks-orange) 0%, #e8651a 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  box-shadow: 0 3px 12px rgba(240, 122, 30, 0.35);
  transition: all 0.35s ease;
}

.member-card:hover .role-tag {
  box-shadow: 0 4px 18px rgba(240, 122, 30, 0.5);
  transform: translateY(-2px);
}

.role-icon {
  font-size: 0.65rem;
  opacity: 0.9;
}

/* Shine sweep effect */
.shine-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 40%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.08) 60%,
    transparent 100%
  );
  transition: left 0.7s ease;
  z-index: 2;
  pointer-events: none;
}

.member-card:hover .shine-effect {
  left: 130%;
}

/* Info Section */
.member-info {
  padding: 20px 20px 22px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.member-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: var(--pks-navy);
  font-weight: 700;
  line-height: 1.4;
  min-height: 2.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.member-card:hover .member-name {
  color: var(--pks-orange);
}

/* Animated divider */
.member-divider {
  width: 30px;
  height: 3px;
  background: linear-gradient(90deg, var(--pks-orange), #f5a623);
  border-radius: 3px;
  margin: 10px 0 12px;
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.member-card:hover .member-divider {
  width: 56px;
}

.member-subtitle {
  font-size: 0.76rem;
  color: var(--pks-text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.subtitle-icon {
  font-size: 0.68rem;
  color: var(--pks-orange);
  opacity: 0.7;
}

/* View profile CTA */
.view-profile {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--pks-navy);
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.35s ease;
  letter-spacing: 0.3px;
}

.member-card:hover .view-profile {
  opacity: 1;
  transform: translateY(0);
}

.arrow-icon {
  font-size: 0.65rem;
  transition: transform 0.3s ease;
}

.member-card:hover .arrow-icon {
  transform: translateX(4px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .member-img {
    height: 280px;
  }

  .member-name {
    font-size: 0.88rem;
  }

  .member-info {
    padding: 16px 16px 18px;
  }

  .view-profile {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .member-img {
    height: 250px;
  }
}
</style>
