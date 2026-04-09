<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api, { STRAPI_URL } from '../services/api'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const route = useRoute()
const router = useRouter()
const member = ref(null)
const allMembers = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await api.getMember(route.params.documentId)
    member.value = data || null
    // Get other members
    const members = await api.getMembers({ sort: 'createdAt:asc' })
    allMembers.value = (members || []).filter(m => (m.documentId || m.id) !== route.params.documentId)
  } catch (e) {
    console.error('Failed to fetch member:', e)
  } finally {
    loading.value = false
  }
})

const f = (field) => member.value?.[field] || member.value?.attributes?.[field] || ''

const fotoUrl = computed(() => {
  const m = member.value
  if (!m) return null
  const foto = m?.foto || m?.attributes?.foto
  if (foto?.data?.attributes?.url) {
    const url = foto.data.attributes.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }
  if (foto?.url) {
    const url = foto.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }
  return null
})

const getMemberFoto = (m) => {
  const foto = m?.foto || m?.attributes?.foto
  if (foto?.data?.attributes?.url) {
    const url = foto.data.attributes.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }
  if (foto?.url) {
    const url = foto.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }
  return null
}

const bioParagraphs = computed(() => {
  const bio = f('bio')
  if (!bio) return []
  return bio.split('\n').filter(p => p.trim())
})
</script>

<template>
  <div class="member-detail-view">
    <div v-if="loading" class="loading-state container">
      <i class="fas fa-spinner fa-spin"></i> Memuat profil...
    </div>

    <div v-else-if="!member" class="empty-state container">
      <i class="fas fa-user-slash"></i>
      <p>Profil anggota tidak ditemukan.</p>
      <router-link to="/anggota" class="btn btn-primary">← Kembali ke Anggota</router-link>
    </div>

    <template v-else>
      <!-- Breadcrumb -->
      <section class="container breadcrumb-bar" data-reveal="fade-up">
        <router-link to="/">Beranda</router-link>
        <i class="fas fa-chevron-right"></i>
        <router-link to="/anggota">Anggota</router-link>
        <i class="fas fa-chevron-right"></i>
        <span>Profil</span>
      </section>

      <!-- Profile Hero -->
      <section class="container profile-hero-section" data-reveal="fade-up">
        <div class="profile-hero">
          <div class="profile-photo">
            <img v-if="fotoUrl" :src="fotoUrl" :alt="f('nama')" />
            <div v-else class="photo-placeholder"><i class="fas fa-user"></i></div>
          </div>
          <div class="profile-header-info">
            <span class="role-badge">{{ f('jabatan') }}</span>
            <h1>{{ f('nama') }}</h1>
            <div class="profile-tags">
              <span class="tag" v-if="f('dapil')"><i class="fas fa-map-marker-alt"></i> Dapil {{ f('dapil') }}</span>
              <span class="tag" v-if="f('komisi')"><i class="fas fa-landmark"></i> {{ f('komisi') }}</span>
              <span class="tag"><i class="fas fa-flag"></i> Fraksi PKS</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Profile Content -->
      <section class="container profile-content-section">
        <div class="profile-content-grid">
          <!-- Main Content -->
          <div class="profile-main" data-reveal="fade-up" data-reveal-delay="100">
            <div class="info-card">
              <h2><i class="fas fa-id-card"></i> Profil Anggota</h2>
              <div class="info-grid">
                <div class="info-item">
                  <label>Nama Lengkap</label>
                  <p>{{ f('nama') }}</p>
                </div>
                <div class="info-item">
                  <label>Jabatan di Fraksi</label>
                  <p>{{ f('jabatan') }}</p>
                </div>
                <div class="info-item" v-if="f('dapil')">
                  <label>Daerah Pemilihan</label>
                  <p>{{ f('dapil') }}</p>
                </div>
                <div class="info-item" v-if="f('komisi')">
                  <label>Komisi</label>
                  <p>{{ f('komisi') }}</p>
                </div>
                <div class="info-item">
                  <label>Partai</label>
                  <p>Partai Keadilan Sejahtera (PKS)</p>
                </div>
                <div class="info-item">
                  <label>Periode</label>
                  <p>2024 – 2029</p>
                </div>
              </div>
            </div>

            <div class="info-card" v-if="bioParagraphs.length > 0">
              <h2><i class="fas fa-user-tie"></i> Biografi</h2>
              <div class="bio-content">
                <p v-for="(p, i) in bioParagraphs" :key="i">{{ p }}</p>
              </div>
            </div>
          </div>

          <!-- Sidebar: Other Members -->
          <aside class="profile-sidebar" data-reveal="fade-left" data-reveal-delay="200">
            <div class="sidebar-card">
              <h3>Anggota Lainnya</h3>
              <router-link
                v-for="m in allMembers.slice(0, 5)"
                :key="m.id"
                :to="`/anggota/${m.documentId}`"
                class="other-member"
              >
                <div class="om-photo">
                  <img v-if="getMemberFoto(m)" :src="getMemberFoto(m)" :alt="m.nama || m.attributes?.nama" />
                  <div v-else class="om-placeholder"><i class="fas fa-user"></i></div>
                </div>
                <div class="om-info">
                  <h4>{{ m.nama || m.attributes?.nama }}</h4>
                  <span>{{ m.jabatan || m.attributes?.jabatan }}</span>
                </div>
              </router-link>
            </div>
            <router-link to="/anggota" class="btn btn-primary btn-block">
              <i class="fas fa-users"></i> Semua Anggota
            </router-link>
          </aside>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.breadcrumb-bar {
  padding: 20px 0; display: flex; align-items: center; gap: 10px;
  font-size: 0.85rem; color: var(--pks-text-muted);
}
.breadcrumb-bar a { color: var(--pks-orange); font-weight: 600; }
.breadcrumb-bar a:hover { text-decoration: underline; }
.breadcrumb-bar i { font-size: 0.65rem; opacity: 0.5; }
.breadcrumb-bar span { color: var(--pks-navy); font-weight: 600; }

/* Profile Hero */
.profile-hero-section { padding-bottom: 10px; }
.profile-hero {
  background: linear-gradient(135deg, var(--pks-navy) 0%, #0d2b4f 100%);
  border-radius: var(--radius); padding: 48px 44px;
  display: flex; align-items: center; gap: 36px;
  position: relative; overflow: hidden;
}
.profile-hero::before {
  content: ''; position: absolute; top: -40px; right: -40px;
  width: 200px; height: 200px; border-radius: 50%;
  background: rgba(240,122,30,0.12);
}
.profile-hero::after {
  content: ''; position: absolute; bottom: -60px; right: 100px;
  width: 150px; height: 150px; border-radius: 50%;
  background: rgba(240,122,30,0.08);
}

.profile-photo {
  width: 180px; height: 180px; min-width: 180px;
  border-radius: 50%; overflow: hidden;
  border: 4px solid rgba(240,122,30,0.5);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  z-index: 1;
}
.profile-photo img { width: 100%; height: 100%; object-fit: cover; }
.photo-placeholder {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #374151, #4b5563);
  display: flex; align-items: center; justify-content: center;
  color: #9ca3af; font-size: 4rem;
}

.profile-header-info { z-index: 1; }
.role-badge {
  background: var(--pks-orange); color: white;
  padding: 6px 18px; border-radius: 20px;
  font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
  display: inline-block; margin-bottom: 12px;
}
.profile-header-info h1 { font-size: 2rem; color: white; margin-bottom: 14px; font-weight: 800; }
.profile-tags { display: flex; gap: 12px; flex-wrap: wrap; }
.tag {
  background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85);
  padding: 6px 16px; border-radius: 20px;
  font-size: 0.8rem; display: flex; align-items: center; gap: 6px;
  backdrop-filter: blur(8px);
}
.tag i { color: var(--pks-orange); font-size: 0.75rem; }

/* Profile Content Grid */
.profile-content-section { padding: 30px 0 60px; }
.profile-content-grid {
  display: grid; grid-template-columns: 1fr 340px; gap: 36px;
}

.profile-main { display: flex; flex-direction: column; gap: 24px; }
.info-card {
  background: white; border-radius: var(--radius); padding: 32px;
  box-shadow: var(--shadow-sm);
}
.info-card h2 {
  font-size: 1.15rem; color: var(--pks-navy); margin-bottom: 24px;
  padding-bottom: 14px; border-bottom: 2px solid var(--pks-orange);
  display: flex; align-items: center; gap: 10px;
}
.info-card h2 i { color: var(--pks-orange); font-size: 1rem; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.info-item label {
  display: block; font-size: 0.75rem; color: var(--pks-text-muted);
  text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.info-item p { font-size: 0.95rem; color: var(--pks-text-dark); font-weight: 600; }

.bio-content { font-size: 0.95rem; line-height: 1.8; color: var(--pks-text-dark); }
.bio-content p { margin-bottom: 14px; text-align: justify; }

/* Sidebar */
.profile-sidebar { display: flex; flex-direction: column; gap: 20px; }
.sidebar-card {
  background: white; border-radius: var(--radius);
  padding: 24px; box-shadow: var(--shadow-sm);
}
.sidebar-card h3 {
  font-size: 1.05rem; color: var(--pks-navy); margin-bottom: 18px;
  padding-bottom: 12px; border-bottom: 2px solid var(--pks-orange);
}

.other-member {
  display: flex; align-items: center; gap: 14px;
  padding: 10px 0; border-bottom: 1px solid #f1f3f5;
  transition: var(--transition);
}
.other-member:last-child { border-bottom: none; }
.other-member:hover { transform: translateX(4px); }
.om-photo { width: 46px; height: 46px; min-width: 46px; border-radius: 50%; overflow: hidden; }
.om-photo img { width: 100%; height: 100%; object-fit: cover; }
.om-placeholder {
  width: 100%; height: 100%; background: #e5e7eb;
  display: flex; align-items: center; justify-content: center;
  color: #9ca3af; font-size: 1.2rem;
}
.om-info h4 { font-size: 0.8rem; color: var(--pks-navy); font-weight: 700; line-height: 1.3; }
.om-info span { font-size: 0.72rem; color: var(--pks-text-muted); }

.btn-block {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; width: 100%; text-align: center;
}

.loading-state, .empty-state { text-align: center; padding: 100px 20px; color: var(--pks-text-muted); }
.loading-state i { font-size: 1.5rem; color: var(--pks-orange); }
.empty-state i { font-size: 3rem; color: #fbbf24; margin-bottom: 16px; display: block; }

@media (max-width: 992px) {
  .profile-content-grid { grid-template-columns: 1fr; }
  .profile-hero { flex-direction: column; text-align: center; padding: 36px 28px; }
  .profile-tags { justify-content: center; }
}
@media (max-width: 576px) {
  .profile-photo { width: 140px; height: 140px; min-width: 140px; }
  .profile-header-info h1 { font-size: 1.5rem; }
  .info-grid { grid-template-columns: 1fr; }
  .info-card { padding: 24px 18px; }
}
</style>
